let initState = {
    currentSpotId: "new",
    spots: []
}
export const spots = (state=initState,action)=>{
    switch (action.type){
        case 'UPDATE_CURRENT_SPOT_ID':
            return {...state, currentSpotId: action.payload}
        case 'UPDATE_SPOTS':
            let spotIndex = state.spots.findIndex((item) => {
                return item.spotId == action.payload.spotId
            })
            if (spotIndex > 0) { // 如果id已经存在了，则说明是更新该点的信息
                return {...state, spots: state.spots.map((item, index) => {
                    return spotIndex === index ? action.payload : item
                })}
            } else { // 如果id不存在，则说明是新增的点
                return {...state, spots: state.spots.concat(action.payload)}
            }
        case 'INIT_SPOTS':
            return {...state, spots: action.payload}
        default:
        return state;
    }
}