import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HomeScreen = () => {
	const navigation = useNavigation();
	const handlePress = () => {
		// Переход на экран входа
		navigation.navigate('LoginScreen');
	};

	return (
		<LinearGradient
			colors={['#00aaff', '#ffffff']}
			style={styles.backgroundGradient}>
			<View style={styles.container}>
				<Text style={styles.title}>Приветствуем Вас, пользователь!</Text>
				<Text style={styles.subTitle}>Авторизуйтесь, чтобы пользоваться всеми функциями приложения</Text>
				<TouchableOpacity
					style={styles.button}
					onPress={handlePress}>
					<Text style={styles.buttonText}>Авторизоваться</Text>
				</TouchableOpacity>
			</View>
		</LinearGradient>
	);
};

HomeScreen.name = 'HomeScreen';

const styles = StyleSheet.create({
	backgroundGradient: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%'
		// paddingVertical: 40,
		// paddingHorizontal: 20
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 20,
		color: '#ffffff'
	},
	subTitle: {
		fontSize: 16,
		fontWeight: '400',
		marginBottom: 20,
		color: '#fff',
		textAlign: 'center'
	},
	button: {
		backgroundColor: '#000',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5
	},
	buttonText: {
		fontSize: 16,
		color: '#ffffff'
	}
});

export default HomeScreen;
