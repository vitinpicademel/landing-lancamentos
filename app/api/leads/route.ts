import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import Lead from '@/app/models/Lead';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    await connectDB();
    
    const lead = await Lead.create(body);
    
    return NextResponse.json(
      { message: 'Lead cadastrado com sucesso!', lead },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao cadastrar lead:', error);
    return NextResponse.json(
      { message: 'Erro ao cadastrar lead' },
      { status: 500 }
    );
  }
} 