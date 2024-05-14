import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Context } from '../../../App';

const RecommendationScreen = observer(() => {
	const { recommendationStore } = useContext(Context);
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(true);
	const [imageLoading, setImageLoading] = useState(true);

	useEffect(() => {
		const createRecommendation = async () => {
			const userId = await AsyncStorage.getItem('userId');
			recommendationStore.getRecommendations(userId);
			setIsLoading(false);
		};

		createRecommendation();
	}, []);

	return (
		<View style={styles.Container}>
			<Text style={styles.Title}>Страница рекомендаций</Text>
			<Text style={styles.Text}>Ваши личные тренды покупок за всё время:</Text>
			{isLoading ? (
				<>
					<Text>Данные загружаются...</Text>
					<ActivityIndicator
						size='large'
						color='#0000ff'
					/>
				</>
			) : (
				<>
					{recommendationStore.recommendations && recommendationStore.recommendations.length ? (
						<ScrollView style={styles.Outer}>
							<View style={styles.CardContainer}>
								{recommendationStore.recommendations.map((recommendation, index) => (
									<View
										key={index}
										style={styles.Card}>
										<View style={styles.ImageContainer}>
											<Image
												source={{ uri: recommendation.Image }}
												style={styles.Image}
												onLoadEnd={() => setImageLoading(false)}
											/>
											{imageLoading && (
												<ActivityIndicator
													style={styles.Loader}
													size='large'
													color='#0000ff'
												/>
											)}
										</View>

										<View style={styles.Description}>
											<Text style={styles.Name}>
												<Text style={styles.BoldText}>Название:</Text> {recommendation.Name}
											</Text>
											<Text style={styles.Rate}>
												<Text style={styles.BoldText}>Рейтинг:</Text> {recommendation.Rate}
											</Text>
											<View style={styles.Row}>
												<Text style={styles.Volume}>
													<Text style={styles.BoldText}>Объем:</Text> {recommendation.Volume}
												</Text>
												<Text style={styles.Price}>
													<Text style={styles.BoldText}>Цена:</Text> {recommendation.Price}
												</Text>
											</View>
										</View>
									</View>
								))}
							</View>
						</ScrollView>
					) : (
						<View style={styles.CaptionContainer}>
							<Text style={styles.Caption}>
								Данных пока что недостаточно. Совершите покупку, чтобы сформировать персональную рекомендацию!
							</Text>

							<TouchableOpacity
								style={styles.Button}
								title='Перейти к выбору товаров'
								onPress={() => navigation.navigate('PersonalAccountScreen')}>
								<Text style={styles.TextButton}>Перейти к выбору товаров</Text>
							</TouchableOpacity>
						</View>
					)}
				</>
			)}
		</View>
	);
});

RecommendationScreen.name = 'RecommendationScreen';

const styles = StyleSheet.create({
	Container: {
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: 10,

		backgroundColor: '#fff'
	},
	Title: {
		textAlign: 'center',
		fontSize: 26,
		textTransform: 'uppercase',
		marginVertical: 10
	},
	Text: {
		textAlign: 'center',
		fontSize: 16
	},
	CardContainer: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 20,
		width: '100%'
	},
	Card: {
		borderWidth: 1,
		borderColor: 'gray',
		marginBottom: 20,
		borderRadius: '10px 10px 0 0',
		marginRight: 18,
		width: '45%'
	},
	Description: {
		padding: 10
	},
	Name: {
		width: '100%'
	},
	BoldText: {
		fontWeight: 'bold'
	},
	Image: {
		width: '100%',
		height: 120,
		backgroundColor: '#fff',
		objectFit: 'contain',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0
	},
	CaptionContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '80%'
	},
	Caption: {
		fontSize: 24,
		textAlign: 'center'
	},
	Button: {
		marginTop: 20,
		backgroundColor: '#1976D2',
		borderRadius: 10,
		width: '100%'
	},
	TextButton: {
		textAlign: 'center',
		color: '#fff',
		paddingVertical: 20
	},
	ImageContainer: {
		position: 'relative'
	},
	Loader: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -15,
		marginLeft: -15
	}
});

export default RecommendationScreen;
