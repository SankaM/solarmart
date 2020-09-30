import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,compose,applyMiddleware,combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {persistStore,persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {PersistGate} from 'redux-persist/integration/react';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import LayoutRedu from './store/reducers/LayoutRedu';
import CardRedu from './store/reducers/cardRedu';
import SnakbarRedu from './store/reducers/snakbarRedu';
import CartRedu from './store/reducers/cartRedu';
import CollectionRedu from './store/reducers/collectionRedu';


const persistConfig ={
    key:'root',
    storage,
    whitelist:['colr']
}

const combineReducer = combineReducers({
    lor:LayoutRedu,
    cr:CardRedu,
    sbr:SnakbarRedu,
    ctr:CartRedu,
    colr:CollectionRedu
})

const rootReducer =persistReducer(persistConfig,combineReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,composeEnhancers(
    applyMiddleware(thunk)
));
const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
