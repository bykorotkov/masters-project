import $base from '../http/api';

export default class OrderService {
	static async createOrder(name, email, phone, token) {
		return $base.post('/orders', { name, email, phone, token });
	}

	static async getOrders(token) {
		return $base.get('/orders', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	}
}
