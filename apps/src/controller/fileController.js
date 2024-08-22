import { FileService } from "../service/index.js";

class FileControl {
  fileService = new FileService()
  upload = async (ctx) => {
    const files = ctx.request.files.file
    console.log('ctx.request.files', ctx.request.files);
    
    if ( files?.length ) {
      await this.fileService.upload(ctx, files, true)
    } else {
      await this.fileService.upload(ctx, files, false)
    }
  }
}

export default new FileControl()
