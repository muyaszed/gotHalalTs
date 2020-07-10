import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './app/Store/store';
import {Root} from 'native-base';

const Main = () => {
  return (
    <Provider store={store}>
      <Root>
        <App />
      </Root>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
