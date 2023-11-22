import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import CustomButton from '../../ui/CustomButton/CustomButton';

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
		<LinearGradient
			colors={['#00aaff', '#ffffff']}
			style={styles.backgroundGradient}>
			<View style={styles.container}>
				{/* <Text style={styles.title}></Text> */}
				<Text style={styles.subTitle}>Введите логин и пароль для входа в личный кабинет</Text>
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
				<CustomButton
					title='Войти'
					onPress={handleLogin}
					style={styles.button}
					width='100%'
				/>
			</View>
		</LinearGradient>
	);
};

LoginScreen.name = 'LoginScreen';

const styles = StyleSheet.create({
	backgroundGradient: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%'
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
		width: '100%'
	},
	// title: {
	// 	fontSize: 30,
	// 	fontWeight: 'bold',
	// 	marginBottom: 20,
	// 	color: '#ffffff',
	// 	textAlign: 'center',
	// 	backgroundColor: '#4586bb',
	// 	borderRadius: 10,
	// 	padding: 20
	// },
	subTitle: {
		fontSize: 16,
		fontWeight: '400',
		marginBottom: 20,
		color: '#fff',
		textAlign: 'center',
		backgroundColor: '#5697cd',
		padding: 20,
		borderRadius: 10
	},
	input: {
		width: '100%',
		marginBottom: 15,
		padding: 10,
		borderWidth: 1,
		borderColor: '#5697cd',
		borderRadius: 5,
		backgroundColor: '#fff'
	}
});

export default LoginScreen;
