import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Context } from '../../../App';
import CustomButton from '../../ui/CustomButton/CustomButton';

const LoginScreen = ({}) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { store } = useContext(Context);
	const navigation = useNavigation();

	return (
		<LinearGradient
			colors={['#00aaff', '#ffffff']}
			style={styles.backgroundGradient}>
			<View style={styles.container}>
				<Text style={styles.subTitle}>Введите логин и пароль для входа в личный кабинет</Text>
				<TextInput
					style={styles.input}
					placeholder='Логин'
					onChangeText={text => setUsername(text)}
					value={username}
				/>
				<TextInput
					style={styles.input}
					placeholder='Пароль'
					secureTextEntry
					onChangeText={text => setPassword(text)}
					value={password}
				/>
				<CustomButton
					title='Войти'
					onPress={() => store.login(username, password, navigation)}
					style={styles.button}
					width='100%'
				/>
				<CustomButton
					title='Зарегистрироваться'
					onPress={() => store.registration(username, password)}
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
	subTitle: {
		fontSize: 16,
		fontWeight: '400',
		marginBottom: 40,
		color: '#fff',
		textAlign: 'center',
		backgroundColor: '#5697cd',
		padding: 20,
		borderRadius: 10,
		width: '100%'
	},
	input: {
		width: '100%',
		marginBottom: 20,
		padding: 10,
		borderWidth: 1,
		borderColor: '#5697cd',
		borderRadius: 5,
		backgroundColor: '#fff'
	},
	button: {
		marginTop: 20
	}
});

export default LoginScreen;
