import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Card = ({ title, onPress, backgroundColor }) => {
	const cardStyle = [styles.card, { backgroundColor: backgroundColor || styles.card.backgroundColor }];

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={onPress}>
			<View style={cardStyle}>
				<Text style={styles.title}>{title}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '48%'
	},
	card: {
		padding: 16,
		borderRadius: 8,
		marginVertical: 8,
		justifyContent: 'center',
		alignItems: 'center',
		height: 100,
		backgroundColor: '#fff',
		borderWidth: 2,
		borderColor: '#3f50b5',
		borderRadius: 20
	},
	title: {
		fontSize: 18,
		fontWeight: 'normal',
		color: '#000',
		textAlign: 'center'
	}
});

export default Card;
