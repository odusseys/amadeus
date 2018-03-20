import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

import user from './reducers/user';
import games from './reducers/games';

const persistConfig = {
  key: 'root',
  storage
};

const rootReducer = combineReducers({
  user,
  games
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer);

export const persistor = persistStore(store);

export default store;
