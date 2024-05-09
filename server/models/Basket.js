const { Schema, model } = require('mongoose');

const Basket = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	orderId: { type: Schema.Types.ObjectId, ref: 'Order', unique: true }
});

module.exports = model('Basket', Basket);
