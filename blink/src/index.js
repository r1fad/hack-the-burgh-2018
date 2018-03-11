import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import 'bootstrap/dist/css/bootstrap.css';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

import {fetchUserData} from './actions';

const store = createStore(rootReducer, applyMiddleware(thunk));
// store.subscribe(() => console.log())
store.dispatch(fetchUserData());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root')
)
