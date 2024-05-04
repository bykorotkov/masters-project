import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Context } from '../../../../App';
import minusIcon from '../../../../assets/minusIcon.png';
import plusIcon from '../../../../assets/plusIcon.png';

const Counter = ({ productId, quantityItems }) => {
	const { basketStore } = useContext(Context);
	const [quantity, setQuantity] = useState(quantityItems);

	const updateBasketWithToken = async (productId, newQuantity) => {
		try {
			const token = await AsyncStorage.getItem('token');
			basketStore.updateBasket(productId, newQuantity, token);
		} catch (error) {
			console.error('Произошла ошибка при получении токена из AsyncStorage:', error);
		}
	};

	const incrementQuantity = () => {
		const newQuantity = quantity + 1;
		updateBasketWithToken(productId, newQuantity);
		setQuantity(newQuantity);
	};

	const decrementQuantity = () => {
		if (quantity > 1) {
			const newQuantity = quantity - 1;
			updateBasketWithToken(productId, newQuantity);
			setQuantity(newQuantity);
		}
	};

	return (
		<View style={styles.Quantity}>
			<TouchableOpacity
				style={styles.MinusOpacity}
				onPress={decrementQuantity}>
				<Image
					source={minusIcon}
					style={styles.Minus}></Image>
			</TouchableOpacity>

			<Text>{quantity}</Text>
			<TouchableOpacity
				style={styles.PlusOpacity}
				onPress={incrementQuantity}>
				<Image
					source={plusIcon}
					style={styles.Plus}></Image>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	Quantity: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 20,
		marginTop: 10,
		justifyContent: 'center'
	},
	Minus: {
		width: 20,
		height: 20,
		objectFit: 'contain'
	},
	Plus: {
		width: 20,
		height: 20,
		objectFit: 'contain'
	},
	PlusOpacity: {},
	MinusOpacity: {}
});

export default Counter;
