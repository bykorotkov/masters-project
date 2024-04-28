const Basket = require('../models/Basket');
const BasketItem = require('../models/BasketItem');

const createBasket = async (req, res) => {
	try {
		const { userId, orderId } = req.body;
		const basket = await Basket.findOne({ userId, orderId });

		console.log('basket', basket);
		if (basket && basket.orderId) {
			return res.status(404).json({ message: 'Корзина уже используется с оформленным ранее заказом' });
		}
		if (!userId) {
			return res.status(404).json({ message: 'Пользователь не найден' });
		}

		const newBasket = await Basket.create({ userId, orderId });

		res.status(201).json(newBasket);
	} catch (e) {
		res.status(400).json({ message: error.message });
	}
};

const updateBasket = async (req, res) => {
	try {
		const { userId, orderId } = req.body;
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
