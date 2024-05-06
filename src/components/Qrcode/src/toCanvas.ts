/*
 * @Date: 2024-04-28 19:05:31
 * @LastEditors: phil_litian
 */
import { renderQrCode } from './drawCanvas'
import { RenderQrCodeParams } from './typing'
import { drawLogo } from './drawLogo'

export function toCanvas(options: RenderQrCodeParams) {
  
  return renderQrCode(options).then((res) => options).then(drawLogo)
}
