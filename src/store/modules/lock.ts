/*
 * @Date: 2024-04-15 16:37:30
 * @LastEditors: phil_litian
 */
import { defineStore } from "pinia";
import { LOCK_INFO_KEY } from '@e/cacheEnum'
import { useUserStore } from '@s/modules/user'
import { LockInfo } from '#/config'
import { Persistent } from '@u/cache/Persistent'

interface LockState {
  lockInfo: Nullable<LockInfo>
}

export const useLockStore = defineStore({
  id: 'app-lock',
  state: (): LockState => {
    return {
      lockInfo: Persistent.getLocal(LOCK_INFO_KEY)
    }
  },
  getters: {
    getLockInfo(state): Nullable<LockInfo> {
      return state.lockInfo
    }
  },
  actions: {
    setLockInfo(info: LockInfo) {
      this.lockInfo = Object.assign({}, this.localInfo, info )
      console.log('this.lockInfo', this.lockInfo);
      
      Persistent.setLocal(LOCK_INFO_KEY, this.lockInfo, true)
    },

    resetLockInfo() {
      Persistent.removeLocal(LOCK_INFO_KEY)
      this.lockInfo = null
    },

    async unLock(password?: string) {
      if( this.localInfo?.password === password ) {
        // 重置锁屏信息
        this.resetLockInfo()
        return true
      }

      try {// 由于密码一般都是经过加密处理过的 此处重新调用登录接口
        const { getUserInfo, login } = useUserStore()
        const { username } = getUserInfo

        const res = await login({
          username,
          password
        })
        if ( res ) {
          this.resetLockInfo()
        }
        return res
      } catch (err) {
        return false
      }
    }
  }
})