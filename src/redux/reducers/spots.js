let initState = {
    currentSpotId: null,
    spots: []
}
export const spots = (state=initState,action)=>{
    switch (action.type){
        case 'UPDATE_CURRENT_SPOT_ID':
            return {...state, currentSpotId: action.payload}
        default:
        return state;
    }
}