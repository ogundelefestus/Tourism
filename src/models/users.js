const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
	email: {
    type: String,
    required: [true, 'Please enter a valid email address']
  },
	password: {
		type: String,
  }
}, {timestamps: true});

module.exports = mongoose.model( 'Users', usersSchema )