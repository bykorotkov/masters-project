import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Context } from '../../../App';

const BasketScreen = () => {
	const { basketStore } = useContext(Context);

	useEffect(() => {
		const getToken = async () => {
			const token = await AsyncStorage.getItem('token');
			console.log('token from screen', token);
			basketStore.getBasket(token);
		};

		getToken();
	}, [basketStore]);

	return (
		<View>
			<Text>Ваша корзина:</Text>
			{basketStore.products.map(product => (
				<Text key={product.productId}>
					{product.productId} - {product.quantity}
				</Text>
			))}
		</View>
	);
};

BasketScreen.name = 'BasketScreen';

export default BasketScreen;
