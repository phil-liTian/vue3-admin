/*
 * @Date: 2024-04-18 19:21:09
 * @LastEditors: phil_litian
 */
import { computed, defineComponent } from "vue";
import { BAR_MAP, renderThumbStyle } from "./utils";
import { propTypes } from "@/utils/propTypes";


export default defineComponent({
  name: 'Bar',
  props: {
    vertical: Boolean,
    size: propTypes.string.def('10px'),
    move: Number
  },

  setup(props) {
    const bar = computed(() => {
      return BAR_MAP[props.vertical ? 'vertical' : 'horizontal']
    })

    return () => {
      return (
        <div class={ `scrollbar__bar is-${bar.value.key}` }>
          <div 
            class='scrollbar__thumb' 
            style={ renderThumbStyle({ 
              size: props.size, 
              move: props.move, 
              bar: bar.value }) }>
          </div>
        </div>
      )
    }
  }
})
