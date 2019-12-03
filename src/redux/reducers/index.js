import { combineReducers } from 'redux';
import {login} from './login.js';
import {newItinerary} from './newItinerary.js';


export default combineReducers({
    login,
    newItinerary
})