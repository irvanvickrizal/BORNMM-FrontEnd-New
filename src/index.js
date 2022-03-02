import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {toast} from 'react-toastify';
import {Gatekeeper} from 'gatekeeper-client-sdk';
import App from '@app/App';
import { store,Persistor } from '@app/store/store';
import { PersistGate } from "redux-persist/lib/integration/react";

import './index.scss';
import './i18n';
import * as serviceWorker from './serviceWorker';

toast.configure({
    autoClose: 3000,
    draggable: false,
    position: 'top-right',
    hideProgressBar: false,
    newestOnTop: true,
    closeOnClick: true,
    rtl: false,
    pauseOnVisibilityChange: true,
    pauseOnHover: true
});

//Gatekeeper.initialize('08401b7e-da7e-4bf3-a9bf-6f594ae5fb02');

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={Persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
