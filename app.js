// 의존성 로드
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
// CONFIG 로드
const config = require('./config')
const port = process.env.PORT || 3000
// express 환경설정
const app = express()

// Json 과 url-encoded query를 분석
app.use(bodyParser.urlencoded({extended: false}))

// console창에 request log를 print
app.use(morgan('dev'))

// jwt로 시크릿키 변수를 세팅
app.set('jwt-secret', config.secret)

// 테스트를 위한 index page
app.get('/', (req, res) => {
    res.send('Hello JWT')
})

// api router 설정

app.use('/api', require('./routes/api'))

// 서버 open
app.listen(port, ()=> {
    console.log('Express is running on port ${port}')
})

// mongoDB 서버 연결
mongoose.connect(config.mongodbUri)
const db = mongoose.connection
db.on('error', console.error)
db.once('open', ()=>{
    console.log('conneted to mongodb server')
})