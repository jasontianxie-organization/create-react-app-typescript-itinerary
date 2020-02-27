let initState = {
    currentSpotId: null,
    spots: []
}
export const spots = (state=initState,action)=>{
    switch (action.type){
        case 'UPDATE_CURRENT_SPOT_ID':
            return {...state, currentSpotId: action.payload}
        case 'UPDATE_SPOTS':
            if(!(state.spots.includes(action.payload))) {
                return {...state, spots: [...state.spots, action.payload]}
            }
            break;
        default:
        return state;
    }
}