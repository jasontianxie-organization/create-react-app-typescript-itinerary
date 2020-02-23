import { combineReducers } from 'redux';
import {login} from './login.js';
import {uploadList} from './uploadList.js';
import {spots} from './spots.js';


export default combineReducers({
    login,
    uploadList,
    spots
})