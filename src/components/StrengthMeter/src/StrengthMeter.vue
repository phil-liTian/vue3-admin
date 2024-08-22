<template>
  <div :class="[prefixCls, 'relative']">
    <Input.Password
      v-if="showInput"
      v-bind="$attrs"
      :value="innerValueRef"
      @change="handleChange"
      allow-clear
      :disabled="disabled">
      <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data"></slot>
      </template>
    </Input.Password>
    <div :class="`${prefixCls}-bar`">
      <div :data-score="getPasswordStrength" :class="`${prefixCls}-bar--fill`"></div>
    </div>
  </div>
</template>
  
<script lang='ts' setup>
  import { computed, ref, watch } from 'vue';
  import { Input } from 'ant-design-vue'
  import { zxcvbn } from '@zxcvbn-ts/core'
  import { useDesign } from '@h/web/useDesign'
  import { propTypes } from '@/utils/propTypes';
  defineOptions({ name: 'StrengthMeter' })
  const props = defineProps({
    disabled: propTypes.bool.def(false),
    value: propTypes.string.def(''),
    showInput: propTypes.bool.def(true)
  })
  const emits = defineEmits(['change', 'score-change'])
  const { prefixCls } = useDesign('strength-meter')
  const innerValueRef = ref('')
  
  const handleChange = e => {
    innerValueRef.value = e.target.value
    emits('change', e.target.value)
  }

  const getPasswordStrength = computed(() => {
    const { disabled } = props
    console.log('disabled', disabled);
    
    if ( disabled ) return -1
    const result = zxcvbn(innerValueRef.value)
    const score = innerValueRef.value ? result.score : -1 
    console.log('score', score);
    
    emits('score-change', score)
    return score
  })

  watch(() => props.value, val => {
    console.log('val-->', val);
    
    innerValueRef.value = val || ''
  }, { immediate: true })

</script>
  
<style lang='less' scoped>
  @prefixCls: ~'@{namespace}-strength-meter';

  .@{prefixCls} {
    &-bar {
      position: relative;
      height: 6px;
      margin: 10px auto 6px;
      border-radius: 6px;
      background-color: @disabled-color;

      &::before,
      &::after { 
        content: '';
        display: inline-block;
        position: absolute;
        z-index: 10;
        width: 20%;
        height: inherit;
        background-color: transparent;
        border-width: 0 5px;
        border-style: solid;
        border-color: @white;
      }

      &::before {
        left: 20%;
      }

      &::after {
        right: 20%;
      }

      &--fill {
        position: absolute;
        width: 0;
        height: inherit;
        background-color: transparent;
        transition: width 0.5s ease-in-out, background 0.2s;
        border-radius: inherit;

        &[data-score='0'] {
          width: 20%;
          background-color: darken(@error-color, 10%);
        }

        &[data-score='1'] {
          width: 40%;
          background-color: @error-color;
        }

        &[data-score='2'] {
          width: 60%;
          background-color: @warning-color;
        }

        &[data-score='3'] {
          width: 80%;
          background-color: fade(@success-color, 50%);
        }

        &[data-score='4'] {
          width: 100%;
          background-color: @success-color;
        }
      }
    }
  }
</style>