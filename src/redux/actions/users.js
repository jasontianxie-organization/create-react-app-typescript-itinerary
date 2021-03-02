import {request} from '@/fetchServerData/axios';
import { message } from 'antd';


export function login(data) {
    return function (dispatch, getState) {
        dispatch({
            type: 'LOGIN_START'
        });
        request.post("/api/users/login", {username: data.username, password: data.password}).then((response) => {
            if(response.code === 0) {
                message.success('登录成功')
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: response.data
                })
            } else {
                message.error('登录失败')
                dispatch({
                    type: 'LOGIN_FAIL'
                })
            }
            })
            .catch(function (error) {
                message.error('登录失败')
                dispatch({
                    type: 'LOGIN_FAIL'
                })
            });

    }
}

export function logout() {
    return function (dispatch, getState) {
        dispatch({
            type: 'LOGOUT_START'
        });
        request.get("/api/users/logout").then((response) => {
                dispatch({
                    type: 'LOGOUT_SUCCESS',
                    payload: response
                })
            })
            .catch(function (error) {
                console.log(error);
                dispatch({
                    type: 'LOGOUT_FAIL'
                })
            });

    }
}