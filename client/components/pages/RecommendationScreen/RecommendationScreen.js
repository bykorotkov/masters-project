import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Context } from '../../../App';

const RecommendationScreen = observer(() => {
	const { recommendationStore, basketStore } = useContext(Context);
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(true);
	const [imageLoading, setImageLoading] = useState(true);
	const [areAllProductsAdded, setAreAllProductsAdded] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		const createRecommendation = async () => {
			const userId = await AsyncStorage.getItem('userId');
			recommendationStore.getRecommendations(userId);
			setIsLoading(false);
		};

		createRecommendation();
	}, []);

	useEffect(() => {
		const getItems = async () => {
			const token = await AsyncStorage.getItem('token');
			await basketStore.getBasket(token);
			setIsLoading(false);
		};

		getItems();
	}, [basketStore]);

	const addToBasketWithToken = async productId => {
		try {
			const token = await AsyncStorage.getItem('token');
			if (!(await basketStore.isProductInBasket(productId))) {
				await basketStore.addToBasket(productId, 1, token);
			} else {
				basketStore.deleteFromBasket(productId, token);
			}
		} catch (error) {
			console.error('Произошла ошибка при получении токена из AsyncStorage:', error);
		}
	};

	const addPackage = async products => {
		try {
			const token = await AsyncStorage.getItem('token');
			const allProductsAdded = await isAllProductsAdded();
			setAreAllProductsAdded(allProductsAdded);

			if (!allProductsAdded) {
				await basketStore.addPackageToBasket(products, token);
				setAreAllProductsAdded(true);
			} else {
				alert('Товары уже в корзине');
			}
		} catch (error) {
			console.error('Произошла ошибка при добавлении набора:', error);
		}
	};

	const isAllProductsAdded = async () => {
		const allProductsAdded = await Promise.all(
			recommendationStore.recommendations.map(async recommendation => {
				return await basketStore.isProductInBasket(recommendation._id);
			})
		);

		return allProductsAdded.every(added => added);
	};

	useEffect(() => {
		const checkAllProductsAdded = async () => {
			const allProductsAdded = await isAllProductsAdded();
			setAreAllProductsAdded(allProductsAdded);
		};

		checkAllProductsAdded();
	}, [addToBasketWithToken, addPackage]);

	useEffect(() => {
		const calculateTotalPrice = () => {
			let total = 0;
			basketStore.products.forEach(product => {
				total += product.price * product.quantity;
			});
			setTotalPrice(total);
		};

		calculateTotalPrice();
	}, [basketStore.products]);

	return (
		<View style={styles.Container}>
			<Text style={styles.Title}>Страница рекомендаций</Text>
			<Text style={styles.Text}>Ваши личные тренды покупок за всё время:</Text>
			{isLoading ? (
				<>
					<Text>Данные загружаются...</Text>
					<ActivityIndicator
						size='large'
						color='#0000ff'
					/>
				</>
			) : (
				<>
					{recommendationStore.recommendations && recommendationStore.recommendations.length ? (
						<ScrollView style={styles.Outer}>
							<View style={styles.CardContainer}>
								{recommendationStore.recommendations.map((recommendation, index) => {
									const isProductInBasket = basketStore.isProductInBasket(recommendation._id);

									return (
										<View
											key={index}
											style={styles.Card}>
											<View style={styles.ImageContainer}>
												<Image
													source={{ uri: recommendation.Image }}
													style={styles.Image}
													onLoadEnd={() => setImageLoading(false)}
												/>
												{imageLoading && (
													<ActivityIndicator
														style={styles.Loader}
														size='large'
														color='#0000ff'
													/>
												)}
											</View>

											<View style={styles.Description}>
												<View style={styles.TopDesc}>
													<Text style={styles.Name}>
														<Text style={styles.BoldText}>Название:</Text> {recommendation.Name}
													</Text>
													<Text style={styles.Rate}>
														<Text style={styles.BoldText}>Рейтинг:</Text> {recommendation.Rate}
													</Text>
													<Text style={styles.Volume}>
														<Text style={styles.BoldText}>Объем:</Text> {recommendation.Volume}
													</Text>
													<Text style={styles.Price}>
														<Text style={styles.BoldText}>Цена:</Text> {recommendation.Price}
													</Text>
												</View>
												<View style={styles.BotDesc}>
													{isProductInBasket._j ? (
														<TouchableOpacity
															style={styles.ButtonActive}
															title='Добавить в корзину'
															onPress={() => addToBasketWithToken(recommendation._id)}>
															<Text style={styles.TextButton}>Удалить из корзины</Text>
														</TouchableOpacity>
													) : (
														<TouchableOpacity
															style={styles.Button}
															title='Добавить в корзину'
															onPress={() => addToBasketWithToken(recommendation._id)}>
															<Text style={styles.TextButton}>Добавить в корзину</Text>
														</TouchableOpacity>
													)}
												</View>
											</View>
										</View>
									);
								})}
							</View>

							{!areAllProductsAdded ? (
								<TouchableOpacity
									style={styles.ButtonBig}
									title='Добавить в корзину'
									onPress={() => addPackage(recommendationStore.recommendations)}>
									<Text style={styles.TextButton}>Добавить в корзину набор (Сейчас: {totalPrice}р.)</Text>
								</TouchableOpacity>
							) : (
								<TouchableOpacity
									style={styles.ButtonActiveBig}
									title='Все товары уже в корзине'
									onPress={() => addPackage(recommendationStore.recommendations)}>
									<Text style={styles.TextButton}>Все товары уже в корзине (Сейчас: {totalPrice}р.)</Text>
								</TouchableOpacity>
							)}
						</ScrollView>
					) : (
						<View style={styles.CaptionContainer}>
							<Text style={styles.Caption}>
								Данных пока что недостаточно. Совершите покупку, чтобы сформировать персональную рекомендацию!
							</Text>

							<TouchableOpacity
								style={styles.ButtonBig}
								title='Перейти к выбору товаров'
								onPress={() => navigation.navigate('PersonalAccountScreen')}>
								<Text style={styles.TextButton}>Перейти к выбору товаров</Text>
							</TouchableOpacity>
						</View>
					)}
				</>
			)}
		</View>
	);
});

