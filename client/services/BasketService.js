import $base from '../http/api';

export default class BasketService {
	static async addToBasket(productId, quantity, token) {
		return $base.post('/', { productId, quantity, token });
	}

	static async deleteFromBasket(productId, token) {
		return $base.delete('/', { productId, token });
	}

	static async updateBasket(productId, quantity, token) {
		return $base.put('/', { productId, quantity, token });
	}

	static async getBasket(token) {
		console.log('token from service', token);
		return $base.get('/get-cart', { token });
	}
}
