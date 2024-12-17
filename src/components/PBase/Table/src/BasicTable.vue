<!--
 * @Date: 2024-04-29 15:30:29
 * @LastEditors: phil
-->
<template>
	<div ref="wrapRef" :class="getWrapperClass">
		<Table
			v-bind="getBindValues"
			:rowClassName="getRowClassName"
			ref="tableElRef"
			@change="handleTableChange"
			@expand="handleTableExpand"
		>
			<template #headerCell="{ column }">
				<TableHeaderCell :column="column" />
			</template>

			<template #bodyCell="data">
				<slot name="bodyCell" v-bind="data || {}"></slot>
			</template>

			<template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
				<slot :name="item" v-bind="data || {}"></slot>
			</template>
		</Table>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref, toRaw, unref, useAttrs, useSlots } from 'vue';
import { Table } from 'ant-design-vue';
import { useDesign } from '@h/web/useDesign';
import { basicProps } from './props';
import TableHeaderCell from './components/TableHeaderCell.vue';
import { useLoading } from './hooks/useLoading';
import { useTableHeader } from './hooks/useTableHeader';
import { useTableFooter } from './hooks/useTableFooter';
import { useTableStyle } from './hooks/useTableStyle';
import { useDataSource } from './hooks/useDataSource';
import { useColumns } from './hooks/useColumns';
import { useTableExpand } from './hooks/useTableExpand';
import { useRowSelection } from './hooks/useRowSelection';
import { usePagination } from './hooks/usePagination.tsx';
import { useTableScroll } from './hooks/useTableScroll';
import { createTableContext } from './hooks/useTableContext';
import {
	TableActionType,
	SizeType,
	BasicTableProps,
	InnerMethods,
} from './types/table';
defineOptions({ name: 'PBasicTable' });
const emits = defineEmits([
	'change',
	'register',
	'fetch-success',
	'fetch-error',
	'expanded-rows-change',
	'edit-end',
]);
const props = defineProps(basicProps);
const { prefixCls } = useDesign('basic-table');
const wrapRef = ref(null);
const tableElRef = ref(null);
const tableData = ref([]);
const innerPropsRef = ref<Partial<BasicTableProps>>(null);
const attrs = useAttrs();
const slots = useSlots();
const getWrapperClass = computed(() => {
	return [prefixCls, attrs.class];
});

const getProps = computed(() => {
	return { ...props, ...unref(innerPropsRef) } as BasicTableProps;
});
const {
	getSelectRowKeys,
	getSelectRows,
	getRowSelectionRef,
	setSelectedRowKeys,
	clearSelectedRowKeys,
} = useRowSelection(getProps, tableData);

const methods: InnerMethods = {
	getSelectRowKeys,
};
const { getLoading, setLoading } = useLoading(getProps);
// 处理header内容 包括标题、toolBar工具域
const { getHeaderProps } = useTableHeader(slots, getProps, methods);
// 处理footer内容 包括统计
const { getFooterProps } = useTableFooter(getProps);
// 处理table样式
const { getRowClassName } = useTableStyle(getProps, prefixCls);
// 处理columns
const { getColumns, setColumns, getViewColumns } = useColumns(getProps);
const { getPaginationInfo, setPagination, getPagination } =
	usePagination(getProps);
// 处理dataSource
const {
	reload,
	handleTableChange,
	setTableData,
	getDataSource,
	getRawDataSource,
	getDataSourceRef,
} = useDataSource(
	getProps,
	{
		tableData,
		setPagination,
		getPaginationInfo,
		setLoading,
	},
	emits
);
const { getScrollRef } = useTableScroll(getProps, { wrapRef, tableElRef });

// 处理table展开、收起
const {
	getExpandOptions,
	handleTableExpand,
	collapseAll,
	expandAll,
	collapseRows,
	expandRows,
} = useTableExpand(getProps, tableData, emits);

const getBindValues = computed(() => {
	let propsData = {
		...attrs,
		...unref(getProps),
		...unref(getHeaderProps),
		loading: unref(getLoading),
		scroll: unref(getScrollRef),
		rowSelection: unref(getRowSelectionRef),
		columns: toRaw(unref(getViewColumns)),
		dataSource: unref(getDataSourceRef),
		footer: unref(getFooterProps),
		pagination: unref(getPaginationInfo),
		...unref(getExpandOptions),
	};
	return propsData;
});

function setProps(props: Partial<BasicTableProps>) {
	innerPropsRef.value = { ...unref(innerPropsRef), ...props };
}

const tableAction: TableActionType = {
	// 获取table的尺寸
	getSize: () => unref(getBindValues).size as SizeType,
	setProps,
	getColumns,
	setColumns,
	getDataSource,
	setTableData,
	getRawDataSource,
	collapseAll,
	expandAll,
	collapseRows,
	expandRows,
	setLoading,
	setPagination,
	getPaginationRef: getPagination,
	reload,
	getSelectRowKeys,
	getSelectRows,
	setSelectedRowKeys,
	clearSelectedRowKeys,
	emits,
};
emits('register', tableAction);
// 创建一个上下文
createTableContext({ ...tableAction, wrapRef, getBindValues });

// 向外暴露出相应的方法, 然后才能在使用当前组件的地方 通过ref调用当前组件的方法
defineExpose({ ...tableAction });
</script>

<style lang="less">
@prefix-cls: ~'@{namespace}-basic-table';

.@{prefix-cls} {
	min-width: 100%;
	height: 100%;

	&-row__striped {
		td {
			background-color: @app-content-background;
		}
	}

	.ant-table-wrapper {
		padding: 6px;
		background-color: @component-background;
	}
}
</style>
