const { Schema, model } = require('mongoose');

const Order = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
	// status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
	createdAt: { type: Date, default: Date.now }
});

module.exports = model('Order', Order);
