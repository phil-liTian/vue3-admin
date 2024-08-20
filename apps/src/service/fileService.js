import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const uploadUrl = 'http://localhost:3000/static/upload'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const filePath = path.join(__dirname, '../../static/upload')

export default class FileService {
  upload(ctx, files, isMultiple) {
    let fileReader, fileResource, writeStream;

    const fileFunc = (file) => {
      
      fileReader = fs.createReadStream(file.filepath);
      fileResource = filePath + `/${file.originalFilename}`;
      console.log(fileResource);

      writeStream = fs.createWriteStream(fileResource);
      fileReader.pipe(writeStream);
    }

    const returnFunc = (flag) => {
      if ( flag ) {

      } else {
        ctx.body = {
          code: 0,
          message: '上传成功',
          url: `${uploadUrl}/${files.originalFilename}`
        }
      }
    }
    if ( isMultiple ) {
      // TODO 一次上传多个文件
    } else {
      fileFunc(files)
    }

    returnFunc(isMultiple)
  }
}
