const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Ativo', 'Inativo', 'Potencial', 'Em Tratamento'], // Definindo status possíveis
    default: 'Potencial'
  },
  lastAppointment: {
    type: Date
  },
  height: {
    type: Number
  },
  weight: {
    type: Number
  },
  diseases: {
    type: String
  },
  allergies: {
    type: String
  },
  notes: {
    type: String
  }
});

module.exports = mongoose.model('Client', clientSchema);