import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Context } from '../../../App';

const OrderScreen = () => {
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

	const [formData, setFormData] = useState({
		input1: '',
		input2: '',
		input3: '',
		input4: ''
	});

	const handleInputChange = (name, value) => {
		setFormData({
			...formData,
			[name]: value
		});
	};

	return (
		<View style={styles.Container}>
			<Text style={styles.Heading}>Страница Заказа</Text>

			<ScrollView>
				{isLoading ? (
					<>
						<Text>Данные загружаются...</Text>
						<ActivityIndicator
							size='large'
							color='#0000ff'
						/>
					</>
				) : (
					<View>
						{basketStore.products.map((item, index) => (
							<View
								key={item.productId}
								style={styles.Item}>
								<View style={styles.Left}>
									<Text>
										<Text style={styles.Span}>Позиция {index + 1}:</Text> {item.productDetails.Name}
									</Text>
									<Text>
										<Text style={styles.Span}>Количество:</Text> {item.quantity}
									</Text>
									<Text>
										<Text style={styles.Span}>Цена:</Text> {item.price}
									</Text>
								</View>
							</View>
						))}
					</View>
				)}

				<View>
					<TextInput
						style={styles.Input}
						placeholder='Введите имя'
						onChangeText={text => handleInputChange('input1', text)}
						value={formData.input1}
					/>
					<TextInput
						style={styles.Input}
						placeholder='Введите email'
						onChangeText={text => handleInputChange('input2', text)}
						value={formData.input2}
					/>
					<TextInput
						style={styles.Input}
						placeholder='Введите телефон'
						onChangeText={text => handleInputChange('input3', text)}
						value={formData.input3}
					/>

					<TextInput
						style={styles.Input}
						placeholder='Введите адрес доставки'
						onChangeText={text => handleInputChange('input4', text)}
						value={formData.input4}
					/>

					<TouchableOpacity
						style={styles.Button}
						title='Сделать заказ'
						onPress={() => console.log('Заказать')}>
						<Text style={styles.TextButton}>Сделать заказ</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
};

OrderScreen.name = 'OrderScreen';

const styles = StyleSheet.create({
	Container: {
		padding: 10,
		paddingBottom: 150
	},
	Heading: {
		textAlign: 'center',
		fontSize: 26,
		textTransform: 'uppercase',
		marginVertical: 20
	},
	Input: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		paddingHorizontal: 10,
		marginBottom: 20
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
	Item: {
		marginBottom: 20
	}
});

export default OrderScreen;
