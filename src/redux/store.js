// src/redux/store.js

import { createStore } from 'redux'
import todoApp from './reducers/todoApp'

const store = createStore(todoApp)