import { NextRequest, NextResponse } from 'next/server';
import pool from "@/app/utils/db";

export async function GET(request: NextRequest) {
  try {
    const result = await pool.query('SELECT * FROM jobs');
    return NextResponse.json(result.rows); // Return query results
  } catch (error: any) {
    console.error('Database error:', error.message, error.stack); // Log error details
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description } = body;

    const result = await pool.query("INSERT into jobs (title, description) values($1, $2) returning id, title, description",
      [title, description]
    );
    return NextResponse.json(result.rows[0], {status: 201}); // Return query results
  } catch (error: any) {
    console.error('Database error:', error.message, error.stack); // Log error details
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

