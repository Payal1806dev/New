import { createStore, combineReducers , Reducer } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { adminReducer } from './adminReducer';



const appReducer =combineReducers({
    adminReducer
})
const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig,  appReducer as Reducer<unknown, never>);

export const store = createStore(
    persistedReducer,
);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof appReducer>;