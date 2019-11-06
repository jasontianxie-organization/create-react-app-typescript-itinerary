let initState = {
    data:null
}

export const login = (state=initState,action)=>{
    switch (action.type){
        case 'LOGIN_START':
        console.log('login startting');
        return state;
        case 'LOGIN_SUCCESS':
        console.log('login success');
        return {...state,data:action.payload}
        case 'LOGIN_FAIL':
        console.log('login fail');
        return state;
        default:
        return state;
    }
}