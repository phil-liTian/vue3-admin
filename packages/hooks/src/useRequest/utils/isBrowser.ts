/*
 * @Date: 2024-07-12 09:19:26
 * @LastEditors: phil_litian
 */

export const isBrowser = 
  typeof window !== 'undefined' && 
  window.document && 
  window.document.createElement
  
