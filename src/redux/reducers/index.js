import { combineReducers } from 'redux';
import {users} from './users.js';
import {uploadList} from './uploadList.js';
import {spots} from './spots.js';
import {itineraries} from './itineraries.js';


export default combineReducers({
    users,
    uploadList,
    spots,
    itineraries,
})