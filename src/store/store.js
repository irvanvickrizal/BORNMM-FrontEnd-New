import {configureStore} from '@reduxjs/toolkit';
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReduxSaga from "redux-saga";
import logger from "redux-logger";


import {authSlice} from '@app/store/reducers/auth';
import {uiSlice} from '@app/store/reducers/ui';
import {pagetextSlice} from '@app/store/reducers/pagetext';
import {dopSlice} from '@app/store/reducers/dop';
import {scopeSlice} from '@app/store/reducers/scope';
import { allReducer } from '@app/store/reducers/allReducer';
import { allSaga } from '@app/store/saga/allSaga';

const persistConfig = {
    key: 'bornxl',
    storage: AsyncStorage,
    timeout: null,
};
  
const sagaMiddleWare = ReduxSaga();

const persistedReducer = persistReducer(persistConfig, allReducer);

export const store = createStore(persistedReducer, {}, applyMiddleware(logger, sagaMiddleWare))

export const Persistor = persistStore(store);

sagaMiddleWare.run(allSaga);




// const persistConfig = {
//     key: "bornxl",
//     storage: AsyncStorage,
//     timeout: null,
// };
// const allReducer ={ }
// const persistedReducer = persistReducer(persistConfig, allReducer);
// const sagaMiddleWare = ReduxSaga();

// export const Store = createStore(persistedReducer, {}, applyMiddleware(logger, sagaMiddleWare));

// export const Persistor = persistStore(Store);

// sagaMiddleWare.run(allSaga);
