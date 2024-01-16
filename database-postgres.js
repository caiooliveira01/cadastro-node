import { createId } from "@paralleldrive/cuid2"
import { sql } from "./db.js"

export class DatabasePostgres {
  async listPeople(search) {
    let people

    if (search) {
      people = await sql`SELECT * FROM people WHERE name ILIKE ${'%' + search + '%'}`
    } else {
      people = await sql`SELECT * FROM people`
    }

    return people
  }

  async createPerson(person) {
    const personID = createId()
    const { name, age, email, country, salary } = person

    await sql`INSERT INTO people (id, name, age, email, country, salary) VALUES (${personID}, ${name}, ${age}, ${email}, ${country}, ${salary})`
  }

  async updatePerson(id, person) {
    const { name, age, email, country, salary } = person

    await sql`UPDATE people SET name = ${name}, age = ${age}, email = ${email}, country = ${country}, salary = ${salary} WHERE id = ${id}`
  }

  async deletePerson(id) {
    await sql`DELETE FROM people WHERE id = ${id}`
  }
}
