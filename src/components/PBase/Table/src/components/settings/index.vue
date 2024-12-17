<!--
 * @Date: 2024-05-07 11:24:49
 * @LastEditors: phil_litian
-->
<template>
	<div class="table-setting">
		<RedoSetting
			v-if="getSetting.redo"
			:getPopupContainer="getTableContainer"
		/>
		<SizeSetting
			v-if="getSetting.size"
			:getPopupContainer="getTableContainer"
		/>
		<ColumnSetting v-if="getSetting.setting" />
		<FullScreenSetting
			v-if="getSetting.fullScreen"
			:getPopupContainer="getTableContainer"
		/>
	</div>
</template>

<script lang="ts" setup>
import { computed, PropType, unref } from 'vue';
import SizeSetting from './SizeSetting.vue';
import RedoSetting from './RedoSetting.vue';
import ColumnSetting from './ColumnSetting.vue';
import FullScreenSetting from './FullScreenSetting.vue';
import { TableSetting } from '../../types/table';
import { useTableContext } from '../../hooks/useTableContext';
const props = defineProps({
	setting: {
		type: Object as PropType<TableSetting>,
		default: () => ({}),
	},
});
const table = useTableContext();

const getSetting = computed((): TableSetting => {
	return {
		redo: true,
		size: true,
		setting: true,
		settingCache: false,
		fullScreen: false,
		...props.setting,
	};
});

const getTableContainer = () => {
	return table ? unref(table.wrapRef) : document.body;
};
</script>

<style lang="less">
.table-setting {
	> * {
		margin-right: 12px;
	}

	svg {
		width: 1.3em;
		height: 1.3em;
	}
}
</style>
