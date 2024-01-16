import { sql } from "./db.js"

sql`CREATE TABLE people (
  id TEXT PRIMARY KEY,
  name TEXT,
  age INTEGER,
  email TEXT,
  country TEXT,
  salary INTEGER
)`.then(() => {
  console.log("Table people created")
})