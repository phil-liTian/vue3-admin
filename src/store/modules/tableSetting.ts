/*
 * @Date: 2024-05-08 10:20:21
 * @LastEditors: phil_litian
 */
import { defineStore } from "pinia";
import { TableSetting } from '#/store'
import { SizeType } from "@/components/PBase/Table";
import { Persistent } from "@/utils/cache/Persistent";
import { TABLE_SETTING_KEY } from "@/enums/cacheEnum";

interface TableSettingState {
  setting: Nullable<Partial<TableSetting>>
}

export const useTableSettingStore = defineStore({
  id: 'table-setting',

  state: (): TableSettingState => {
    return {
      setting: Persistent.getLocal(TABLE_SETTING_KEY)
    }
  },

  getters: {
    
  },

  actions: {
    setTableSetting(setting: Partial<TableSetting>) {
      this.setting = Object.assign({}, this.setting, setting)
      Persistent.setLocal(TABLE_SETTING_KEY, this.setting, true)
    },

    setTableSize(size: SizeType) {
      this.setTableSetting(Object.assign({}, this.setting, { size }))
    }
  }
})