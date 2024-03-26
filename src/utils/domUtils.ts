/*
 * @Date: 2024-03-24 20:51:25
 * @LastEditors: phil_litian
 */

// 去除空格
export const trim = (str: string) => {
  return str.replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

export const hasClass = (el: Element, className: string): boolean => {
  if ( !el || !className ) return false
  if ( className.indexOf(' ') !== -1 ) throw new Error('className not allow contain space')
  if ( el.classList ) {
    return el.classList.contains(className)
  } else {
    return el.className.indexOf(className) !== -1
  }
}

export const addClass = (el: Element, cls: string) => {
  if ( !el ) return
  let curClass = el.className
  
  const classes = (cls || '').split(' ')
  
  for (let i = 0; i < classes.length; i++) {
    const clsName = classes[i];
    if ( !clsName ) continue
    if ( el.classList ) {
      el.classList.add(clsName)
    } else if ( !hasClass(el, clsName) ) {
      curClass += ' ' + clsName
    }
  }
  if ( !el.classList ) {
    el.className = curClass
  }
}

export const removeClass = (el: Element, cls: string) => {
  if ( !el ) return
  let curClass = el.className
  const classes = cls.split(' ')

  for (let i = 0; i < classes.length; i++) {
    const className = classes[i];
    if ( !className ) continue
    if ( el.classList ) {
      el.classList.remove(className)
    } else if( hasClass(el, className) ){
      curClass = curClass.replace(` ${className} `, ' ')
    }
  }

  if( !el.classList ) {
    el.className = trim(curClass)
  }
}
