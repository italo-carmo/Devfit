import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {store, persistor} from './src/store';
import MainStack from './src/navigators/MainStack';

//importar stack

//Stacks:
//-Preload
//-StarterStack
//-AppTab

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
      <MainStack/>
      </NavigationContainer>
    </PersistGate>
  </Provider>
)
