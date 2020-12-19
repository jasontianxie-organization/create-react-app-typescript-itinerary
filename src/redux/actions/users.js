import {request} from '@/fetchServerData/axios';


export function login(data) {
    return function (dispatch, getState) {
        dispatch({
            type: 'LOGIN_START'
        });
        request.post("/api/users/login", {username: data.username, password: data.password}).then((response) => {
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: response
                })
                dispatch({type: "HIDE_LOGIN"})
            })
            .catch(function (error) {
                console.log(error);
                dispatch({
                    type: 'LOGIN_FAIL'
                })
            });

    }
}

export function logout() {
    return function (dispatch, getState) {
        request.get("/api/users/logout").then((response) => {
                dispatch({
                    type: 'LOGOUT_SUCCESS',
                    payload: response
                })
                dispatch({type: "HIDE_LOGIN"})
            })
            .catch(function (error) {
                console.log(error);
                dispatch({
                    type: 'LOGOUT_FAIL'
                })
            });

    }
}