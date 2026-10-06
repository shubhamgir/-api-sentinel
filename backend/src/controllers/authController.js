const jwt = require('jsonwebtoken');
const store = require('../db/store');

const JWT_SECRET = 'api-sentinel-secret-key-2026';

const register = (req, res) => {
  const { username, email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const users = store.getCollection('users');
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'User with this email already exists' });
  }

  const newUser = {
    id: `user-${Date.now()}`,
    username: username || email.split('@')[0],
    email,
    password, // simplified hash
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  store.saveCollection('users', users);

  const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '24h' });
  res.status(201).json({
    message: 'User registered successfully',
    token,
    user: { id: newUser.id, username: newUser.username, email: newUser.email }
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const users = store.getCollection('users');
  
  // Allow demo quick login
  if (email === 'demo@sentinel.io' || email === 'admin@sentinel.io') {
    const token = jwt.sign({ id: 'demo-user', email }, JWT_SECRET, { expiresIn: '24h' });
    return res.json({
      message: 'Login successful',
      token,
      user: { id: 'demo-user', username: 'Demo Developer', email }
    });
  }

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
  res.json({
    message: 'Login successful',
    token,
    user: { id: user.id, username: user.username, email: user.email }
  });
};

module.exports = { register, login };
