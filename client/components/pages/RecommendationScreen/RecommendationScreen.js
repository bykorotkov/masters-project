import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const RecommendationScreen = () => {
	return (
		<View style={styles.Container}>
			<Text style={styles.Title}>Страница рекомендаций</Text>
			<Text style={styles.Text}>Здесь будут находиться Ваши персональные рекомендации</Text>
		</View>
	);
};

RecommendationScreen.name = 'RecommendationScreen';

const styles = StyleSheet.create({
	Container: {
		flex: 1,
		paddingHorizontal: 10,
		paddingVertical: 10,
		backgroundColor: '#fff'
	},
	Title: {
		textAlign: 'center',
		fontSize: 26,
		textTransform: 'uppercase',
		marginVertical: 10
	},
	Text: {}
});

export default RecommendationScreen;
