const { Schema, model } = require('mongoose');

const BasketItem = new Schema({
	productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
	quantity: { type: Number, required: true },
	price: { type: Number, required: true },
	basketId: { type: Schema.Types.ObjectId, ref: 'Basket', required: true, default: '' }
});

// Определение составного уникального индекса
BasketItem.index({ productId: 1, basketId: 1 }, { unique: true });

module.exports = model('BasketItem', BasketItem);
