import { NavigationContainer } from '@react-navigation/native';
import React, { createContext } from 'react';
import AppNavigator from './Navigation/AppNavigator';
import AuthStore from './store/AuthStore';
import BasketStore from './store/BasketStore';
import OrderStore from './store/OrderStore';

const authStore = new AuthStore();
const basketStore = new BasketStore();
const orderStore = new OrderStore();

export const Context = createContext({
	authStore,
	basketStore,
	orderStore
});

const App = () => {
	return (
		<Context.Provider
			value={{
				authStore,
				basketStore,
				orderStore
			}}>
			<NavigationContainer>
				<AppNavigator />
			</NavigationContainer>
		</Context.Provider>
	);
};

export default App;
