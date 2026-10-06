const store = require('../db/store');
const { validateContract } = require('../services/contractValidator');

const saveContract = (req, res) => {
  const { endpointId, name, schema } = req.body;
  if (!endpointId || !schema) {
    return res.status(400).json({ error: 'Endpoint ID and JSON Schema are required' });
  }

  const saved = store.saveContract({
    endpointId,
    name: name || 'API Response Contract',
    schema
  });

  res.status(201).json(saved);
};

const getContractById = (req, res) => {
  const { id } = req.params;
  const contract = store.getContracts().find(c => c.id === id || c.endpointId === id);
  if (!contract) {
    return res.status(404).json({ error: 'Contract not found' });
  }
  res.json(contract);
};

const validateTestPayload = (req, res) => {
  const { schema, payload } = req.body;
  if (!schema || payload === undefined) {
    return res.status(400).json({ error: 'Schema and payload are required' });
  }

  const result = validateContract(payload, schema);
  res.json(result);
};

module.exports = {
  saveContract,
  getContractById,
  validateTestPayload
};
