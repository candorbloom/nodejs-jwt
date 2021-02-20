/*
    POST /api/auth/register
    {
        username,
        password
    }
*/

const user = require('../../../models/user')
const User = require('../../../models/user')

exports.register = (req, res) => {

    const {username,password} = req.body
    let newUser = null

    // 기존에 없는 유저면 새 유저로 생성하기
    const create = (user) => {
        if(user) {
            throw new Error('username exists')
        } else {
            return User.create(username, password)
        }
    }

    // 유저의 숫자를 세어라
    const count = (user) => {
        newUser = user
        return User.count({}).exec()
    }

    // count가 1이면 admin으로 배정하라
    const assign = (count) => {
        if(count===1){
            return newUser.assignAdmin()
        } else {
            return Promise.resolve(false)
        }
    }

    // 사용자에게 응답하라
    const respond = (isAdmin) => {
        res.json({
            message: 'registered successfully',
            admin: isAdmin ? true : false
        })
    }

    // 에러가 생기는 경우
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    // 유저 중복 체크
    User.findOneByUsername(username)
    .then(create)
    .then(count)
    .then(assign)
    .then(respond)
    .catch(onError)
}




/*
    POST /api/auth/login
    {
        username,
        password
    }
*/
const jwt = require('jsonwebtoken')
const User = require('../../../models/user')



exports.login = (req, res) => {
    res.send('login api is working')
}