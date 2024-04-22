/*
 * @Date: 2024-04-15 11:17:13
 * @LastEditors: phil_litian
 */
import dayjs from 'dayjs';

const DATE_FORMAT = 'YYYY-MM-DD'

export const formatDate = (date) => {
  return dayjs(date).format(DATE_FORMAT)
}

export const dateUtil = dayjs
