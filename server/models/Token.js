const { Schema, model } = require('mongoose');

const Token = new Schema({
	token: { type: String, unique: true, required: true },
	userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = model('Token', Token);
