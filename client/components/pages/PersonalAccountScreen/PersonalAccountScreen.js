import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Context } from '../../../App';
import Card from '../../ui/Card/Card';
import CustomButton from '../../ui/CustomButton/CustomButton';
import { mockData } from './mockData';

const PersonalAccountScreen = () => {
	const { store } = useContext(Context);
	const navigation = useNavigation();
	const [products, setProducts] = useState([]);

	const fetchData = async () => {
		try {
			const response = await axios.get('http://192.168.1.198:5000/product/item');
			setProducts(response.data);
		} catch (error) {
			console.error('error', error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleCardPress = productType => {
		const filteredProducts = products.filter(product => product.Type === productType);
		navigation.navigate('ProductListScreen', { filteredProducts, productType });
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Личный кабинет</Text>
			<Text style={styles.subtitle}>Добро пожаловать!</Text>
			<Text style={styles.cardTitle}>Выберите категорию товаров, которая вас интересует!</Text>
			<CustomButton
				title='Выйти'
				onPress={() => store.logout(navigation)}
				style={styles.button}
				width='100%'
			/>

			<ScrollView contentContainerStyle={styles.cardsContainer}>
				{mockData.map(item => (
					<Card
						title={item.title}
						key={item.id}
						onPress={() => handleCardPress(item.title)}
					/>
				))}
			</ScrollView>
		</View>
	);
};

PersonalAccountScreen.name = 'PersonalAccountScreen';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		paddingHorizontal: 10,
		paddingVertical: 10,
		backgroundColor: '#fff'
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
		width: '97%',
		overflow: 'hidden'
	},
	button: {
		position: 'absolute',
		top: 15,
		right: 20,
		width: 100
	}
});

export default PersonalAccountScreen;
