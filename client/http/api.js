import axios from 'axios';

export const BASE_URL = `http://192.168.1.198:5000/`;

const $base = axios.create({
	withCredentials: true,
	baseURL: BASE_URL
});

export default $base;
