/*
 * @Date: 2024-05-11 09:54:34
 * @LastEditors: phil_litian
 */
const projectName = import.meta.env.VITE_GLOB_APP_TITLE

export function error(message: string) {
  throw new Error(`[${projectName} error]: ${message}`)
}

export function warn(message: string) {
  console.warn(`[${projectName} warn]: ${message}`)
}