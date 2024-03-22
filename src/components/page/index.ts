/*
 * @Date: 2024-03-20 21:46:10
 * @LastEditors: phil_litian
 */

import pageWrapper from "./src/pageWrapper.vue";
import pageFooter from './src/pageFooter.vue'
import { withInstall } from '@u/index'

export const PageWrapper = withInstall(pageWrapper)
export const PageFooter = withInstall(pageFooter)
