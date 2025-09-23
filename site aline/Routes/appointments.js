const express = require('express');
const Appointment = require('../models/Appointment');
const Client = require('../models/Client'); // Para verificar se o cliente existe
const auth = require('../middleware/auth');
const router = express.Router();

// GET /api/appointments
router.get('/', auth, async (req, res) => {
  try {
    // Populate o campo 'client' para trazer os dados do cliente
    const appointments = await Appointment.find().populate('client', 'name').sort({ date: 1 }); // Ordenar por data
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar agendamentos.', error: error.message });
  }
});

// POST /api/appointments
router.post('/', auth, async (req, res) => {
  try {
    // Verificar se o cliente existe antes de criar o agendamento
    const clientExists = await Client.findById(req.body.client);
    if (!clientExists) {
      return res.status(400).json({ message: 'Cliente não encontrado.' });
    }

    const appointment = new Appointment(req.body);
    await appointment.save();
    // Populate para retornar o nome do cliente no agendamento recém-criado
    await appointment.populate('client', 'name');
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar agendamento.', error: error.message });
  }
});

// GET /api/appointments/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate('client', 'name');
    if (!appointment) {
      return res.status(404).json({ message: 'Agendamento não encontrado.' });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar agendamento.', error: error.message });
  }
});

// PUT /api/appointments/:id
router.put('/:id', auth, async (req, res) => {
  try {
    // Verificar se o cliente existe antes de atualizar o agendamento
    if (req.body.client) {
      const clientExists = await Client.findById(req.body.client);
      if (!clientExists) {
        return res.status(400).json({ message: 'Cliente não encontrado.' });
      }
    }

    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('client', 'name');
    if (!appointment) {
      return res.status(404).json({ message: 'Agendamento não encontrado.' });
    }
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar agendamento.', error: error.message });
  }
});

// DELETE /api/appointments/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Agendamento não encontrado.' });
    }
    res.json({ message: 'Agendamento deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar agendamento.', error: error.message });
  }
});

module.exports = router;