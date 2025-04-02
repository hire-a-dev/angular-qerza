import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

// Function to connect to SQLite database
async function connectDB(): Promise<Database<sqlite3.Database, sqlite3.Statement>> {
  return await open({
    filename: "MD_database.db",
    driver: sqlite3.Database, // Uses sqlite3 driver
  });
}

export default connectDB;
