import React from 'react'
import ReactDOM from 'react-dom'
// , applyMiddleware, compose
import { createStore, applyMiddleware } from './mini-redux'
import thunk from './mini-redux-thunk'
import arrThunk from './mini-redux-array'
import { counter } from './index.redux'
import { Provider } from './mini-react-redux';
import App from './App'


const store = createStore(counter,applyMiddleware(thunk,arrThunk))
reactDOM.render(
    (
        <Provider store={store}>
            <App />
        </Provider>
    ),
    document.getElementById('root')
)
