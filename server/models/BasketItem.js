const { Schema, model } = require('mongoose');

const BasketItem = new Schema({
	productId: { type: Schema.Types.ObjectId, unique: true, required: true, ref: 'Product' },
	quantity: { type: Number, required: true },
	// userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, default: 'null' },
	price: { type: Number, required: true },
	basketId: { type: Schema.Types.ObjectId, ref: 'Basket', unique: true, required: true, default: '' }
});

module.exports = model('BasketItem', BasketItem);
