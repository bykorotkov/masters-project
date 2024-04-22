import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../components/pages/HomeScreen/HomeScreen';
import LoginScreen from '../components/pages/LoginScreen/LoginScreen';
import PersonalAccountScreen from '../components/pages/PersonalAccountScreen/PersonalAccountScreen';
import ProductListScreen from '../components/pages/ProductListScreen/ProductListScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
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
		</Stack.Navigator>
	);
};

export default AppNavigator;
