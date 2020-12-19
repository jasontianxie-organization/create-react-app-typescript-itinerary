import uuid from "uuid/v4"
import { request } from "@/fetchServerData/axios"

export default class Uploader {
    uploadStatus = 'pending'
    uploadedFilePath = ''
    fileId = uuid()
    file = null
    destUrl = ''
    spotId = null
    options = {
        chunkSize: 1024 * 1024,
        chunkStart: 0
      }
    constructor(file, destUrl, spotId = null, options = {}) {
        this.options = {...this.options, options};
        this.file = file;
        this.spotId = spotId;
        this.destUrl = destUrl;
        // this.upload(file, destUrl);
    }
    upload() {
        let fileName = this.file.name,
             fileSize = this.file.size,
            //  totalPieces = Math.ceil(file.size/this.options.chunkSize),
             start = this.options.chunkStart,
             end,
            //  fileId = uuid(),
             pieceNumber = 0;
             
        return new Promise((resolve, reject) => {
           const uploadChunk = () => {
                pieceNumber++;
                end = Math.min(start + this.options.chunkSize, fileSize);
                if (start < fileSize) {
                    var chunk = this.file.slice(start,end); //切割文件
                    var formData = new FormData();
                    formData.append("file", chunk, fileName + pieceNumber);
                    formData.append("fileId", this.fileId);
                    formData.append("pieceNumber", pieceNumber);
                    formData.append("fileName", fileName);
                    request.post(this.destUrl, formData).then((data) => {
                        if (data.code === 1 || data.code === 2) {
                            console.log(data.message)
                            this.uploadStatus = 'fail'
                            reject(data)
                        } else {
                            start = end;
                            uploadChunk()
                        }
                    }).catch(({message}) => {
                        console.log(message)
                        this.uploadStatus = 'fail'
                        reject({message})
                    })
                } else { //所有切片上传成功后，发送合并分片的请求
                    request.post("/api/uploads/merge", {fileId: this.fileId, fileName, spotId: this.spotId}).then((data) => {
                        console.log(data);
                        this.uploadedFilePath = data.path
                        resolve(data)
                    }, err => {
                        console.log(err)
                        this.uploadStatus = 'fail'
                        reject(err)
                    }).catch((err) => console.log(err));
                }
             };
            uploadChunk()
        })
    }
}