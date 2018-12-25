var express = require('express');
var router = express.Router();
var QuestionStore = require('../helper/question');
let questionStore = new QuestionStore();

router.get('/', (req, res, next) => {
    let allQuestion = questionStore.all();
    res.send(allQuestion)
});
router.get('/:id', (req, res, next) => {
    let id = req.params.id
    let question = questionStore.getById(id);
    res.send(question)
});
router.post('/', (req, res) => {
    req.checkBody('question', 'question is required').notEmpty();
    req.checkBody('answers', 'a question need 4 answers').answersLength();
    req.getValidationResult().then(validationResult => {
        if (!validationResult.isEmpty()) {
            res.send({
                status: 'error',
                message: validationResult.array()
            })
            return;
        }
        let body = req.body;
        questionStore.add(body).then(data => {
            res.send({
                status: 'success',
                data: data,
                message: `Add new question Success`
            })
        }).catch(err => {
            res.send({
                status: 'error',
                message: err
            })
        });
    });
});
router.put('/:id', (req, res) => {
    req.checkBody('question', 'question is required').notEmpty();
    req.checkBody('answers', 'a question need 4 answers').answersLength();
    req.getValidationResult().then(validationResult => {
        let body = req.body;
        let id = req.params.id
        let question = questionStore.getById(id);
        if (!question) {
            res.send({
                status: 'error',
                message: `Not found question with id: ${id}`
            })
        }
        questionStore.update(body, id).then(data => {
            res.send({
                status: 'success',
                data: data,
                message: `Update Success`
            })
        }).catch(err => {
            res.send({
                status: 'error',
                message: err
            })
        })
    });
});
router.delete('/:id', (req, res) => {
    let id = req.params.id
    let question = questionStore.getById(id);
    if (!question) {
        res.send({
            status: 'error',
            message: `Not found question with id: ${id}`
        })
    }
    questionStore.delete(id).then(data => {
        res.send({
            status: 'success',
            data: data,
            message: `Delete Success`
        })
    }).catch(err => {
        res.send({
            status: 'error',
            message: err
        })
    })
});
module.exports = router;