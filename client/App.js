import { NavigationContainer } from '@react-navigation/native';
import React, { createContext } from 'react';
import AppNavigator from './Navigation/AppNavigator';
import AuthStore from './store/AuthStore';
import BasketStore from './store/BasketStore';

const authStore = new AuthStore();
const basketStore = new BasketStore();

export const Context = createContext({
	authStore,
	basketStore
});

const App = () => {
	return (
		<Context.Provider
			value={{
				authStore,
				basketStore
			}}>
			<NavigationContainer>
				<AppNavigator />
			</NavigationContainer>
		</Context.Provider>
	);
};

export default App;
