const { promises } = require('fs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    username : String,
    password: String,
    admin : {type : Boolean, default:false}
})

// 새로운 유저레코드(행) 즉 새유저 생성하기
User.statics.create = function(username,password){
    const user = new this({
        username,
        password
    })
    // promises를 반환
    return user.save()
}

// username으로 유저 찾기
User.statics.findOneByUsername = function(username){
    return this.findOne({
        username
    }).exec()
}

// 유저레코드의 password 확인하기
User.methods.verify = function(password){
    return this.password === password
}

User.method.assignAdmin = function(){
    this.admin = true
    return this.save()
}

module.exports = mongoose.model('User', User)