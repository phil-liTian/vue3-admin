/*
 * @author: phil.li
 */
/*
 * @author: phil.li
 */
import axios from "axios"
import CryptoJS from "crypto-js"

// 文件上传进度
let progress = 0

export function bigFileUpload(file: File) {
  sliceUpload(file)
}

// 分片上传
async function sliceUpload(file: File) {
    // 1. 计算文件大小
    const fileSize = file.size
    // 2. 计算分片大小
    const sliceSize = 1024 * 1024 * 50 // 10M
    // 3. 计算分片数量
    const sliceCount = Math.ceil(fileSize / sliceSize)

    // 4. 上传分片
    let promiseArr: Promise<any>[] = []
    const fileId = await getFileMd5(file) as string
    for (let i = 0; i < sliceCount; i++) {
        // 4. 获取分片
        const slice = file.slice(i * sliceSize, (i + 1) * sliceSize)
        // 5. 上传分片
        // uploadSlice(slice, i, sliceCount)
        promiseArr.push(uploadSlice(slice, i, sliceCount, fileId))
    }

    // 5. 处理一个请求池
    requestPool(promiseArr, 3).then((res) => {
      console.log('所有请求响应结束', res);
      progress = 1 // 进度条完成
    })
}


// 分片上传
async function uploadSlice(slice: Blob, index: number, total: number, fileId: string) {
    const sliceFileId = (await getFileMd5(slice)) as string;
    const formData = new FormData()
    formData.append('file', slice)
    formData.append('index', index.toString())
    formData.append('total', total.toString())
    formData.append('sliceFileId', sliceFileId);
    formData.append('fileNameId', fileId);
    return axios.post('/upload', formData)
}

// 处理一个请求池
async function requestPool(promiseArr: Promise<any>[], limit: number) {
    let count = 0
    let result: any[] = []
    let allPromise: any[] = []
    for (const fn of promiseArr) {
      const res = await fn
      allPromise.push(res)
      result.push(res)
      if (promiseArr.length >= limit) {
       res.then(() => {
         count++
         progress = count / promiseArr.length * 100
         result = result.filter((item) => item !== res)
       })

       if ( result.length >= limit ) {
        try {
          await Promise.race(result);
        } catch (error) {
          console.log(error); 
        }
       }
      }
    }
    
    return Promise.all(allPromise)
}

function getFileMd5(file: Blob) {
  return new Promise((resolve, reject) => { 
    const fileReader = new FileReader();

		fileReader.onload = function () {
			const arrayBuffer = fileReader.result as ArrayBuffer;
			const md5 = CryptoJS.MD5(arrayBuffer).toString();
      resolve(md5);
		};
		fileReader.readAsArrayBuffer(file);
  })
}

