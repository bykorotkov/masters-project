const BasketItem = require('../models/BasketItem');

class basketItemsController {
	async addToBasket(req, res) {
		try {
			const { productId, quantity, basketId } = req.body;
			const existingProduct = await BasketItem.findOne({ productId });
			if (existingProduct) {
				return res.status(400).json({ message: 'Товар уже находится в корзине' });
			}

			if (!productId) {
				return res.status(400).json({ message: 'Такого товара не существует' });
			}

			if (!quantity && quantity <= 0) {
				return res.status(400).json({ message: 'Товара нет в наличии' });
			}

			if (!basketId) {
				return res.status(400).json({ message: '' });
			}

			const newProduct = new BasketItem({ productId, quantity, userId });
			await newProduct.save();
			res.status(200).json({ message: 'Товар успешно добавлен в корзину' });
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: 'Ошибка при добавлении товара в корзину' });
		}
	}

	async deleteFromBasket(req, res) {
		try {
			const { productId, userId } = req.body;
			const deletedProduct = await BasketItem.findOne({ productId });

			if (!deletedProduct) {
				return res.status(400).json({ message: 'Товара нет в корзине' });
			}

			if (!userId) {
				return res.status(400).json({ message: 'К товару должен быть прикреплен юзер' });
			}

			if (userId !== deletedProduct.userId) {
				return res.status(400).json({ message: 'Нет прав удалять товар у другого пользователя' });
			}

			await BasketItem.findOneAndDelete({ productId });
			res.status(200).json({ message: 'Товар успешно удален из корзины' });
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: 'Ошибка при удалении товара из корзины' });
		}
	}

	async updateBasket(req, res) {
		try {
			const { productId, quantity, userId } = req.body;

			const updatedProduct = await BasketItem.findOne({ productId });

			if (!updatedProduct) {
				return res.status(400).json({ message: 'Товар не найден в корзине' });
			}

			if (!userId) {
				return res.status(400).json({ message: 'К товару должен быть прикреплен юзер' });
			}

			if (userId !== updatedProduct.userId) {
				return res.status(400).json({ message: 'Нет прав обновлять товар у другого пользователя' });
			}

			await BasketItem.findOneAndUpdate({ productId }, { quantity });
			res.status(200).json({ message: 'Количество товара успешно обновлено в корзине' });
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: 'Ошибка при обновлении количества товара в корзине' });
		}
	}

	async getBasket(req, res) {
		try {
			const basketItem = await BasketItem.find();
			res.json(basketItem);
		} catch (e) {
			console.log(e);
		}
	}
}

module.exports = new basketItemsController();
