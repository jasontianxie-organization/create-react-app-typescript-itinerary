import { combineReducers } from 'redux';
import {login} from './login.js';
import {uploadList} from './uploadList.js';


export default combineReducers({
    login,
    uploadList
})