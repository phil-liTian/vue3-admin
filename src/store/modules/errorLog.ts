import { defineStore } from 'pinia'
import { store } from '@s/index'
import { ErrorLogInfo } from '#/store'

interface ErrorLogState {
  errorLogInfoList: Nullable<ErrorLogInfo[]>,
  errorLogListCount: number
}

export const useErrorLogStore = defineStore({
  id: 'app-error-log',
  state: (): ErrorLogState => ({
    errorLogInfoList: null,
    errorLogListCount: 0
  }),


  getters: {
    getErrorLogInfoList(): ErrorLogInfo[] {
      return this.errorLogInfoList || []
    },
    getErrorLogListCount(): number {
      return this.errorLogListCount
    }
  },

  actions: {
    setErrorLogInfoList(info: ErrorLogInfo[]) {
      const item = {
        ...info,
      }
      this.errorLogInfoList = [item, ...(this.errorLogInfoList || [])]
      this.errorLogListCount++
    },
    setErrorLogListCount(count: number) {
      this.errorLogListCount = count
    }
  }
})

export function useErrorLogStoreWithOut() {
  return useErrorLogStore(store)
}
