const { Schema, model } = require('mongoose');

const BasketItem = new Schema({
	productId: { type: Schema.Types.ObjectId, unique: true, required: true, ref: 'Product' },
	quantity: { type: Number, required: true },
	price: { type: Number, required: true },
	basketId: { type: Schema.Types.ObjectId, ref: 'Basket', required: true, default: '' }
});

module.exports = model('BasketItem', BasketItem);
