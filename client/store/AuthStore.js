import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAutoObservable } from 'mobx';
import AuthService from '../services/AuthService';

export default class AuthStore {
	user = {};
	isAuth = false;

	constructor() {
		makeAutoObservable(this);
	}

	setAuth(bool) {
		this.isAuth = bool;
	}

	setUser(user) {
		this.user = user;
	}

	async login(username, password, navigation) {
		try {
			const token = await AsyncStorage.getItem('token');
			if (token) {
				this.setAuth(true);
				navigation.navigate('PersonalAccountScreen');
			} else {
				const response = await AuthService.login(username, password);
				AsyncStorage.setItem('token', response.data.token);
				AsyncStorage.setItem('userId', response.data.userId);
				AsyncStorage.setItem('username', response.data.username);
				this.setAuth(true);
				this.setUser(response.data.user);
				navigation.navigate('PersonalAccountScreen');
			}
		} catch (e) {
			alert(e.response?.data?.message);
			console.log(e.response?.data?.message);
		}
	}

	async registration(username, password) {
		try {
			const response = await AuthService.registration(username, password);
			AsyncStorage.setItem('token', response.data.token);
			this.setAuth(true);
			this.setUser(response.data.user);
			alert('Регистрация пройдена успешно. Теперь вы можете войти');
		} catch (e) {
			alert(e.response?.data?.message);
			console.log(e.response?.data?.message);
		}
	}

	async logout(navigation) {
		try {
			const response = await AuthService.logout();
			AsyncStorage.removeItem('token', response.data.token);
			this.setAuth(false);
			this.setUser({});
			navigation.navigate('HomeScreen');
		} catch (e) {
			console.log(e.response?.data?.message);
		}
	}
}
