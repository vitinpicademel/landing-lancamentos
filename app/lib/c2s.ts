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
    const C2S_API_URL = 'https://api.contact2sale.com/integration/leads';
    const C2S_API_KEY = process.env.C2S_API_KEY;

    if (!C2S_API_KEY) {
      throw new Error('API Key do C2S não configurada');
    }

    console.log('Enviando lead para C2S:', {
      url: C2S_API_URL,
      lead: JSON.stringify(lead, null, 2)
    });

    const response = await axios.post(C2S_API_URL, lead, {
      headers: {
        'Authorization': `Bearer ${C2S_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      validateStatus: (status) => {
        return status >= 200 && status < 500; // Aceita qualquer status entre 200 e 499
      }
    });

    console.log('Resposta do C2S:', {
      status: response.status,
      data: response.data
    });

    if (response.status >= 400) {
      throw new Error(`Erro na API do C2S: ${JSON.stringify(response.data)}`);
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro na requisição para o C2S:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
    } else {
      console.error('Erro ao enviar lead para o C2S:', error);
    }
    throw error;
  }
} 