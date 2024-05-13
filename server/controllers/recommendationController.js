const Basket = require('../models/Basket');
const BasketItem = require('../models/BasketItem');
const Product = require('../models/Product');
const Recommendation = require('../models/Recommendation');

class recommendationController {
	async createRecommendations(req, res) {
		try {
			const { userId } = req.params;

			const baskets = await Basket.find({ userId }).populate('orderId').populate('items.productId');

			const productCountMap = {};
			baskets.forEach(basket => {
				basket.items.forEach(item => {
					const productId = item.productId._id.toString();
					if (productCountMap[productId]) {
						productCountMap[productId] += item.quantity;
					} else {
						productCountMap[productId] = item.quantity;
					}
				});
			});

			const popularProducts = Object.keys(productCountMap)
				.sort((a, b) => productCountMap[b] - productCountMap[a])
				.slice(0, 5); // Получаем топ-5 популярных товаров

			const recommendations = new Recommendation({
				userId,
				recommendedProducts: popularProducts.map(productId => ({ productId }))
			});

			await recommendations.save();

			res.json(recommendations);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Ошибка при получении рекомендаций' });
		}
	}

	async getRecommendations(req, res) {
		try {
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Ошибка при получении рекомендаций' });
		}
	}
}

module.exports = new recommendationController();
