/*
 * @Date: 2024-02-25 12:12:25
 * @LastEditors: phil_litian
 */


export const updateDarkTheme = (mode: string | null = 'light') => {
  const htmlRoot = document.querySelector('#htmlRoot')
  
  if ( mode === 'dark' ) {
    htmlRoot.setAttribute('data-theme', 'dark')
  } else {
    htmlRoot.setAttribute('data-theme', 'light')
  }
}