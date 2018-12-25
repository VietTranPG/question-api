var express = require('express');
var router = express.Router();
var userHelper = require('../helper/user');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken'); 
var config = require('config');
router.post('/', (req, res, next) => {
  signUp(req).then((result) => {
    res.send({
      status: "success",
      data: result
    })
  }).catch(err => {
    console.log(err)
    res.send({
      status: "error",
      message: err.message
    })
  });
});

router.get('/', (req, res, next) => {
  signIn(req).then((result) => {
    res.send({
      status: "success",
      data: result
    })
  }).catch(err => {
    console.log(err)
    res.send({
      status: "error",
      message: err.message
    })
  });
});

async function signUp(req) {
  try {
    let body = req.body;
    let existsUser = await userHelper.getUserByEmail(body.email);
    console.log('existsUser', existsUser)
    if (existsUser) {
      throw new Error('email already exists')
    } else {
      return await userHelper.signUp(body);
    }
  } catch (err) {
    throw err
  }
}

async function signIn(req) {
  try {
    let userObject = {
      email: req.query.email,
      password: req.query.password
    }
    let user = await userHelper.getUserByEmail(userObject.email);
    if (user) {
      if (passwordHash.verify(userObject.password, user.password)) {
        let token = jwt.sign({ id: user.id }, config.get('secrest_jwt'));
        return token;
      } else {
        throw new Error('Email Or Password is not correct!');
      }
    } else {
      throw new Error('Email Or Password is not correct!');
    }
  } catch (err) {
    throw err
  }
}
module.exports = router;