RecommendationScreen.name = 'RecommendationScreen';

const styles = StyleSheet.create({
	Container: {
		paddingHorizontal: 16,
		paddingVertical: 10,
		backgroundColor: '#fff',
		paddingBottom: 100,
		minHeight: '100%'
	},
	Title: {
		textAlign: 'center',
		fontSize: 26,
		textTransform: 'uppercase',
		marginVertical: 10
	},
	Text: {
		textAlign: 'center',
		fontSize: 16
	},
	CardContainer: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 20,
		width: '100%'
	},
	Card: {
		borderWidth: 1,
		borderColor: 'gray',
		marginBottom: 20,
		borderRadius: '10px 10px 0 0',
		marginRight: 18,
		width: '45%',
		paddingVertical: 5,
		justifyContent: 'space-between'
	},
	Description: {
		padding: 10,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'stretch'
	},
	Name: {
		width: '100%'
	},
	BoldText: {
		fontWeight: 'bold'
	},
	Image: {
		width: '100%',
		height: 120,
		backgroundColor: '#fff',
		objectFit: 'contain',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0
	},
	CaptionContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '80%'
	},
	Caption: {
		fontSize: 24,
		textAlign: 'center'
	},
	Button: {
		marginTop: 20,
		backgroundColor: '#1976D2',
		borderRadius: 10,
		width: '100%'
	},
	ButtonActive: {
		marginTop: 20,
		backgroundColor: '#ccc',
		borderRadius: 10
	},
	ButtonBig: {
		marginTop: 10,
		backgroundColor: '#1976D2',
		borderRadius: 10,
		width: '100%',
		paddingVertical: 10
	},
	ButtonActiveBig: {
		marginTop: 10,
		backgroundColor: '#ccc',
		borderRadius: 10,
		paddingVertical: 10
	},
	TextButton: {
		textAlign: 'center',
		color: '#fff',
		paddingVertical: 5,
		paddingHorizontal: 10
	},
	ImageContainer: {
		position: 'relative'
	},
	Loader: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -15,
		marginLeft: -15
	}
});

export default RecommendationScreen;
