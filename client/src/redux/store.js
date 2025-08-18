import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    user: userReducer
})

// is setting the name of the key in the local storage, the version and the storage
const persistConfig = {
   key: 'root',
   storage,
   version: 1,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)


// instead of passing user reducer now can pass persistedReducer
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

// persistor is going to make the store persist
export const persistor = persistStore(store);