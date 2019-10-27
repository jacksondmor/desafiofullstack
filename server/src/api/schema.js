const resolvers = require('./resolvers')
const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = `
    
    type Questions {
        tag: String
        ownerName: String 
        ownerProfile: String
        title: String
        viewCount: Int
        score: Int
        creationDate: String
        link: String
    }

    type Query {
        getQuestions(tag: String!, limit: Int, score: Int, sort: String): [Questions]
    }
`

module.exports = makeExecutableSchema({ typeDefs, resolvers })