

const questions = new Object
questions.tag = 'javascript'
questions.ownerName = 'Mike'
questions.ownerProfile = 'https://www.gravatar.com/avatar/3d8326e9514621ee4c7ef71504a4e171?s=128&d=identicon&r=PG&f=1'
questions.title = 'Including executable file to be called in Electron Vue app'
questions.viewCount = 13
questions.score = 1
questions.creationDate = 1572132276
questions.link = 'https://stackoverflow.com/questions/58575478/including-executable-file-to-be-called-in-electron-vue-app'

module.exports = {
    Query: {
        async getQuestions(_, { tag, limit, score, sort }) {
            return await [questions]
        }
    }
}