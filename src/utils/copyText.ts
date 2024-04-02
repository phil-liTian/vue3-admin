/*
 * @Date: 2024-04-01 21:24:42
 * @LastEditors: phil_litian
 */
import { message } from 'ant-design-vue'
// 拷贝text中的内容
// navigator.clipboard存在兼容性问题
export function copyText(text: string, prompt: string | null = '已成功复制到剪切板') {
  if ( navigator.clipboard ) {
    return navigator.clipboard.writeText(text).then(() => {
      prompt && message.success(prompt)
    }).catch(err => {
      message.error(`复制失败${err}`)
      return err
    })
  }

  if ( Reflect.has(document, 'execCommand') ) {
    return new Promise((resolve, reject) => {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.width = '0px'
        textArea.style.position = 'fixed'
        textArea.style.left = '-999px'
        textArea.style.top = '-20px'

        textArea.setAttribute('readonly', 'readonly');
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        prompt && message.success(prompt)
        resolve(text)
      } catch(err) {
        message.error(`复制失败${err.message}`)
        reject(err)
      }
    })
  }

  return Promise.reject(`navigator.clipboard 或 document.execCommand 中存在API错误，拷贝失败`)
}

