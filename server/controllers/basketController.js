const BasketItem = require('../models/BasketItem');
const Basket = require('../models/Basket');
const Token = require('../models/Token');
const Product = require('../models/Product');

class basketController {
	async addToBasket(req, res) {
		try {
			const { productId, quantity, token } = req.body;

			const tokenData = await Token.findOne({ token });

			if (!tokenData) {
				return res.status(400).json({ message: 'Пользователь не найден' });
			}

			if (!productId) {
				return res.status(400).json({ message: 'Такого товара не существует' });
			}

			if (!quantity || quantity <= 0) {
				return res.status(400).json({ message: 'Товара нет в наличии' });
			}

			const product = await Product.findOne({ _id: productId });

			const price = parseFloat(product.Price.replace(' рублей', ''));
			if (isNaN(price)) {
				return res.status(400).json({ message: 'Некорректное значение цены товара' });
			}

			if (!product) {
				return res.status(400).json({ message: 'Товар не найден' });
			}

			let basket = await Basket.findOne({ userId: tokenData.userId, orderId: null });
			if (!basket) {
				basket = new Basket({ userId: tokenData.userId, orderId: tokenData._id });
				await basket.save();
			}

			const existingProduct = await BasketItem.findOne({ productId, basketId: basket._id.toString() });

			if (existingProduct) {
				return res.status(400).json({ message: 'Товар уже находится в корзине' });
			}

			const newProduct = new BasketItem({ productId, quantity, basketId: basket._id, price: price });
			await newProduct.save();

			const basketItem = await BasketItem.find({ basketId: basket._id });
			res.status(200).json({ products: basketItem, message: 'Товар успешно добавлен в корзину' });
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: 'Ошибка при добавлении товара в корзину' });
		}
	}

	async deleteFromBasket(req, res) {
		try {
			const token = req.headers.authorization.replace('Bearer ', '');
			const { productId } = req.body;

			const tokenData = await Token.findOne({ token });

			if (!tokenData) {
				return res.status(400).json({ message: 'Пользователь не найден' });
			}

			if (!productId) {
				return res.status(400).json({ message: 'Такого товара не существует' });
			}

			const basket = await Basket.findOne({ userId: tokenData.userId, orderId: null });
			if (!basket) {
				return res.status(400).json({ message: 'Корзина не найдена' });
			}

			const existingProduct = await BasketItem.findOne({ productId, basketId: basket._id });

			if (!existingProduct) {
				return res.status(400).json({ message: 'Товара нет в корзине' });
			}

			await BasketItem.findOneAndDelete({ productId, basketId: basket._id });

			const basketItem = await BasketItem.find({ basketId: basket._id });

			const productIds = basketItem.map(item => item.productId);
			const products = await Product.find({ _id: { $in: productIds } });

			const enrichedBasketItems = basketItem.map(item => {
				const product = products.find(product => product._id.toString() === item.productId.toString());
				return {
					_id: item._id,
					productId: item.productId,
					quantity: item.quantity,
					price: item.price,
					basketId: item.basketId,
					productDetails: product // Добавляем подробности о продукте
				};
			});

			res.status(200).json({ products: enrichedBasketItems, message: 'Товар успешно удален из корзины' });
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: 'Ошибка при удалении товара из корзины' });
		}
	}

	async updateBasket(req, res) {
		try {
			const { productId, quantity, token } = req.body;

			const tokenData = await Token.findOne({ token });

			if (!tokenData) {
				return res.status(400).json({ message: 'Пользователь не найден' });
			}

			const basket = await Basket.findOne({ userId: tokenData.userId, orderId: null });
			if (!basket) {
				return res.status(400).json({ message: 'Корзина не найдена' });
			}

			const existingProduct = await BasketItem.findOne({ productId, basketId: basket._id });

			if (!existingProduct) {
				return res.status(400).json({ message: 'Товар не найден в корзине' });
			}

			await BasketItem.findOneAndUpdate({ productId, basketId: basket._id }, { quantity });
			const basketItem = await BasketItem.find({ basketId: basket._id });

			const productIds = basketItem.map(item => item.productId);
			const products = await Product.find({ _id: { $in: productIds } });

			const enrichedBasketItems = basketItem.map(item => {
				const product = products.find(product => product._id.toString() === item.productId.toString());
				return {
					_id: item._id,
					productId: item.productId,
					quantity: item.quantity,
					price: item.price,
					basketId: item.basketId,
					productDetails: product // Добавляем подробности о продукте
				};
			});

			res.status(200).json({ products: enrichedBasketItems, message: 'Количество товара успешно обновлено в корзине' });
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: 'Ошибка при обновлении количества товара в корзине' });
		}
	}

	async getBasket(req, res) {
		try {
			const token = req.headers.authorization.replace('Bearer ', '');

			const tokenData = await Token.findOne({ token });

			if (!tokenData) {
				return res.status(400).json({ message: 'Пользователь не найден' });
			}

			let basket = await Basket.findOne({ userId: tokenData.userId, orderId: null });

			if (!basket) {
				basket = new Basket({ userId: tokenData.userId });
				await basket.save();
			}

			const basketItem = await BasketItem.find({ basketId: basket._id });

			if (!basketItem) {
				return res.status(400).json({ message: 'Корзина пустая' });
			}
			const productIds = basketItem.map(item => item.productId);
			const products = await Product.find({ _id: { $in: productIds } });

			const enrichedBasketItems = basketItem.map(item => {
				const product = products.find(product => product._id.toString() === item.productId.toString());
				return {
					_id: item._id,
					productId: item.productId,
					quantity: item.quantity,
					price: item.price,
					basketId: item.basketId,
					productDetails: product // Добавляем подробности о продукте
				};
			});
			res.json(enrichedBasketItems);
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: 'Ошибка получения данных о корзине' });
		}
	}
}

module.exports = new basketController();
