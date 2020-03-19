let initState = {
    data: null,
    showLogin: false
}

export const users = (state=initState,action)=>{
    switch (action.type){
        case 'LOGIN_START':
            console.log('login startting');
            return {...state};
        case 'LOGIN_SUCCESS':
            console.log('login success');
            return {...state, data:action.payload}
        case 'LOGIN_FAIL':
            console.log('login fail');
            return {...state};
        case 'SHOW_LOGIN':
            console.log('show login dialog');
            return {...state, showLogin: true};
        case 'HIDE_LOGIN':
            console.log('hide login dialog');
            return {...state, showLogin: false};
        default:
            return state;
    }
}