import Uploader from "@/utils/uploader"

function uploadFileAction(file) {
    const File = new Uploader(file.file.antdFile.file, file.destUrl)
    return function (dispatch, getState) {
        dispatch({
            type: 'UPLOAD_START',
            payload: {fileId: File.fileId, file: File, status: 'start'}
        });
        File.upload().then((data) => {
            dispatch({
                type: 'UPLOAD_SUCCESS',
                payload: {fileId: File.fileId, file: File, status: 'success'}
            })
        }).catch((err) => {
            dispatch({
                type: 'UPLOAD_FAIL',
                payload: {fileId: File.fileId, file: File, status: 'fail'}
            })
        })
        // axios.post(config.mainDomain + '/users', values).then((response) => {
        //         if (response.data.length > 0) {
        //             Cookies.set("username", response.data[0].name);
        //             Cookies.set("userpass", response.data[0].pass);
        //             Cookies.set("userid", response.data[0].id);
        //         }
        //         dispatch({
        //             type: 'LOGIN_SUCCESS',
        //             payload: response.data
        //         })
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //         dispatch({
        //             type: 'LOGIN_FAIL',
        //             payload: error
        //         })
        //     });
    }
}

export { uploadFileAction }