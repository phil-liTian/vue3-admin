/*
 * @Date: 2024-03-26 16:28:05
 * @LastEditors: phil_litian
 */

export enum SizeEnum {
  XS = 'XS',
  SM = 'SM',
  MD = 'MD',
  LG = 'LG',
  XL = 'XL',
  XXL = 'XXL'
}

export enum screenEnum {
  XS = 320,
  SM = 640,
  MD = 768,
  LG = 960,
  XL = 1280,
  XXL = 1536,
}

export const screenMap = new Map<SizeEnum, number>()

screenMap.set(SizeEnum.XS, screenEnum.XS)
screenMap.set(SizeEnum.SM, screenEnum.SM)
screenMap.set(SizeEnum.MD, screenEnum.MD)
screenMap.set(SizeEnum.LG, screenEnum.LG)
screenMap.set(SizeEnum.XL, screenEnum.XL)
screenMap.set(SizeEnum.XXL, screenEnum.XXL)