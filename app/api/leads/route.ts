import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import Lead, { ILead } from '@/app/models/Lead';

export async function POST(request: Request) {
  try {
    console.log('Iniciando processamento do lead...');
    const body = await request.json() as Omit<ILead, 'dataEnvio'>;
    console.log('Dados recebidos:', body);
    
    console.log('Conectando ao MongoDB...');
    await connectDB();
    console.log('Conexão estabelecida com sucesso');
    
    console.log('Criando lead no banco de dados...');
    const lead = await Lead.create(body);
    console.log('Lead criado com sucesso:', lead);
    
    return NextResponse.json(
      { message: 'Lead cadastrado com sucesso!', lead },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro detalhado ao cadastrar lead:', error);
    // Verifica se é um erro de validação do Mongoose
    if (error instanceof Error) {
      return NextResponse.json(
        { message: `Erro ao cadastrar lead: ${error.message}` },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: 'Erro interno ao cadastrar lead' },
      { status: 500 }
    );
  }
} 