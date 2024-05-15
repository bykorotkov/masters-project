import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Context } from '../../../App';

const ArchiveOrdersScreen = () => {
	const { orderStore } = useContext(Context);
	const [isLoading, setIsLoading] = useState(true);
	const [imageLoading, setImageLoading] = useState(true);

	useEffect(() => {
		const getOrders = async () => {
			const token = await AsyncStorage.getItem('token');
			await orderStore.getOrders(token);
			setIsLoading(false);
		};

		getOrders();
	}, [orderStore]);

	const formatCreatedAtDate = createdAt => {
		const date = new Date(createdAt);
		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			timeZoneName: 'short'
		};
		return date.toLocaleString('ru-RU', options);
	};

	return (
		<View style={styles.Container}>
			<Text style={styles.Heading}>Ваши заказы</Text>
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
					{orderStore.orders && orderStore.orders.length
						? orderStore.orders.map((order, index) => (
								<View
									key={index}
									style={styles.OrderInfo}>
									<View style={styles.ImageContainer}>
										{order.products.map((product, i) => (
											<>
												{product.image && (
													<Image
														key={i}
														source={{ uri: product.image }}
														style={styles.Image}
														onLoadEnd={() => setImageLoading(false)}
													/>
												)}
												{imageLoading && (
													<ActivityIndicator
														style={styles.Loader}
														size='large'
														color='#0000ff'
													/>
												)}
											</>
										))}
									</View>
									<Text>
										<Text style={styles.Span}>Имя:</Text> {order.name}
									</Text>
									<Text>
										<Text style={styles.Span}>Email:</Text> {order.email}
									</Text>
									<Text>
										<Text style={styles.Span}>Телефон:</Text> {order.phone}
									</Text>
									<Text>
										<Text style={styles.Span}>Дата создания:</Text> {formatCreatedAtDate(order.createdAt)}
									</Text>

									<Text style={styles.ProductDetails}>Товары в заказе</Text>

									{order.products.map((product, i) => (
										<View
											key={i}
											style={styles.ProductInfo}>
											<Text>
												<Text style={styles.Span}>Наименование:</Text> {product.name}
											</Text>
											<Text>
												<Text style={styles.Span}>Объем:</Text> {product.volume}
											</Text>
											<Text>
												<Text style={styles.Span}>Цена:</Text> {product.price} рублей
											</Text>
											<Text>
												<Text style={styles.Span}>Количество:</Text> {product.quantity}
											</Text>
										</View>
									))}
								</View>
						  ))
						: null}
				</ScrollView>
			)}
		</View>
	);
};

ArchiveOrdersScreen.name = 'ArchiveOrdersScreen';

const styles = StyleSheet.create({
	Container: {
		padding: 16,
		paddingBottom: 120
	},
	OrderInfo: {
		marginBottom: 20
	},
	Heading: {
		textAlign: 'center',
		fontSize: 26,
		textTransform: 'uppercase',
		marginVertical: 10
	},
	OrderInfo: {
		marginTop: 30,
		borderWidth: 1,
		borderRadius: 10,
		padding: 10
	},
	Span: {
		fontWeight: 'bold'
	},
	ImageContainer: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center', // Выравнивание изображений по центру
		justifyContent: 'flex-start',
		width: '100%',
		marginBottom: 20,
		flexWrap: 'wrap'
	},
	Image: {
		width: 100,
		height: 100,
		borderRadius: 10,
		marginRight: 13,
		marginBottom: 10
	},
	ProductDetails: {
		textAlign: 'center',
		fontWeight: 'bold',
		marginVertical: 10,
		padding: 10
	},
	ProductInfo: {
		marginBottom: 10,
		borderWidth: 1,
		padding: 10,
		borderRadius: 10
	}
});

export default ArchiveOrdersScreen;
