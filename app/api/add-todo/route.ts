import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const todo = searchParams.get('todo');
 
  try {
    if (!id || !todo) throw new Error('Text and owner names required');
    await sql`INSERT INTO todos (id, text) VALUES (${id}, ${todo});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const todos = await sql`SELECT * FROM todos;`;
  return NextResponse.json({ todos }, { status: 200 });
}