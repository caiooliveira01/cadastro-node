import { createId } from "@paralleldrive/cuid2"

export class DatabaseMemory {
  #people = new Map()

  listPeople(search) {
    return Array.from(this.#people.entries())
      .map((peopleArray) => {
        const id = peopleArray[0]
        const data = peopleArray[1]

        return {
          id,
          ...data,
        }
      })
      .filter((person) => {
        if (search) {
          return person.name.toLowerCase().includes(search.toLowerCase())
        } else {
          return true
        }
      })
  }

  createPerson(person) {
    const personId = createId()

    return this.#people.set(personId, person)
  }

  updatePerson(id, person) {
    this.#people.set(id, person)
  }

  deletePerson(id) {
    this.#people.delete(id)
  }
}
