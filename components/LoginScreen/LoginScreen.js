import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

const LoginScreen = ({ navigation }) => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = () => {
		// Чтение содержимого файла credentials.json
		// RNFS.readFile(RNFS.DocumentDirectoryPath + '/credentials.json')
		// 	.then(contents => {
		// 		const credentials = JSON.parse(contents);
		// 		const { userLogin, userPassword } = credentials;

		// 		// Проверка введенных учетных данных
		// 		if (userLogin === login && userPassword === password) {
		// 			navigation.navigate('ЛичныйКабинет'); // Замените 'ЛичныйКабинет' на имя вашего экрана
		// 		} else {
		// 			// Ошибка аутентификации - неверные учетные данные
		// 		}
		// 	})
		// 	.catch(error => {
		// 		// Обработка ошибки чтения файла
		// 	});

		const userLogin = 'Admin'; // Здесь задайте свой логин
		const userPassword = 'admin'; // Здесь задайте свой пароль

		// Проверка введенных учетных данных
		if (userLogin === login && userPassword === password) {
			navigation.navigate('PersonalAccountScreen'); // Замените 'ЛичныйКабинет' на имя вашего экрана
		} else {
			// Ошибка аутентификации - неверные учетные данные
		}
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder='Логин'
				onChangeText={setLogin}
			/>
			<TextInput
				style={styles.input}
				placeholder='Пароль'
				secureTextEntry
				onChangeText={setPassword}
			/>
			<Button
				title='Войти'
				onPress={handleLogin}
			/>
		</View>
	);
};

LoginScreen.name = 'LoginScreen';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	input: {
		width: '80%',
		marginBottom: 15,
		padding: 10,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5
	}
});

export default LoginScreen;
