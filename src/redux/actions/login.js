import {request} from '@/fetchServerData/axios';


export function login(values) {
    return function (dispatch, getState) {
        dispatch({
            type: 'LOGIN_START',
            payload: ''
        });
        request.post("/api/users/login", {name: values.name, password: values.password}).then((response) => {
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