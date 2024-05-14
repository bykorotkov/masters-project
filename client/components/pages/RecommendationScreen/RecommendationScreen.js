import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Context } from '../../../App';

const RecommendationScreen = observer(() => {
	const { recommendationStore } = useContext(Context);

	const userId = '65f45b65d7cf8f37e64cdc65';

	useEffect(() => {
		recommendationStore.getRecommendations(userId);
	}, []);

	return (
		<View style={styles.Container}>
			<Text style={styles.Title}>Страница рекомендаций</Text>
			<Text style={styles.Text}>Здесь будут находиться Ваши персональные рекомендации</Text>
			{recommendationStore.recommendations.map((recommendation, index) => (
				<Text
					key={index}
					style={styles.Text}>
					{recommendation.productId}
				</Text>
			))}
		</View>
	);
});

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
