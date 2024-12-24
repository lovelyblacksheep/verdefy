import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';

import userSlice from './user';
import salesManSlice from './salesMan';
import dealerShipSlice from './dealerShip';
import transactionSlice from './transaction';
import customerSlice from './customer';
import invoiceSlice from './invoice';
import profitPercentSlice from './profitPercent';

const persistConfig = {
    key: 'verdefy',
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
    // alerts: alertsSlice.reducer,
    auth: userSlice.reducer,
    sales: salesManSlice.reducer,
    dealership: dealerShipSlice.reducer,
    transaction: transactionSlice.reducer,
    customers: customerSlice.reducer,
    invoice: invoiceSlice.reducer,
    profit: profitPercentSlice.reducer,
}));

// config the store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({
            thunk: false,
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    ]
})

const storeWithPersistor = {
    ...store,
    _persistor: persistStore(store)
}

export default storeWithPersistor