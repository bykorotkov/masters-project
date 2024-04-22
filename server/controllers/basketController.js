const Basket = require('../models/Basket');

const createBasket = async (req, res) => {
	try {
		const { userId, cartItems } = req.body;
		if (!cartItems) {
			return res.status(404).json({ message: 'Корзина пуста' });
		}
		if (!userId) {
			return res.status(404).json({ message: 'Пользователь не найден' });
		}
		const newBasket = await Basket.create({ userId, cartItems });
		res.status(201).json(newBasket);
	} catch (e) {
		res.status(400).json({ message: error.message });
	}
};

const updateBasket = async (req, res) => {
	try {
		const { userId, cartItems } = req.body;
	} catch (e) {
		res.status(400).json({ message: error.message });
	}
};

const getBasket = async (req, res) => {
	try {
		const baskets = await Basket.find();
		res.status(200).json(baskets);
	} catch (e) {
		res.status(400).json({ message: error.message });
	}
};

module.exports = { createBasket, getBasket, updateBasket };
