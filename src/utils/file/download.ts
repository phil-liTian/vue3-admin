
export function downloadByData() {

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
  }
}