/*
 * @Date: 2024-05-08 14:45:30
 * @LastEditors: phil_litian
 */

/**
 * 用作列设置(拖拽排序)
 */
import {
	ComputedRef,
	computed,
	unref,
	ref,
	Ref,
	toRaw,
	reactive,
	watch,
} from 'vue';
import { cloneDeep } from 'lodash-es';
import { useI18n } from '@h/web/useI18n';
import { BasicColumn, BasicTableProps } from '../types/table';
import { INDEX_COLUMN_FLAG, ACTION_COLUMN_FLAG } from '../const';
import { renderEditCell } from '../components/editable/index';
import { isArray } from '@/utils/is';

// 处理column中每行数据
const handleItem = (item) => {
	const { key, dataIndex } = item;
	if (!key) {
		item.key = dataIndex;
	}
};

// 处理序号列: 如果存在序号列并且showIndexColumn为false则移除序号列；如果不存在序号列且showIndexColumn为true则添加序号列。其它情况不予处理
const handleIndexColumn = (
	propsRef: ComputedRef<BasicTableProps>,
	columns: BasicColumn[]
) => {
	const { t } = useI18n();
	const { showIndexColumn, isTreeTable } = unref(propsRef);
	if (unref(isTreeTable)) return;

	const indIndex = columns.findIndex((v) => v.flag === INDEX_COLUMN_FLAG);
	if (indIndex !== -1 && !showIndexColumn) {
		columns.splice(indIndex, 1);
	}

	if (indIndex === -1 && showIndexColumn) {
		columns.unshift({
			width: 60,
			title: t('component.table.index'),
			align: 'center',
			dataIndex: 'index',
			flag: INDEX_COLUMN_FLAG,
			customRender: ({ index }) => {
				return index + 1;
			},
		});
	}
};

// 处理操作列
const handleActionColumn = (
	propsRef: ComputedRef<BasicTableProps>,
	columns: BasicColumn[]
) => {
	const { actionColumn } = unref(propsRef);
	if (!actionColumn) return;
	const hasAction = columns.findIndex(
		(column) => column.flag === ACTION_COLUMN_FLAG
	);
	// columns里面本身没有action
	if (hasAction === -1) {
		columns.push({
			fixed: 'right',
			...actionColumn,
			flag: ACTION_COLUMN_FLAG,
		});
	}
};

export function useColumns(propsRef: ComputedRef<BasicTableProps>) {
	const columnsRef = ref(unref(propsRef).columns) as unknown as Ref<
		BasicColumn[]
	>;

	const getColumnsRef = computed(() => {
		const columns = cloneDeep(unref(columnsRef));
		if (!columns) return [];
		handleIndexColumn(propsRef, columns);
		handleActionColumn(propsRef, columns);
		columns.forEach((item) => {
			handleItem(item);
		});
		return columns;
	});

	const sortFixedColumn = (columns: BasicColumn[]) => {
		let defaultColumns = columns;

		const filterFunc = (item) => !item.defaultHidden;
		// 显示列
		const viewColumns = [...defaultColumns].filter(filterFunc);

		return viewColumns;
	};

	// 表格中展示的columns
	const getViewColumns = computed(() => {
		const viewColumns = sortFixedColumn(unref(getColumnsRef));
		const mapFn = (column: BasicColumn) => {
			const { edit } = column;
			if (edit) {
				column.customRender = renderEditCell(column);
			}
			return column;
		};

		const columns = cloneDeep(viewColumns);

		return columns.map((column) => {
			if (column.children?.length) {
				column.children = column.children.map(mapFn);
			}

			return mapFn(column);
		});
	});

	function getColumns() {
		const columns = toRaw(unref(getColumnsRef));

		return columns;
	}

	// 设置列
	function setColumns(columnList) {
		const columns = cloneDeep(columnList);
		if (!isArray(columns)) return;

		columnsRef.value = columnList;
	}

	// 动态改变table的props中传进来的columns 例如使用useTable动态设置columns时 需要监听columns的变化
	watch(
		() => propsRef.value.columns,
		(columns) => {
			columnsRef.value = columns;
		}
	);

	return {
		getColumnsRef,
		getColumns,
		getViewColumns,
		setColumns,
	};
}
