import { makeAutoObservable } from 'mobx';
import BasketService from '../services/BasketService';

export default class BasketStore {
	products = [];

	constructor() {
		makeAutoObservable(this);
	}

	setProduct(productItems) {
		this.products = productItems;
	}

	async addToBasket(productId, quantity, token) {
		try {
			const response = await BasketService.addToBasket(productId, quantity, token);

			this.setProduct(response.data.products);
		} catch (error) {
			console.error('Произошла ошибка при добавлении товара в корзину:', error);
		}
	}

	async deleteFromBasket(productId, token) {
		try {
			const response = await BasketService.deleteFromBasket(productId, token);

			this.setProduct(response.data.products);
		} catch (error) {
			console.error('Произошла ошибка при удалении данных', error);
		}
	}

	async updateBasket(productId, quantity, token) {
		try {
			const response = await BasketService.updateBasket(productId, quantity, token);

			this.setProduct(response.data.products);
		} catch (error) {
			console.error('Произошла ошибка при обновлении данных', error);
		}
	}

	async getBasket(token) {
		try {
			const response = await BasketService.getBasket(token);
			this.setProduct(response.data);

			if (!response.data) {
				console.log('Козина пустая');
			}
		} catch (error) {
			console.error('Произошла ошибка при получении корзины', error.message);
		}
	}

	async isProductInBasket(productId) {
		try {
			return this.products.some(item => item.productId === productId);
		} catch (error) {
			console.error('Не удалось проверить товар в корзине', error.message);
		}
	}
}
