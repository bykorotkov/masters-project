import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Context } from '../../../App';
import CustomButton from '../../ui/CustomButton/CustomButton';

const HomeScreen = () => {
	const navigation = useNavigation();
	const { authStore } = useContext(Context);

	useEffect(() => {
		const checkAuth = async () => {
			const token = await AsyncStorage.getItem('token');
			if (token) {
				authStore.setAuth(true);
				navigation.navigate('PersonalAccountScreen');
			}
		};

		checkAuth();
	}, [navigation, authStore]);

	const handlePress = () => {
		navigation.navigate('LoginScreen');
	};

	return (
		<LinearGradient
			colors={['#00aaff', '#ffffff']}
			style={styles.backgroundGradient}>
			<View style={styles.container}>
				<Text style={styles.title}>Приветствуем Вас в приложении по подбору продуктов персональной корзины!</Text>
				<Text style={styles.subTitle}>Авторизуйтесь, чтобы пользоваться всеми функциями приложения</Text>
				<CustomButton
					title='Авторизоваться'
					onPress={handlePress}
					style={styles.button}
					width='100%'
				/>
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
		width: '100%',
		paddingHorizontal: 20
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold',
		marginBottom: 20,
		color: '#ffffff',
		textAlign: 'center',
		backgroundColor: '#4586bb',
		borderRadius: 10,
		width: '100%',
		padding: 20
	},
	subTitle: {
		fontSize: 16,
		fontWeight: '400',
		marginBottom: 20,
		color: '#fff',
		textAlign: 'center',
		backgroundColor: '#5697cd',
		width: '100%',
		padding: 20,
		borderRadius: 10
	}
});

export default HomeScreen;
