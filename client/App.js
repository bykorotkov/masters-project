import { NavigationContainer } from '@react-navigation/native';
import React, { createContext } from 'react';
import AppNavigator from './Navigation/AppNavigator';
import AuthStore from './store/AuthStore';
import BasketStore from './store/BasketStore';
import OrderStore from './store/OrderStore';
import RecommendationStore from './store/RecommendationsStore';

const authStore = new AuthStore();
const basketStore = new BasketStore();
const orderStore = new OrderStore();
const recommendationStore = new RecommendationStore();

export const Context = createContext({
	authStore,
	basketStore,
	orderStore,
	recommendationStore
});

const App = () => {
	return (
		<Context.Provider
			value={{
				authStore,
				basketStore,
				orderStore,
				recommendationStore
			}}>
			<NavigationContainer>
				<AppNavigator />
			</NavigationContainer>
		</Context.Provider>
	);
};

export default App;
