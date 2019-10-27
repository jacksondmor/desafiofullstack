
const stackoverflow = require('../stackoverflow')

module.exports = {
    Query: {
        async getQuestions(_, { tag, limit, score, sort }) {
            return await stackoverflow.getQuestionsStack(tag, limit, score, sort)
        }
    }
}