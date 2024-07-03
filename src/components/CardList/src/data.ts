/*
 * @Date: 2024-06-12 10:05:37
 * @LastEditors: phil_litian
 */

export const useSlider = (min = 6, max = 12) => {
  const getMarks = () => {
    let l = {}
    for (let i = min; i < max + 1; i++) {
      l[i] = {
        label: i,
        style: { color: '#fff' }
      }
    }
    return l
  }
  

  return {
    min,
    max,
    marks: getMarks(),
    step: 1
  }
}