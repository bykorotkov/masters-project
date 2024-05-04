import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Context } from '../../../App';
import closeIcon from '../../../assets/closeIcon.png';
import Counter from './Counter/Counter';

const BasketScreen = () => {
	const { basketStore } = useContext(Context);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getToken = async () => {
			const token = await AsyncStorage.getItem('token');
			await basketStore.getBasket(token);
			setIsLoading(false);
		};

		getToken();
	}, [basketStore]);

	const removeFromBasketWithToken = async productId => {
		try {
			const token = await AsyncStorage.getItem('token');
			basketStore.deleteFromBasket(productId, token);
		} catch (error) {
			console.error('Произошла ошибка при получении токена из AsyncStorage:', error);
		}
	};

	return (
		<View style={styles.Container}>
			<Text style={styles.Heading}>Ваша корзина</Text>
			{isLoading ? (
				<>
					<Text>Данные загружаются...</Text>
					<ActivityIndicator
						size='large'
						color='#0000ff'
					/>
				</>
			) : (
				<ScrollView>
					{basketStore.products.map(product => (
						<View
							key={product.productId}
							style={styles.List}>
							<View style={styles.Left}>
								<Text>Product ID: {product.productId}</Text>
								<Text>Quantity: {product.quantity}</Text>
								<Text>Price: {product.price}</Text>
								<Text>Basket ID: {product.basketId}</Text>

								<Counter
									productId={product.productId}
									quantityItems={product.quantity}
								/>
							</View>

							<TouchableOpacity
								style={styles.Delete}
								title='Удалить товар'
								onPress={() => removeFromBasketWithToken(product.productId)}>
								<Text style={styles.TextDelete}>Удалить товар</Text>
								<Image
									source={closeIcon}
									style={styles.DeleteImage}
								/>
							</TouchableOpacity>
						</View>
					))}

					<TouchableOpacity
						style={styles.Button}
						title='Оформить заказ'
						onPress={() => console.log('Заказ оформлен')}>
						<Text style={styles.TextButton}>Оформить заказ</Text>
					</TouchableOpacity>
				</ScrollView>
			)}
		</View>
	);
};

BasketScreen.name = 'BasketScreen';

const styles = StyleSheet.create({
	Container: {
		padding: 10
	},
	List: {
		marginTop: 20,
		borderWidth: 1,
		padding: 0,
		display: 'flex',
		flexDirection: 'row',
		gap: 10,
		borderRadius: 10
	},
	Button: {
		marginTop: 20,
		backgroundColor: '#1976D2',
		borderRadius: 10
	},
	TextButton: {
		textAlign: 'center',
		color: '#fff',
		paddingVertical: 20
	},
	Heading: {
		textAlign: 'center',
		fontSize: 26,
		textTransform: 'uppercase',
		marginVertical: 10
	},
	Left: {
		padding: 10,
		borderRightWidth: 1
	},
	Delete: {
		display: 'flex',
		flexDirection: 'column-reverse',
		justifyContent: 'center',
		alignItems: 'center',
		height: 'auto',
		marginTop: 15
	},
	TextDelete: {
		width: 60,
		textAlign: 'center',
		marginTop: 10
	},
	DeleteImage: {
		width: 20,
		height: 20,
		objectFit: 'contain'
	}
});

export default BasketScreen;
