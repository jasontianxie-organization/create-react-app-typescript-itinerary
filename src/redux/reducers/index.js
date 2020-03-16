import { combineReducers } from 'redux';
import {login} from './login.js';
import {uploadList} from './uploadList.js';
import {spots} from './spots.js';
import {itineraries} from './itineraries.js';


export default combineReducers({
    login,
    uploadList,
    spots,
    itineraries,
})