import { createStackNavigator } from '@react-navigation/stack';
import { useContext } from 'react';
import { Context } from '../App';
import BasketScreen from '../components/pages/BasketScreen/BasketScreen';
import HomeScreen from '../components/pages/HomeScreen/HomeScreen';
import LoginScreen from '../components/pages/LoginScreen/LoginScreen';
import OrderScreen from '../components/pages/OrderScreen/OrderScreen';
import PersonalAccountScreen from '../components/pages/PersonalAccountScreen/PersonalAccountScreen';
import ProductListScreen from '../components/pages/ProductListScreen/ProductListScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
	const { authStore } = useContext(Context);

	return (
		<Stack.Navigator>
			<Stack.Screen
				name='HomeScreen'
				component={HomeScreen}
			/>
			<Stack.Screen
				name='LoginScreen'
				component={LoginScreen}
			/>
			<Stack.Screen
				name='PersonalAccountScreen'
				component={PersonalAccountScreen}
			/>
			<Stack.Screen
				name='ProductListScreen'
				component={ProductListScreen}
			/>
			<Stack.Screen
				name='BasketScreen'
				component={BasketScreen}
			/>
			<Stack.Screen
				name='OrderScreen'
				component={OrderScreen}
			/>
		</Stack.Navigator>
	);
};

export default AppNavigator;
