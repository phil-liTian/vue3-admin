import { fileController } from '../controller/index.js'

export default [
  {
    path: "/upload",
    method: 'post',
    action: fileController.upload
  }
]