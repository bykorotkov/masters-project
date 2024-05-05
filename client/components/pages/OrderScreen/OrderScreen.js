import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const OrderScreen = () => {
	const [formData, setFormData] = useState({
		input1: '',
		input2: '',
		input3: ''
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

				<TouchableOpacity
					style={styles.Button}
					title='Сделать заказ'
					onPress={() => console.log('Заказать')}>
					<Text style={styles.TextButton}>Сделать заказ</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

OrderScreen.name = 'OrderScreen';

const styles = StyleSheet.create({
	Container: {
		padding: 10
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
	}
});

export default OrderScreen;
