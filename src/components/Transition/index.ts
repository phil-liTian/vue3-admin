/*
 * @Date: 2024-03-24 19:57:27
 * @LastEditors: phil_litian
 */
import { createSimpleTransition, createJSTransition } from './src/CreateTranstion'
import expandTransitionGenerator from './src/ExpandTransition'
export { default as CollapseTransition } from "./src/CollapseTransition.vue";

export const FadeTransition = createSimpleTransition('fade-transition')
export const SlideYTransition = createSimpleTransition('slide-y-transition')
export const SlideYReverseTransition = createSimpleTransition('slide-y-reverse-transition')
export const SlideXTransition = createSimpleTransition('slide-x-transition')
export const SlideXReverseTransition = createSimpleTransition('slide-x-reverse-transition')
export const ScrollYTransition = createSimpleTransition('scroll-y-transition')
export const ScrollYReverseTransition = createSimpleTransition('scroll-y-reverse-transition')
export const ScrollXTransition = createSimpleTransition('scroll-x-transition')
export const ScrollXReverseTransition = createSimpleTransition('scroll-x-reverse-transition')
export const ScaleTransition = createSimpleTransition('scale-transition')
export const ScaleRotateTransition = createSimpleTransition('scale-rotate-transition')


export const ExpandXTransition = createJSTransition('expand-x-transition', expandTransitionGenerator('', true))

export const ExpandTransition = createJSTransition('expand-transition', expandTransitionGenerator(''))
