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

	async createRecommendations() {
		try {
			const response = await RecommendationService.createRecommendation();

			this.setRecommendations(response.data);
		} catch (e) {
			console.error('Произошла ошибка при создании рекомендаций', e);
		}
	}

	async getRecommendations() {
		try {
			const response = await RecommendationService.getRecommendation();

			this.setRecommendations(response.data);
		} catch (e) {
			console.error('Произошла ошибка при получении рекомендаций', e);
		}
	}
}
