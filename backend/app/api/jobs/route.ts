import { NextRequest, NextResponse } from 'next/server';
import connectDB from "@/app/utils/db";

// GET request handler
export async function GET(request: NextRequest) {
  try {
    const db = await connectDB();
    console.log("Fetching jobs from SQLite database...");
    
    const jobs = await db.all('SELECT * FROM jobs'); // Fetch all jobs
    console.log("Jobs retrieved:", jobs);

    return NextResponse.json(jobs); // Return job data
  } catch (error: any) {
    console.error('Database error:', error.message, error.stack);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// POST request to create job
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title,  company, companylogo, salary, url, location } = body;

    if (!title || !company) {
      return NextResponse.json({ error: "Title and company are required" }, { status: 400 });
    }

    const db = await connectDB(); // Ensure the database connection

    // Insert job into SQLite database
    const result = await db.run(
      "INSERT INTO jobs (id, title, company, companylogo, salary, url, location) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id, title,  company, companylogo, salary, url, location]
    );

    console.log("Job created with ID:", result.lastID);

    // Fetch the newly created job
    const newJob = await db.get("SELECT * FROM jobs WHERE id = ?", result.lastID);

    return NextResponse.json(newJob, { status: 201 }); // Return the inserted job
  } catch (error: any) {
    console.error('Database error:', error.message, error.stack);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



// DELETE request handler (delID passed in the request body)
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json(); // Parse the request body
    const { id } = body; // Get job ID from the body

    if (!id) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }

    const db = await connectDB(); // Ensure the database connection

    // Perform the delete operation using the provided job ID
    const result = await db.run('DELETE FROM jobs WHERE id = ?', id);

    if (result.changes === 0) {
      return NextResponse.json({ error: "Job not found or already deleted" }, { status: 404 });
    }

    return NextResponse.json({ message: 'Job deleted successfully' }); // Return success response
  } catch (error: any) {
    console.error('Database error:', error.message, error.stack);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// PUT request handler (editID and updated values received in the request body)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json(); // Parse the request body
    const { id, title, company, location, salary } = body; // Get job details from the body

    if (!id || !title || !company || !location || !salary) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const db = await connectDB(); // Ensure the database connection

    // Perform the update operation using the provided job details
    const result = await db.run(
      'UPDATE jobs SET title = ?, company = ?, location = ?, salary = ? WHERE id = ?',
      [title, company, location, salary, id] // Wrap values in an array
    );

    if (result.changes === 0) {
      return NextResponse.json({ error: "Job not found or no changes made" }, { status: 404 });
    }

    return NextResponse.json({ message: "Job updated successfully" }); // Return success response
  } catch (error: any) {
    console.error("Database error:", error.message, error.stack);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
