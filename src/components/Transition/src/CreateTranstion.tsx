import { getSlot } from "@/utils/helper/tsxHelper"
import { propTypes } from "@/utils/propTypes"
import { PropType, defineComponent, Transition, TransitionGroup } from "vue"

/*
 * @Date: 2024-04-25 10:28:52
 * @LastEditors: phil_litian
 */
type Mode = 'in-out' | 'out-in' | 'default' | undefined

export function createSimpleTransition(name: string, origin = 'top center 0', mode?: Mode) {
  return defineComponent({
    props: {
      group: propTypes.bool.def(false),
      mode: {
        type: String as PropType<Mode>,
        default: mode
      },
      origin: {
        type: String as PropType<string>,
        default: origin
      }
    },
    setup(props, { slots }) {
      const Tag = props.group ? TransitionGroup : Transition
      const onBeforeEnter = (el: HTMLElement) => {
        el.style.transformOrigin = origin
      }
      return () => <Tag mode={props.mode} name={name} onBeforeEnter={onBeforeEnter} >
        { getSlot(slots, 'default') }
      </Tag>
    }
  })
}

export function createJSTransition(name: string, functions: Recordable, mode: Mode = 'out-in') {
  return defineComponent({
    props: {
      mode: {
        type: String as PropType<Mode>,
        default: mode
      },
    },
    setup(props, { slots }) {
      return () => (
        <Transition 
          name={name} 
          mode={props.mode}
          onBeforeEnter={functions.beforeEnter}
          onEnter={functions.enter}
          onLeave={functions.leave}
          onAfterLeave={functions.afterLeave}
          onLeaveCancelled={functions.afterLeave}>
          { getSlot(slots, 'default') }
        </Transition>
      )
    }
  })
}

