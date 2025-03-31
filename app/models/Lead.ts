import mongoose, { Document, Model } from 'mongoose';

interface ILead {
  nome: string;
  whatsapp: string;
  email: string;
  tipoLote: 'comercial' | 'residencial';
  parcelas: string;
  aceitoPrivacidade: boolean;
  dataEnvio?: Date;
}

interface ILeadDocument extends ILead, Document {}

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

const Lead: Model<ILeadDocument> = mongoose.models.Lead || mongoose.model<ILeadDocument>('Lead', LeadSchema);

export type { ILead };
export default Lead; 