import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Context } from '../../../App';

const ProductListScreen = observer(() => {
	const route = useRoute();
	const { filteredProducts, productType } = route.params;
	const { basketStore } = useContext(Context);
	const [isLoading, setIsLoading] = useState(true);

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
				console.log('Товар уже добавлен в корзину');
			}
		} catch (error) {
			console.error('Произошла ошибка при получении токена из AsyncStorage:', error);
		}
	};

	return (
		<ScrollView
			scrollEnabled={true}
			style={styles.Container}>
			<Text style={styles.Heading}>{productType}</Text>
			<View style={styles.List}>
				{filteredProducts.map(product => {
					const isProductInBasket = basketStore.isProductInBasket(product._id);

					return (
						<View
							key={product._id}
							style={styles.Card}>
							<View>
								<Image
									source={{ uri: product.Image }}
									style={styles.Image}
								/>
							</View>

							<View style={styles.Description}>
								<Text style={styles.Name}>Название: {product.Name}</Text>
								<Text style={styles.Rate}>Рейтинг: {product.Rate}</Text>
								<View style={styles.Row}>
									<Text style={styles.Volume}>Объем: {product.Volume}</Text>
									<Text style={styles.Price}>Цена: {product.Price}</Text>
								</View>
								<Text style={styles.Brief}>Описание: {product.Brief}</Text>
								{isProductInBasket._j ? (
									<TouchableOpacity
										style={styles.ButtonActive}
										title='Добавить в корзину'
										onPress={() => addToBasketWithToken(product._id)}>
										<Text style={styles.TextButton}>Товар добавлен</Text>
									</TouchableOpacity>
								) : (
									<TouchableOpacity
										style={styles.Button}
										title='Добавить в корзину'
										onPress={() => addToBasketWithToken(product._id)}>
										<Text style={styles.TextButton}>Добавить в корзину</Text>
									</TouchableOpacity>
								)}
							</View>
						</View>
					);
				})}
			</View>
		</ScrollView>
	);
});

ProductListScreen.name = 'ProductListScreen';

const styles = StyleSheet.create({
	Container: {
		padding: 16
	},
	Heading: {
		textAlign: 'center',
		color: 'black',
		fontSize: 26,
		marginBottom: 20,
		textTransform: 'uppercase'
	},
	List: {
		borderTopWidth: 2,
		borderTopColor: 'gray',
		paddingVertical: 20,
		overflow: 'auto'
	},
	Card: {
		borderWidth: 1,
		borderColor: 'gray',
		marginBottom: 20,
		borderRadius: '10px 10px 0 0'
	},
	Image: {
		width: '100%',
		height: 400,
		backgroundColor: '#fff',
		objectFit: 'contain',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0
	},
	Description: {
		padding: 10
	},
	Name: {
		fontSize: 16,
		fontWeight: '600'
	},
	Row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 10
	},
	Volume: {
		backgroundColor: 'purple',
		color: '#fff',
		padding: 10,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: 'purple',
		overflow: 'hidden',
		fontWeight: 700,
		fontSize: 16
	},
	Price: {
		fontSize: 18,
		textDecorationLine: 'underline'
	},
	Rate: {
		marginVertical: 10,
		fontSize: 16
	},
	Brief: {
		marginTop: 10
	},
	Button: {
		marginTop: 20,
		backgroundColor: '#1976D2',
		borderRadius: 10
	},
	ButtonActive: {
		marginTop: 20,
		backgroundColor: '#ccc',
		borderRadius: 10
	},
	TextButton: {
		textAlign: 'center',
		color: '#fff',
		paddingVertical: 10
	}
});

export default ProductListScreen;
