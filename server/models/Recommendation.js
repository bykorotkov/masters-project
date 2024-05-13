const { Schema, model } = require('mongoose');

const Recommendation = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	recommendedProducts: [{ productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true } }],
	createdAt: { type: Date, default: Date.now }
});

module.exports = model('Recommendation', Recommendation);
