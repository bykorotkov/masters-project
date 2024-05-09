const { Schema, model } = require('mongoose');

const Order = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	// status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
	createdAt: { type: Date, default: Date.now },
	name: { type: String, required: true },
	email: { type: String, required: true },
	phone: { type: String, required: true }
});

module.exports = model('Order', Order);
