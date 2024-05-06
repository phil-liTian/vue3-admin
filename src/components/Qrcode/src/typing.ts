/*
 * @Date: 2024-04-28 19:07:56
 * @LastEditors: phil_litian
 */
import type { QRCodeRenderersOptions } from 'qrcode'

export interface LogoType {
  src: string,
  bgColor?: string,
  logoSize?: number,
  borderSize?: number
}

export type {  QRCodeRenderersOptions }

// canvas参数
export interface RenderQrCodeParams {
  canvas: any,
  width?: number,
  content: string,
  logo?: string,
  options?: QRCodeRenderersOptions
}

export interface QrcodeDoneEventParams {
  url: string
}
