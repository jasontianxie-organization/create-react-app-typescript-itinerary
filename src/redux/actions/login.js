import axios from 'axios';
import {
    config
} from '../../src/common/ajaxConfig.js';
import Cookies from "js-cookie";


export function login(values) {
    return function (dispatch, getState) {
        dispatch({
            type: 'LOGIN_START',
            payload: ''
        });
        axios.post(config.mainDomain + '/users', values).then((response) => {
                if (response.data.length > 0) {
                    Cookies.set("username", response.data[0].name);
                    Cookies.set("userpass", response.data[0].pass);
                    Cookies.set("userid", response.data[0].id);
                }
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
                dispatch({
                    type: 'LOGIN_FAIL',
                    payload: error
                })
            });

    }
}