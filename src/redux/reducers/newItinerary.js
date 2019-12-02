import Uploader from "@/utils/uploader.js"

let initState = []

export const newItinerary = (state=initState,action)=>{
    switch (action.type){
        case 'UPLOAD_FILE':
            let newState = [...state, new Uploader(action.payload.file.antdFile.file, action.payload.destUrl)];
            return newState;
        default:
        return state;
    }
}