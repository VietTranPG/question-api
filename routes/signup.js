var express = require('express');
var router = express.Router();
var QuestionStore = require('../helper/question');
let questionStore = new QuestionStore();
