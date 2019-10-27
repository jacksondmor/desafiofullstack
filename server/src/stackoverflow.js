const axios = require('axios')

const hostname = 'https://api.stackexchange.com/2.2/questions?'
const path = 'order=desc&min=1572048000&max=1572134400&sort=activity&tagged=vue&site=stackoverflow'

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

axios.get(`${hostname}${path}`).then( res => {
    
    const result = res.data.items.map(extractor).filter(onlyJavascript)
    
    return console.log(result)
})