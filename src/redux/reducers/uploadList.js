let initState = []
export const uploadList = (state=initState,action)=>{
    switch (action.type){
        case 'UPLOAD_START':
        case 'UPLOAD_SUCCESS':
        case 'UPLOAD_FAIL':
            let newState = []
            const idx = state.findIndex((i) => {
                return i.fileId === action.payload.fileId
            })
            if(idx === -1) {
                newState = [...state, action.payload]
            } else {
                newState = [...state]
                newState[idx] = action.payload
            }
            console.log(newState)
            return newState
        default:
        return state;
    }
}