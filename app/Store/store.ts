import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';
import reducers from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['profile'],
};

const persistedReducer = persistReducer(persistConfig, reducers);
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  let store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk)),
  );
  let persistor = persistStore(store);

  return {store, persistor};
};
