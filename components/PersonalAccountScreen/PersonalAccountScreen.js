import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PersonalAccountScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Личный кабинет</Text>
			<Text style={styles.subtitle}>Добро пожаловать!</Text>
			{/* Здесь можно добавить дополнительный контент, отображающий информацию о пользователе */}
		</View>
	);
};

PersonalAccountScreen.name = 'PersonalAccountScreen';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 10
	},
	subtitle: {
		fontSize: 18,
		color: '#666'
	}
});

export default PersonalAccountScreen;
