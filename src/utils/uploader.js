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
        let filename = file.name,
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
                    formData.append("file", chunk, filename + pieceNumber);
                    formData.append("fileId", fileId);
                    formData.append("pieceNumber", pieceNumber);
                    request.post(destUrl, formData).then(() => {
                        start = end;
                        uploadChunk()
                    })
                } else { //所有切片上传成功
                    alert("上传成功")
                }
             };
        uploadChunk()
    }
}