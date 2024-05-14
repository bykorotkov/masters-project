import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MaskInput from 'react-native-mask-input';
import { Context } from '../../../App';

const OrderScreen = () => {
	const { basketStore, orderStore, recommendationStore } = useContext(Context);
	const [isLoading, setIsLoading] = useState(true);
	const [formErrors, setFormErrors] = useState({});
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const navigation = useNavigation();

	useEffect(() => {
		const getItems = async () => {
			const token = await AsyncStorage.getItem('token');
			await basketStore.getBasket(token);
			setIsLoading(false);
		};

		getItems();
	}, [basketStore]);

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: ''
	});

	const handleInputChange = (name, value) => {
		setFormData({
			...formData,
			[name]: value
		});
	};

	const validateEmail = email => {
		const re = /\S+@\S+\.\S+/;
		return re.test(email);
	};

	const validatePhone = phone => {
		const re = /^\+\d{1}\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
		return re.test(phone);
	};

	const validateForm = () => {
		const errors = {};

		if (!formData.name.trim()) {
			errors.name = 'Поле "Введите имя" обязательно для заполнения';
		}

		if (!formData.email.trim()) {
			errors.email = 'Поле "Введите email" обязательно для заполнения';
		} else if (!validateEmail(formData.email)) {
			errors.email = 'Пожалуйста, введите корректный email';
		}

		if (!formData.phone.trim()) {
			errors.phone = 'Поле "Введите телефон" обязательно для заполнения';
		} else if (!validatePhone(formData.phone)) {
			errors.phone = 'Пожалуйста, введите корректный телефонный номер';
		}

		setFormErrors(errors);

		return Object.keys(errors).length === 0;
	};

	const submitOrder = () => {
		if (validateForm()) {
			console.log('Форма валидна, можно отправлять данные');

			addOrder();
			setIsFormSubmitted(true);
		} else {
			alert('Форма невалидна, пожалуйста, заполните все поля');
		}
	};

	const addOrder = async () => {
		try {
			const token = await AsyncStorage.getItem('token');
			const userId = await AsyncStorage.getItem('userId');

			await orderStore.createOrderFunc(formData.name, formData.email, formData.phone, token);
			await recommendationStore.createRecommendations(userId);
		} catch (e) {
			console.error('Не удалось создать заказ', e.message);
		}
	};

	return (
		<View style={styles.Container}>
			<Text style={styles.Heading}>Страница Заказа</Text>

			<ScrollView>
				{!isFormSubmitted ? (
					<>
						<View style={styles.InputContainer}>
							<TextInput
								style={[styles.Input, formErrors.name ? styles.ErrorInput : null]}
								placeholder='Введите имя'
								onChangeText={text => handleInputChange('name', text)}
								value={formData.name}
							/>
							{formErrors.name && <Text style={styles.ErrorText}>{formErrors.name}</Text>}

							<TextInput
								style={[styles.Input, formErrors.email ? styles.ErrorInput : null]}
								placeholder='Введите email'
								onChangeText={text => handleInputChange('email', text)}
								value={formData.email}
							/>
							{formErrors.email && <Text style={styles.ErrorText}>{formErrors.email}</Text>}
							<MaskInput
								style={[styles.Input, formErrors.phone ? styles.ErrorInput : null]}
								placeholder='Введите телефон'
								onChangeText={text => handleInputChange('phone', text)}
								value={formData.phone}
								mask={['+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
							/>
							{formErrors.phone && <Text style={styles.ErrorText}>{formErrors.phone}</Text>}
						</View>

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
								<Text style={styles.ListHeading}>Список ваших товаров:</Text>
								<View style={styles.ItemContainer}>
									{basketStore.products.map((item, index) => (
										<View
											key={item.productId}
											style={styles.Item}>
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
									))}
								</View>
							</>
						)}

						<TouchableOpacity
							style={styles.Button}
							title='Сделать заказ'
							onPress={submitOrder}>
							<Text style={styles.TextButton}>Сделать заказ</Text>
						</TouchableOpacity>
					</>
				) : (
					<View>
						<Text style={styles.ThankText}>Спасибо за заказ! {'\n'}Продуктовый набор будет скоро доставлен!</Text>

						<TouchableOpacity
							style={styles.Button}
							title='Вернуться на главную'
							onPress={() => navigation.navigate('PersonalAccountScreen')}>
							<Text style={styles.TextButton}>Вернуться на главную</Text>
						</TouchableOpacity>
					</View>
				)}
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
	InputContainer: {
		marginVertical: 20,
		gap: 10
	},
	Input: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		paddingHorizontal: 10,
		borderRadius: 10
	},
	ErrorInput: {
		borderColor: 'red'
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
	ItemContainer: {
		borderWidth: 1,
		padding: 10,
		borderRadius: 10,
		borderColor: '#00aaff',
		gap: 10
	},
	ListHeading: {
		fontSize: 20,
		marginBottom: 10
	},
	Item: {
		marginBottom: 0
	},
	ErrorText: {
		marginBottom: 10,
		color: 'red'
	},
	ThankText: {
		fontSize: 22,
		lineHeight: 30,
		textAlign: 'center',
		marginVertical: 40
	}
});

export default OrderScreen;
