/*
 * @Date: 2024-04-15 11:17:13
 * @LastEditors: phil_litian
 */
import dayjs from 'dayjs';

const DATE_FORMAT = 'YYYY-MM-DD'
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export const formatToDate = (date) => {
  return dayjs(date).format(DATE_FORMAT)
}

export const formateToDateTime = (date) => {
  return dayjs(date).format(DATE_TIME_FORMAT)
}

export const dateUtil = dayjs
