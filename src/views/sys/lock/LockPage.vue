<template>
  <div 
    :class="prefixCls"
    class="fixed w-screen h-screen bg-black">
    <div 
      v-show="showDate"
      @click="handleChangeDateShow(false)"
      :class="`${prefixCls}__unlock`"
      class="flex left-1/2 absolute top-0 pt-5 cursor-pointer">
      <LockOutlined />
      <span>{{ t('sys.lock.unlock') }}</span>
    </div>

    <!-- 输入密码 -->
    <div :class="`${prefixCls}-entry`" v-if="!showDate">
      <div :class="`${prefixCls}-entry-content`">
        <div :class="`${prefixCls}-entry__header`">
          <img :class="`${prefixCls}-entry__header-img`" :src="headerImg" alt="">
          <p :class="`${prefixCls}-entry__header-name`">{{ getUserInfo.username }}</p>
        </div>
        <InputPassword 
          v-model:value="password"/>

        <span :class="`${prefixCls}-entry__err-msg enter-x`" v-if="showErrorMsg">{{ t('sys.lock.alert') }}</span>

        <div :class="`${prefixCls}-entry__footer`">
          <PButton 
            :disabled="loading"
            @click="handleChangeDateShow(true)" 
            type="link">
            {{ t('common.back') }}
          </PButton>

          <PButton
            type="link"
            :disabled="loading"
            @click="goLogin">
            {{ t('sys.lock.backToLogin') }}
          </PButton>

          <!-- 可使用屏锁密码或账号密码进行解锁 -->
          <PButton
            type="link"
            :loading="loading"
            @click="unlock">
            {{ t('sys.lock.entry') }}
          </PButton>
        </div>
      </div>
    </div>

    <!-- 中间展示的时间 -->
    <div class="flex w-full h-full items-center justify-center">
      <div :class="`${prefixCls}__hour`" class="relative w-2/5 h-2/5 mr-5 md:h-4/5">
        <span>{{ hour }}</span>
        <span class="absolute left-5 top-5 meridiem text-md xl:text-xl">{{ meridiem }}</span>
      </div>
      <div :class="`${prefixCls}__minute`" class="w-2/5 h-2/5 md:h-4/5">
        <span>{{ minute }}</span>
      </div>
    </div>

    <!-- 底部时间 -->
    <div class="absolute bottom-5 w-full text-center">
      <div class="text-5xl mb-4" v-show="!showDate">
        {{ hour }}:{{ minute }} <span class="text-3xl">{{ meridiem }}</span>
      </div>

      <div class="text-2xl">{{ year }}/{{ month }}/{{ day }} {{ week }}</div>
    </div>
  </div>
</template>
  
<script lang='ts' setup>
  import { ref } from 'vue';
  import { Input } from 'ant-design-vue'
  import { LockOutlined } from '@ant-design/icons-vue'
  import { useDesign } from '@h/web/useDesign'
  import { useI18n } from '@h/web/useI18n'
  import { useUserStore } from '@s/modules/user'
  import { useNow } from './useNow'
  import headerImg from '@/assets/images/phil.png'
  import { useLockStore } from '@/store/modules/lock';
  const InputPassword = Input.Password
  const { prefixCls } = useDesign('lock-page')
  const { t } = useI18n()
  const { year, month, day, hour, minute, week, second, meridiem } = useNow(true)
  const { getUserInfo, layout } = useUserStore()
  const { resetLockInfo, unLock } = useLockStore()
  
  const showDate = ref(false)
  const password = ref('')
  const showErrorMsg = ref(false)
  const loading = ref(false)

  // 切换是否展示时间
  const handleChangeDateShow = (show) => {
    showDate.value = show
  }

  const goLogin = () => {
    layout(true)
    resetLockInfo()
  }

  // 解锁
  const unlock = () => {
    if ( !password.value ) return
    
    try {
      const flag = unLock(password.value)
      showErrorMsg.value = !flag
      loading.value = true
    } finally {
      loading.value = false
    }
  }
</script>
  
<style lang='less' scoped>
  @prefix-cls: ~'@{namespace}-lock-page';

  .@{prefix-cls} {
    z-index: @lock-page-z-index;
    color: #fff;

    &__unlock {
      transform: translateX(-50%);
    }

    &__hour,
    &__minute {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #141313;
      color: #bababa;
      font-weight: 700;
      border-radius: 30px;

      @media screen and (max-width: @screen-md) {
        span:not(.meridiem) {
          font-size: 160px;
        }
      }

      @media screen and (min-width: @screen-md) {
        span:not(.meridiem) {
          font-size: 160px;
        }
      }

      @media screen and (max-width: @screen-sm) {
        span:not(.meridiem) {
          font-size: 90px;
        }
      }

      @media screen and (min-width: @screen-xl) {
        span:not(.meridiem) {
          font-size: 260px;
        }
      }

      @media screen and (min-width: @screen-2xl) {
        span:not(.meridiem) {
          font-size: 320px;
        }
      }
    }

    &-entry {
      display: flex;
      position: absolute;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      background-color: rgb(0 0 0 / 50%);
      backdrop-filter: blur(8px); // 加模糊效果
      z-index: 999;

      &-content {
        width: 260px;
      }

      &__header {
        display: flex;
        align-items: center;
        flex-direction: column;
        &-img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          margin-bottom: 10px;
        }
      }

      &__err-msg {
        display: inline-block;
        margin-top: 4px;
        color: @error-color;
      }
    }
  }
</style>