import $base from '../http/api';

export default class RecommendationService {
	static async createRecommendation() {
		return $base.post('/recommendations/:userId');
	}

	static async getRecommendation() {
		return $base.get('/recommendations/:userId');
	}
}
