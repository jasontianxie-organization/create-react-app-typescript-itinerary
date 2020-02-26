import Uploader from "@/utils/uploader"

function uploadFileAction(file) {
    const File = new Uploader(file.file.antdFile.file, file.destUrl, file.spotId)
    return function (dispatch, getState) {
        dispatch({
            type: 'UPLOAD_START',
            payload: {fileId: File.fileId, file: File, status: 'start', path:''}
        });
        File.upload().then((data) => {
            dispatch({
                type: 'UPDATE_CURRENT_SPOT_ID',
                payload: data.spotId
            })
            dispatch({
                type: 'UPDATE_SPOTS',
                payload: data.spotId
            })
            dispatch({
                type: 'UPLOAD_SUCCESS',
                payload: {fileId: File.fileId, file: File, status: 'success', path: data.path}
            })
        }).catch((err) => {
            dispatch({
                type: 'UPLOAD_FAIL',
                payload: {fileId: File.fileId, file: File, status: 'fail', path:''}
            })
        })
    }
}

export { uploadFileAction }