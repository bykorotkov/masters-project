import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const CustomButton = ({ title, onPress, width, style }) => {
	const buttonWidth = width ? width : '80%';
	return (
		<TouchableOpacity
			style={[styles.button, { width: buttonWidth }, style]}
			onPress={onPress}>
			<Text style={styles.buttonText}>{title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		width: '80%',
		height: 50,
		backgroundColor: '#3f50b5',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10
	},
	buttonText: {
		fontSize: 16,
		color: 'white',
		fontWeight: 'bold'
	}
});

export default CustomButton;
