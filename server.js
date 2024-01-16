import fastify from "fastify"
// import { DatabaseMemory } from "./database-memory.js"
import { DatabasePostgres } from "./database-postgres.js"

const server = fastify()

// const database = new DatabaseMemory()
const database = new DatabasePostgres()

server.get("/cadastro", (request) => {
  const search = request.query.search

  const people = database.listPeople(search)

  return people
})

server.post("/cadastro", (request, reply) => {
  // Extrai os dados do corpo da requisição
  const { name, age, email, country, salary } = request.body

  database.createPerson({ name, age, email, country, salary })

  return reply.status(201).send()
})

server.put("/cadastro/:id", (request, reply) => {
  const id = request.params.id
  const { name, age, email, country, salary } = request.body

  database.updatePerson(id, { name, age, email, country, salary })

  return reply.status(204).send()
})

server.delete("/cadastro/:id", (request, reply) => {
  // Extrai o parâmetro da URL 'id'
  const id = request.params.id

  database.deletePerson(id)

  return reply.status(204).send()
})

server.listen({
  host: "0.0.0.0",
  port: 3333,
})
