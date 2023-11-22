import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Card from '../../ui/Card/Card';

const PersonalAccountScreen = () => {
	const handleCardPress = () => {
		// Обработчик нажатия на карточку
	};
	return (
		<LinearGradient
			colors={['#00aaff', '#ffffff']}
			style={styles.backgroundGradient}>
			<View style={styles.container}>
				<Text style={styles.title}>Личный кабинет</Text>
				<Text style={styles.subtitle}>Добро пожаловать!</Text>
				<Text style={styles.cardTitle}>Выберите категорию товаров, которая вас интересует!</Text>
				<ScrollView contentContainerStyle={styles.cardsContainer}>
					<Card
						title='Алкоголь'
						onPress={handleCardPress}
					/>
					<Card
						title='Бакалея'
						onPress={handleCardPress}
					/>
					<Card
						title='Молочная продукция'
						onPress={handleCardPress}
					/>
					<Card
						title='Мясо, птица, колбаса'
						onPress={handleCardPress}
					/>
					<Card
						title='Фрукты и овощи'
						onPress={handleCardPress}
					/>
					<Card
						title='Хлеб и хлебобулочные изделия'
						onPress={handleCardPress}
					/>
					<Card
						title='Чай, кофе, какао'
						onPress={handleCardPress}
					/>
					<Card
						title='Товары для животных'
						onPress={handleCardPress}
					/>
					<Card
						title='Бытовая химия'
						onPress={handleCardPress}
					/>
					<Card
						title='Посуда'
						onPress={handleCardPress}
					/>
				</ScrollView>
			</View>
		</LinearGradient>
	);
};

PersonalAccountScreen.name = 'PersonalAccountScreen';

const styles = StyleSheet.create({
	backgroundGradient: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%'
	},
	container: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		paddingHorizontal: 10,
		paddingVertical: 10
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 10
	},
	subtitle: {
		fontSize: 18,
		color: '#666',
		marginBottom: 50
	},
	cardTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 20
	},
	cardsContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexWrap: 'wrap',
		flexDirection: 'row',
		width: '100%',
		overflow: 'scroll'
	}
});

export default PersonalAccountScreen;
