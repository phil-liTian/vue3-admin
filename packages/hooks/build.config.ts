/*
 * @Date: 2024-02-28 18:09:46
 * @LastEditors: phil_litian
 */
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  clean: true,
  entries: ['src/index'],
  declaration: true,
  rollup: {
    emitCJS: true,
  },
})
