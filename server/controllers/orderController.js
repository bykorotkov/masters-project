const Order = require('../models/Order');
const Token = require('../models/Token');
const Basket = require('../models/Basket');
const BasketItem = require('../models/BasketItem');
const User = require('../models/User');

const createOrder = async (req, res) => {
	try {
		const { name, email, phone, address, token } = req.body;

		const tokenData = await Token.findOne({ token });

		if (!tokenData) {
			return res.status(400).json({ message: 'Пользователь не найден' });
		}

		if (!name || !email || !phone) {
			return res.status(400).json({ message: 'Не введены обязательные для заказа данные' });
		}

		const existingBasket = await Basket.findOne({ userId: tokenData.userId, orderId: { $exists: false } });
		if (!existingBasket) {
			return res.status(400).json({ message: 'Корзина не заполнена. Нечего заказывать' });
		}

		// Создание нового заказа
		const newOrder = await Order.create({
			name,
			email,
			phone,
			address,
			userId: tokenData.userId
		});

		// Связывание существующей корзины с только что созданным заказом
		existingBasket.orderId = newOrder._id;
		await existingBasket.save();

		// Создание новой пустой корзины для пользователя
		const newBasket = new Basket({
			userId: tokenData.userId
		});
		await newBasket.save();

		res.status(201).json({ message: 'Заказ успешно добавлен' });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const getOrders = async (req, res) => {
	try {
		const token = req.headers.authorization.replace('Bearer ', '');

		const tokenData = await Token.findOne({ token });

		if (!tokenData) {
			return res.status(400).json({ message: 'Пользователь не найден' });
		}

		const userId = tokenData.userId;

		const orders = await Order.find({ userId });

		if (orders.length === 0) {
			return res.status(200).json([]);
		}

		const ordersWithProducts = await Promise.all(
			orders.map(async order => {
				const basket = await Basket.findOne({ orderId: order._id });
				const basketItems = await BasketItem.find({ basketId: basket._id }).populate('productId');

				return {
					...order._doc,
					products: basketItems.map(item => ({
						name: item.productId.Name,
						volume: item.productId.Volume,
						image: item.productId.Image,
						price: item.price,
						quantity: item.quantity
					}))
				};
			})
		);

		res.status(200).json(ordersWithProducts);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

module.exports = { createOrder, getOrders };
