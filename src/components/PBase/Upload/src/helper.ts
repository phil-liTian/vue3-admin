
// 校验是否是图片类型文件
export function checkImgType(file: File) {
  return /^image\/(jpeg|jpg|png|gif)$/.test(file.type)
}

// 获取文件的base64编码
export function getBase64WithFile(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

