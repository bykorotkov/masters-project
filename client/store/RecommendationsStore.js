import { makeAutoObservable } from 'mobx';
import RecommendationService from '../services/RecommendationService';

export default class RecommendationStore {
	recommendations = [];

	constructor() {
		makeAutoObservable(this);
	}

	setRecommendations(recommendations) {
		this.recommendations = recommendations;
	}

	async createRecommendations(userId) {
		try {
			const response = await RecommendationService.createRecommendation(userId);

			this.setRecommendations(response.data);
		} catch (e) {
			console.error('Произошла ошибка при создании рекомендаций', e);
		}
	}

	async getRecommendations(userId) {
		try {
			const response = await RecommendationService.getRecommendation(userId);

			this.setRecommendations(response.data);
		} catch (e) {
			console.error('Произошла ошибка при получении рекомендаций', e);
		}
	}
}
