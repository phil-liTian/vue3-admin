import { dataURLtoBlob, urlToBase64 } from './base64Conver'
export function downloadByBase64(buf: string, fileName: string, mime?: string, bom?: BlobPart ) {
  const base64Buf = dataURLtoBlob(buf)
  downloadByData(base64Buf, fileName, mime, bom)
}

// 下载数据
export function downloadByData(data: BlobPart, fileName: string, mime?: string, bom?: BlobPart) {
  const blobData = typeof bom !== 'undefined' ? [bom, data] : [data]
  const blob = new Blob(blobData, { type: mime || 'application/octet-stream' })
  const blobURL = window.URL.createObjectURL(blob)
  const tempLink = document.createElement('a')
  tempLink.href = blobURL
  tempLink.setAttribute('download', fileName)
  document.body.appendChild(tempLink)

  if (typeof tempLink.click === 'function') {
    tempLink.click()
  }
  document.body.removeChild(tempLink);
  window.URL.revokeObjectURL(blobURL)
}

/**
 * 通过url下载文件
 * @param param0 
 */
export function downloadByUrl(
  { url, target = '_blank', fileName }: { url: string; target?: TargetContext; fileName?: string}
) {
  const isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1
  const isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1

  if ( isChrome || isSafari ) {
    const link = document.createElement('a')
    link.href = url
    link.target = target

    if ( document.createEvent ) {
      const e = document.createEvent('MouseEvents')
      e.initEvent('click', true, true)
      link.dispatchEvent(e)
      return true
    }

    if ( url.indexOf('?') === -1 ) {
      url += `?download`
    }
  }
}

export function downloadByOnlineUrl(url: string, fileName: string, mime?: string, bom?: BlobPart) {
  urlToBase64(url).then((base64) => {
    downloadByBase64(base64, fileName, mime, bom)
  })
}
