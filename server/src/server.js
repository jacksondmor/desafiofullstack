const schema = require('./api/schema')

const { ApolloServer } = require('apollo-server')

const server = new ApolloServer({ schema })
server.listen(4000, () => console.log('Executando na porta 4000...'))