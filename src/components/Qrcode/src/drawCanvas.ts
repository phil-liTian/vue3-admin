/*
 * @Date: 2024-04-28 19:39:27
 * @LastEditors: phil_litian
 */
import { toCanvas } from 'qrcode'
import { cloneDeep } from 'lodash-es'
import { RenderQrCodeParams, QRCodeRenderersOptions } from "./typing";

export const renderQrCode = async (_options: RenderQrCodeParams) => {
  const { canvas, content, width, options: params = {} } = _options
  const options = cloneDeep(params)
  options.errorCorrectionLevel = options.errorCorrectionLevel || getErrorCorrectionLevel(content)
  console.log('a-->', options, toCanvas(canvas, content, params));
  console.log('getOriginWidth--->', await getOriginWidth(content, options));
  
  return getOriginWidth(content, options).then((_width: number) => {
    options.scale = width ? (width / _width) * 4 : undefined
    // 返回一个promise可继续链式调用
    return toCanvas(canvas, content, options)
  })
}

function getOriginWidth(content, options: QRCodeRenderersOptions ) {
  const _canvas = document.createElement('canvas')
  return toCanvas(_canvas, content, options).then(() => _canvas.width)
}

// 对于内容少的qrCode 增加容错率
function getErrorCorrectionLevel(content: string) {
  if ( content.length > 36 ) {
    return 'M'
  } else if ( content.length > 16 ) {
    return 'Q'
  } else {
    return 'H'
  }
}

