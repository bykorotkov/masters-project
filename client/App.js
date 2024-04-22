import { NavigationContainer } from '@react-navigation/native';
import React, { createContext } from 'react';
import AppNavigator from './Navigation/AppNavigator';
import Store from './store/store';

const store = new Store();

export const Context = createContext({
	store
});

const App = () => {
	return (
		<Context.Provider
			value={{
				store
			}}>
			<NavigationContainer>
				<AppNavigator />
			</NavigationContainer>
		</Context.Provider>
	);
};

export default App;
