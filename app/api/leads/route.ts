import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import Lead, { ILead } from '@/app/models/Lead';
import mongoose from 'mongoose';
import { sendLeadToC2S } from '@/app/lib/c2s';

export async function POST(request: Request) {
  try {
    console.log('Iniciando processamento do lead...');
    const body = await request.json() as Omit<ILead, 'dataEnvio'>;
    console.log('Dados recebidos:', JSON.stringify(body, null, 2));
    
    console.log('Conectando ao MongoDB...');
    console.log('URI do MongoDB:', process.env.MONGODB_URI?.split('@')[1]); // Log seguro da URI
    await connectDB();
    console.log('Conexão estabelecida com sucesso');
    
    console.log('Criando lead no banco de dados...');
    const lead = await Lead.create(body);
    console.log('Lead criado com sucesso:', JSON.stringify(lead, null, 2));

    // Enviando lead para o C2S
    let c2sResponse = null;
    try {
      console.log('Enviando lead para o C2S...');
      const c2sLead = {
        customer: {
          name: body.nome,
          email: body.email,
          phone: body.whatsapp.replace(/\D/g, '') // Remove caracteres não numéricos
        },
        product: {
          description: `Lote ${body.tipoLote} - ${body.parcelas} parcelas`
        },
        lead_source: {
          id: 1,
          name: 'Landing Page'
        },
        channel: {
          id: 1,
          name: 'Website'
        },
        lead_status: {
          id: 1,
          alias: 'novo'
        },
        funnel_status: {
          id: 1,
          alias: 'under_negotiation',
          name: 'Em Negociação'
        },
        tags: [
          {
            id: '1',
            name: body.tipoLote
          }
        ]
      };
      c2sResponse = await sendLeadToC2S(c2sLead);
      console.log('Lead enviado com sucesso para o C2S');
    } catch (c2sError) {
      console.error('Erro ao enviar lead para o C2S:', c2sError);
      // Não interrompemos o fluxo se houver erro no C2S
    }
    
    return NextResponse.json(
      { 
        message: 'Lead cadastrado com sucesso!', 
        lead,
        c2s: c2sResponse || 'Erro ao enviar para o C2S'
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro detalhado ao cadastrar lead:', error);
    
    // Erro de conexão com o MongoDB
    if (error instanceof mongoose.Error.MongooseServerSelectionError) {
      console.error('Erro de conexão com o MongoDB:', error.message);
      return NextResponse.json(
        { message: 'Erro de conexão com o banco de dados' },
        { status: 500 }
      );
    }
    
    // Erro de validação do Mongoose
    if (error instanceof mongoose.Error.ValidationError) {
      console.error('Erro de validação:', error.message);
      return NextResponse.json(
        { message: `Erro de validação: ${error.message}` },
        { status: 400 }
      );
    }

    // Outros erros
    console.error('Erro não esperado:', error);
    return NextResponse.json(
      { message: 'Erro interno ao cadastrar lead' },
      { status: 500 }
    );
  }
} 