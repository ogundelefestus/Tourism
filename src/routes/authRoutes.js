const express = require('express');
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const debug = require('debug')('app:authRoutes');
const User = require('../models/users');

function router() {
  authRouter.route('/signup')
    .post((req, res) => {
      const {email, password} = req.body;
      if (!email || !password) {
        res.status(400).send({
          status: false,
          message: 'All fields are required'
        });
        return
      }
      User.findOne({ email })
      .then(user => {
        if (user) {
          return res.status(423)
          .send({status: false, message: 'This email already exists'})
        }
      });
        bcrypt.hash(password, 12)
        .then(password => {
          const user = new User({email, password});
          return user.save();
        })
        .then(() => res.status(200).send({status: true, message: 'User registered successfully'}))
        .catch(err => console.log(err));             
        res.json({message: 'Welcome to my Platform', email: email})      
      });
    authRouter.route('/')
    .post((req, res, next) => {
      const {email, password} = req.body;
      debug(email, password);
      res.json({ status:true, data: email })
      User.findOne({ email: 'joe@yahoo.com' })
        .then(user => {
          debug(user);
          if (!user) {
            return res
             .status(404)
             .send("User not found, please provide valid credentials");
          }
          bcrypt.compare('ololade', user.password).then(valid => {
            if (!valid) {
              return res.status(403).send("Incorrect username or password, please review details and try again");
            }
            const token = jwt.sign(
              { email: user.email, _id: user._id },
              "somesecretkey",
              { expiresIn: "1hr" }
            );
            debug(token)
            res.status(200).send({
              _id: user._id,
              token
            });
          });
        })
        .catch(err => console.log(err)); 
        })
  return authRouter;
}

module.exports = router;