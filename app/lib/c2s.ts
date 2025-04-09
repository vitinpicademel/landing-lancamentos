import axios from 'axios';

interface C2SLead {
  customer: {
    name: string;
    email: string;
    phone: string;
    phone2?: string;
  };
  product?: {
    description?: string;
    brand?: string;
    model?: string;
    version?: string;
    year?: string;
    color?: string;
    km?: string;
    license_plate?: string;
    price?: number;
  };
  lead_source?: {
    id: number;
    name: string;
  };
  channel?: {
    id: number;
    name: string;
  };
  lead_status?: {
    id: number;
    alias: string;
  };
  funnel_status?: {
    id: number;
    alias: string;
    name: string;
  };
  tags?: Array<{
    id: string;
    name: string;
  }>;
}

export async function sendLeadToC2S(lead: C2SLead) {
  try {
    const C2S_API_URL = process.env.C2S_API_URL || 'https://api.contact2sale.com/integration/leads';
    const C2S_API_KEY = process.env.C2S_API_KEY;

    if (!C2S_API_KEY) {
      throw new Error('API Key do C2S não configurada');
    }

    const response = await axios.post(C2S_API_URL, lead, {
      headers: {
        'Authorization': `Bearer ${C2S_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao enviar lead para o C2S:', error);
    throw error;
  }
} 