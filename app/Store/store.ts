import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducers from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['profile'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default (initialState?: any) => {
  let store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk)),
  );
  let persistor = persistStore(store);

  return {store, persistor};
};
