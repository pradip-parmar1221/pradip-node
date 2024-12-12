const connection = require('./../../config/database')
const stringfile = require('./../../config/stringfile')
const commonfunction = require('../../config/commonfunction')
const path = require('path');
const fs = require('fs');
module.exports = {
  signup: async (data, callback) => {
    var uuid = commonfunction.generateUniqueID()
    if (!data.username || !data.email || !data.password || !data.currency) {
      callback(stringfile.enteralldata)
    } else {
      connection.query(`select userid,id,username,currency,password,email from user where email='${data.email}'and isactive=1`, (err, result) => {
        if (err) {
          callback(err)
        } else {
          if (result.length > 0) {
            callback(stringfile.useralreadysignup)
          } else {
            connection.query(`insert into user(userid,username,password,email,currency) values (?,?,?,?,?)`
              , [
                uuid,
                data.username,
                data.password,
                data.email,
                data.currency,
              ], (err, result) => {
                if (err) {
                  console.log(err)
                  callback(err)
                } else {
                 data.userid=uuid
                 data.password=undefined
                  callback(null, [data])
                }
              })
          }
        }
      })
    }



  },
  signin: async (data, callback) => {
    if(!data.email || !data.password){
      callback(stringfile.enteralldata)
    }else{

    
    connection.query(`select password, userid,username,currency,email from user where email='${data.email}' and password='${data.password}' and isactive=1`, (err, result) => {
      if (err) {
        callback(err)
      } else {
        if (result.length > 0) {
          if (result[0].password == data.password) {
            result[0].password=undefined
            callback(null, result)
          } else {
            callback(stringfile.invalidemail)
          }
        } else {
          callback(stringfile.invalidemail)
        }
      }
    })
    }
  },


  // currency code 
  getcurrency: async (data, callback) => {
    if(!data.userid ){
      callback(stringfile.enteralldata)
    }else{

    
    connection.query(`select currency from user where userid='${data.userid}' and isactive=1`, (err, result) => {
      if (err) {
        callback(err)
      } else {
        if (result.length > 0) {
            callback(null, result)
        } else {
          callback(stringfile.usernotfound)
        }
      }
    })
    }
  },
  updatecurrency: async (data, callback) => {
    if(!data.userid || !data.currency){
      callback(stringfile.enteralldata)
    }else{
      connection.query(`update user set currency='${data.currency}'   where userid='${data.userid}' and isactive=1`, (err, result) => {
        if (err) {
          callback(err)
        } else {
              callback(null, [])
        }
      })
    }


  },




}