import React from 'react';
import {AppRegistry} from 'react-native';
import App from './app/Navigator/App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './app/Store/store';
import Toast from 'react-native-toast-message';

const {store, persistor} = configureStore();

const Main = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toast ref={(ref) => Toast.setRef(ref)} />
        <App />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
