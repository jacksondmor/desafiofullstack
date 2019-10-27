const axios = require('axios')

const hostname = 'https://api.stackexchange.com/2.2/questions?'

const extractor = item => {
    const questions = new Object
    questions.tag = item.tags[item.tags.indexOf('javascript')]
    questions.ownerName = item.owner.display_name
    questions.ownerProfile = item.owner.profile_image
    questions.title = item.title
    questions.viewCount = item.view_count
    questions.score = item.score
    questions.creationDate = item.creation_date
    questions.link = item.link

    return questions
}

const onlyJavascript = questions => questions.tag === 'javascript'

function filterByScore(score) {
    return function filter(questions) {
        return questions.score === score;
    }
  }

exports.getQuestionsStack = function (tag, limit, score, sort) {
    return axios.get(`${hostname}sort=${sort}&tagged=${tag}&site=stackoverflow`)
            .then( res => {       
                let result = res.data.items.map(extractor).filter(onlyJavascript)
                
                if (score != undefined || score != null) {
                    result = result.filter(filterByScore(score))
                }

                if (limit > 0 || limit != undefined || limit != null) {
                    result = result.slice(0, limit)
                }

                return result
            }).catch(error => {
                if (error) {
                    return Promise.reject(error)
                }
            })
}

