var fs = require("fs");
var path = require('path');
var guid = require('../common/guid')
var pathDB = path.join(__dirname, './../database/user.json');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');

const signUp = (user) => {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(pathDB, 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                }
                let userTable = JSON.parse(data)
                user.id = guid.create();
                user.password = passwordHash.generate(user.password);
                console.log(user)
                userTable.push(user);
                let newDB = JSON.stringify(userTable)
                fs.writeFile(pathDB, newDB, 'utf8');
                console.log(user);
                resolve(user);
            })
        } catch (err) {
            console.log('err', err);
            reject(err);
        }
    })
}

const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(pathDB, 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                }
                let userTable = JSON.parse(data)
                let user = userTable.find(x => x.email == email);
                resolve(user);
            })
        } catch (err) {
            console.log('err', err);
            reject(err);
        }
    })
}

const signIn = (user) => {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(pathDB, 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                }
                let userTable = JSON.parse(data)
                let user = userTable.find(x => x.email == email);
                resolve(user);
            })
        } catch (err) {
            console.log('err', err);
            reject(err);
        }
    })
}
module.exports = {
    signUp,
    getUserByEmail,
    signIn
}