/*
 * @Date: 2024-04-28 20:14:58
 * @LastEditors: phil_litian
 */

import { isString } from "@/utils/is";
import { LogoType } from "./typing";

export function drawLogo({ canvas, logo }) {
  console.log('canvas', canvas, logo);
  if( !logo ) {
    return 
  }
  const canvasWidth = (canvas as HTMLCanvasElement).width;
  const { 
    logoSize = 0.15,
    bgColor = '#ff0000',
    borderSize = 0.05
  } = logo as LogoType

  console.log('logoSize-->', logoSize);
  const logoSrc = isString(logo) ? logo : logo.src
  const image = new Image()
  image.src = logoSrc
  const logoWidth = canvasWidth * logoSize;
  const logoXY = (canvasWidth * (1 - logoSize)) / 2;
  const logoBgWidth = canvasWidth * ( logoSize + borderSize )
  const logoBgXY = (canvasWidth * (1 - logoSize - borderSize) / 2)

  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#ff0000'
  ctx.fill()

  return new Promise((resolve) => {
    image.onload = () => {
      ctx.drawImage(image, logoXY, logoXY, logoWidth, logoWidth);

      // resolve((canvas as HTMLCanvasElement).toDataURL())
    }
  })
}
