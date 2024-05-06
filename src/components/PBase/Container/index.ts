/*
 * @Date: 2024-03-28 17:50:05
 * @LastEditors: phil_litian
 */
import { withInstall } from "@/utils";
import ScrollContainer from "./src/ScrollContainer.vue";
import CollapseContainer from './src/collapse/CollapseContainer.vue'
export * from './src/typing'

export const PScrollContainer = withInstall(ScrollContainer)
export const PCollapseContainer = withInstall(CollapseContainer)

