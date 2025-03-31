import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  whatsapp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  tipoLote: {
    type: String,
    required: true,
    enum: ['comercial', 'residencial'],
  },
  parcelas: {
    type: String,
    required: true,
  },
  aceitoPrivacidade: {
    type: Boolean,
    required: true,
  },
  dataEnvio: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema); 