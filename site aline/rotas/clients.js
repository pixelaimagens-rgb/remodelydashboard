const express = require('express');
const Client = require('../models/Client');
const auth = require('../middleware/auth');
const router = express.Router();

// GET /api/clients
router.get('/', auth, async (req, res) => {
  try {
    const clients = await Client.find().sort({ name: 1 }); // Ordenar por nome
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar clientes.', error: error.message });
  }
});

// POST /api/clients
router.post('/', auth, async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao adicionar cliente.', error: error.message });
  }
});

// GET /api/clients/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar cliente.', error: error.message });
  }
});

// PUT /api/clients/:id
router.put('/:id', auth, async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!client) {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }
    res.json(client);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar cliente.', error: error.message });
  }
});

// DELETE /api/clients/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }
    res.json({ message: 'Cliente deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar cliente.', error: error.message });
  }
});

module.exports = router;