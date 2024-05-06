import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Context } from '../../../App';
import closeIcon from '../../../assets/closeIcon.png';
import Counter from './Counter/Counter';

const BasketScreen = observer(() => {
	const { basketStore } = useContext(Context);
	const [isLoading, setIsLoading] = useState(true);
	const navigation = useNavigation();

	useEffect(() => {
		const getItems = async () => {
			const token = await AsyncStorage.getItem('token');
			await basketStore.getBasket(token);
			setIsLoading(false);
		};

		getItems();
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
					{basketStore.products && basketStore.products.length ? (
						basketStore.products.map(product => (
							<View
								key={product.productId}
								style={styles.List}>
								<View style={styles.Left}>
									<Text>
										<Text style={styles.Span}>Позиция:</Text> {product.productDetails.Name}
									</Text>
									<Text>
										<Text style={styles.Span}>Количество:</Text> {product.quantity}
									</Text>
									<Text>
										<Text style={styles.Span}>Цена:</Text> {product.price}
									</Text>
									<Text>
										<Text style={styles.Span}>Рейтинг:</Text> {product.productDetails.Rate}
									</Text>
									<Text>
										<Text style={styles.Span}>Краткое описание:</Text> {product.productDetails.Brief}
									</Text>
									<Text>
										<Text style={styles.Span}>Тип:</Text> {product.productDetails.Type}
									</Text>
									<Text>
										<Text style={styles.Span}>Basket ID:</Text> {product.basketId}
									</Text>

									<Counter
										productId={product.productId}
										quantityItems={product.quantity}
									/>
								</View>

								<View style={styles.DeleteContainer}>
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
							</View>
						))
					) : (
						<View>
							<Text style={styles.Caption}>Добавьте товары в корзину</Text>
							<TouchableOpacity
								style={styles.Button}
								title='Перейти к выбору товаров'
								onPress={() => navigation.navigate('PersonalAccountScreen')}>
								<Text style={styles.TextButton}>Перейти к выбору товаров</Text>
							</TouchableOpacity>
						</View>
					)}

					{basketStore.products && basketStore.products.length ? (
						<TouchableOpacity
							style={styles.Button}
							title='Оформить заказ'
							onPress={() => navigation.navigate('OrderScreen')}>
							<Text style={styles.TextButton}>Оформить заказ</Text>
						</TouchableOpacity>
					) : null}
				</ScrollView>
			)}
		</View>
	);
});

BasketScreen.name = 'BasketScreen';

const styles = StyleSheet.create({
	Container: {
		padding: 16,
		paddingBottom: 100
	},
	List: {
		marginTop: 20,
		borderWidth: 1,
		padding: 0,
		display: 'flex',
		flexDirection: 'row',
		gap: 9,
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
		borderRightWidth: 1,
		width: '75%'
	},
	DeleteContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	Delete: {
		display: 'flex',
		flexDirection: 'column-reverse',
		justifyContent: 'center',
		alignItems: 'center',
		height: 'auto',
		marginTop: 15,
		backgroundColor: '#ccc',
		paddingVertical: 10,
		borderRadius: 10
	},
	TextDelete: {
		width: 72,
		textAlign: 'center',
		marginTop: 10
	},
	DeleteImage: {
		width: 20,
		height: 20,
		objectFit: 'contain'
	},
	Caption: {
		textAlign: 'center',
		fontSize: 16,
		marginTop: 20
	},
	Span: {
		fontWeight: 'bold'
	}
});

export default BasketScreen;
