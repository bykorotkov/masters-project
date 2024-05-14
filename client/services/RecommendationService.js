import $base from '../http/api';

export default class RecommendationService {
	static async createRecommendation(userId) {
		return $base.post(`/recommendations/${userId}`);
	}

	static async getRecommendation(userId) {
		return $base.get(`/recommendations/${userId}`);
	}
}
