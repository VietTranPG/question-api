var fs = require("fs");
var path = require('path');
var guid = require('../common/guid')
var authorize = require('../helper/authorize');
var pathDB = path.join(__dirname, './../database/question.json');

class QuestionStore {
    constructor() {
        this.questionData = require('./../database/question.json');
    }
    all() {
        return this.questionData;
    }
    getById(id) {
        return this.questionData.find(x => x.id == id);
    }
    add(question) {
        return new Promise((resolve, reject) => {
            try {
                fs.readFile(pathDB, 'utf8', (err, data) => {
                    if (err) {
                        console.log(err);
                    }
                    let db = JSON.parse(data)
                    question.id = guid.create();
                    db.push(question);
                    let newDB = JSON.stringify(db)
                    fs.writeFile(pathDB, newDB, 'utf8');
                    console.log(question);
                    resolve(question);
                })
            } catch (err) {
                console.log('err', err);

                reject(err);
            }
        })
    }
    update(body, id) {
        return new Promise((resolve, reject) => {
            try {
                fs.readFile(pathDB, 'utf8', (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    let db = JSON.parse(data);
                    let result = null;
                    for (let i = 0; i < db.length; i++) {
                        if (db[i].id == id) {
                            db[i].question = body.question;
                            db[i].type = body.type;
                            db[i].answers = body.answers;
                            result = db[i];
                            break;
                        }
                    }
                    let newDB = JSON.stringify(db)
                    fs.writeFile(pathDB, newDB, 'utf8');
                    resolve(result);
                })
            } catch (err) {
                reject(err);
            }
        })
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            try {
                fs.readFile(pathDB, 'utf8', (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    let db = JSON.parse(data);
                    let result = null;
                    let index = db.findIndex(x => x.id == id);
                    db.splice(index, 1);
                    let newDB = JSON.stringify(db)
                    fs.writeFile(pathDB, newDB, 'utf8');
                    resolve(result);
                })
            } catch (err) {
                reject(err);
            }
        })
    }
}
module.exports = QuestionStore;