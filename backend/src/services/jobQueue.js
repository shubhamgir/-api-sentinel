const { EventEmitter } = require('events');

/**
 * BullMQ-compatible Queue & Worker Engine for scheduled monitoring jobs.
 * Features concurrency management, job deduplication, retry tracking, and queue metrics.
 */
class MonitoringJobQueue extends EventEmitter {
  constructor(concurrency = 5) {
    super();
    this.concurrency = concurrency;
    this.activeWorkers = 0;
    this.waitingJobs = [];
    this.activeJobs = new Map();
    this.completedJobs = [];
    this.failedJobs = [];
    this.jobDeduplicationMap = new Map(); // Job Key -> Timestamp to prevent duplicates
    this.stats = {
      totalQueued: 0,
      totalCompleted: 0,
      totalFailed: 0,
      totalDeduplicated: 0
    };
  }

  /**
   * Add a monitoring job to the queue with deduplication key
   */
  addJob(jobType, payload, options = {}) {
    const { endpointId, endpointName } = payload;
    const deduplicationKey = `${jobType}:${endpointId}`;
    const deduplicationWindowMs = options.deduplicationWindowMs || 5000;

    // Duplicate Job Prevention
    const lastQueuedTime = this.jobDeduplicationMap.get(deduplicationKey);
    if (lastQueuedTime && (Date.now() - lastQueuedTime < deduplicationWindowMs)) {
      this.stats.totalDeduplicated++;
      return {
        status: 'DEDUPLICATED',
        reason: `Duplicate job suppressed within ${deduplicationWindowMs}ms window`,
        jobKey: deduplicationKey
      };
    }

    this.jobDeduplicationMap.set(deduplicationKey, Date.now());

    const job = {
      id: `job-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      jobType,
      endpointId,
      endpointName,
      payload,
      attempts: 0,
      maxAttempts: options.retryCount || 2,
      status: 'WAITING',
      queuedAt: new Date().toISOString()
    };

    this.waitingJobs.push(job);
    this.stats.totalQueued++;
    this.emit('jobAdded', job);

    this.processNext();
    return job;
  }

  async processNext() {
    if (this.activeWorkers >= this.concurrency || this.waitingJobs.length === 0) {
      return;
    }

    const job = this.waitingJobs.shift();
    this.activeWorkers++;
    job.status = 'ACTIVE';
    job.startedAt = new Date().toISOString();
    this.activeJobs.set(job.id, job);

    this.emit('jobStarted', job);

    try {
      // Execute the job handler callback
      if (this.jobHandler) {
        job.result = await this.jobHandler(job.payload);
      }
      
      job.status = 'COMPLETED';
      job.completedAt = new Date().toISOString();
      this.activeJobs.delete(job.id);
      this.completedJobs.push(job);
      if (this.completedJobs.length > 100) this.completedJobs.shift();

      this.stats.totalCompleted++;
      this.emit('jobCompleted', job);
    } catch (err) {
      job.attempts++;
      if (job.attempts < job.maxAttempts) {
        job.status = 'RETRYING';
        job.lastError = err.message;
        // Re-queue with backoff delay
        setTimeout(() => {
          this.waitingJobs.push(job);
          this.processNext();
        }, Math.pow(2, job.attempts) * 300);
      } else {
        job.status = 'FAILED';
        job.failedAt = new Date().toISOString();
        job.error = err.message;
        this.activeJobs.delete(job.id);
        this.failedJobs.push(job);
        if (this.failedJobs.length > 100) this.failedJobs.shift();

        this.stats.totalFailed++;
        this.emit('jobFailed', job);
      }
    } finally {
      this.activeWorkers--;
      this.processNext();
    }
  }

  registerHandler(handlerFn) {
    this.jobHandler = handlerFn;
  }

  getMetrics() {
    return {
      queueName: 'api-sentinel-health-checks',
      concurrency: this.concurrency,
      activeWorkers: this.activeWorkers,
      waitingCount: this.waitingJobs.length,
      activeCount: this.activeJobs.size,
      completedCount: this.completedJobs.length,
      failedCount: this.failedJobs.length,
      stats: this.stats,
      recentJobs: [...this.completedJobs.slice(-10), ...this.failedJobs.slice(-10)].reverse()
    };
  }
}

const jobQueue = new MonitoringJobQueue(5);

module.exports = jobQueue;
