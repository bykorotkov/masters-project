import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const API_URL = `http://192.168.1.198:5000/auth`;

const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL
});

$api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${AsyncStorage.getItem('token')}`;
	return config;
});

export default $api;
