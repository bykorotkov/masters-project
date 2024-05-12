const { Schema, model } = require('mongoose');

const Product = new Schema({
	Name: { type: String, unique: true, required: true },
	Volume: { type: String, required: true },
	Price: { type: String, required: true },
	Rate: { type: String, required: true },
	Brief: { type: String, required: true },
	Type: { type: String, required: true },
	Image: { type: String, required: true }
});

module.exports = model('Product', Product);
