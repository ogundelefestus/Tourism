/* eslint-disable no-dupe-keys */
const mongoose = require('mongoose');

const requiredStringValidator = [
	function (val) {
		let testVal = val.trim()
		return (testVal.length > 0)
	},
	// Custom error text
	'Please supply a value for {PATH}'	
];

const touristsSitesSchema = new mongoose.Schema({
	name: {
		type: String,
    required: true,
    validate: requiredStringValidator 
  },
	location: {
		type: String,
    required: true,
    validate: requiredStringValidator 
  },
	address: String,
	state: {
		type: String,
    required: true,
  },
	description: {
		type: String,
    required: true,
  },
  attractions: String,
  category: String,
	website: String,
	email: String,
	phone: String,
	socials: {
    facebook: String, _id: false,
    twitter: String, _id: false,
    youtube: String, _id: false,
    instagram: String, _id: false},
	openingHours: String,
	imageUrls: {type: Array, default: []},
  sources: String,
  createdOn: {
		type: Date,
		default: Date.now }
}, {timestamps: true});

module.exports = mongoose.model( 'Sites', touristsSitesSchema )