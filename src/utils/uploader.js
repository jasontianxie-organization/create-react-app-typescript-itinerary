import uuid from "uuid/v4"
import { request } from "@/fetchServerData/axios"

export default class Uploader {
    options = {
        chunkSize: 1024 * 1024,
        chunkStart: 0
      }
    constructor(file, destUrl, options = {}) {
        this.options = {...this.options, options}
        this.upload(file, destUrl)
    }
    upload(file, destUrl) {
        let fileName = file.name,
             fileSize = file.size,
            //  totalPieces = Math.ceil(file.size/this.options.chunkSize),
             start = this.options.chunkStart,
             end,
             fileId = uuid(),
             pieceNumber = 0,
             uploadChunk = () => {
                pieceNumber++;
                end = Math.min(start + this.options.chunkSize, fileSize);
                if (start < fileSize) {
                    var chunk = file.slice(start,end); //切割文件
                    var formData = new FormData();
                    formData.append("file", chunk, fileName + pieceNumber);
                    formData.append("fileId", fileId);
                    formData.append("pieceNumber", pieceNumber);
                    formData.append("fileName", fileName);
                    request.post(destUrl, formData).then((data) => {
                        if (data.code === 1) {
                            console.log(data.message)
                        } else {
                            start = end;
                            uploadChunk()
                        }
                    }).catch(({message}) => {
                        console.log(message)
                    })
                } else { //所有切片上传成功后，发送合并分片的请求
                    request.post("/api/uploads/merge", {fileId, fileName}).then((data) => {
                        console.log(data);
                    }, err => console.log(err))
                }
             };
        uploadChunk()
    }
}