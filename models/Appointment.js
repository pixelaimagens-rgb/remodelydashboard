const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  service: {
    type: String,
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client', // Referência ao ID do cliente
    required: true
  },
  status: {
    type: String,
    enum: ['Agendado', 'Realizado', 'Cancelado'],
    default: 'Agendado'
  },
  notes: {
    type: String
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);