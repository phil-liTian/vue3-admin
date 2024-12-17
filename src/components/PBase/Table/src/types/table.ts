/*
 * @Date: 2024-05-07 09:33:15
 * @LastEditors: phil
 */

import { ColumnProps } from 'ant-design-vue/es/table';
import { FixedType } from 'ant-design-vue/es/vc-table/interface';
import type { PaginationProps } from './pagination';
import { INDEX_COLUMN_FLAG } from '../const';
import { Key, TableRowSelection } from 'ant-design-vue/es/table/interface';
import { VNodeChild } from 'vue';
import { ComponentType } from './componentType';

export interface TableSetting {
	redo?: boolean;
	size?: boolean;
	setting?: boolean;
	fullScreen?: boolean;
	settingCache?: boolean;
}
export type SizeType = 'small' | 'default' | 'middle' | 'large';

export interface BasicTableProps<T = any> {
	loading: boolean;
	showTableSetting: boolean;
	title: string | ((data: Recordable) => string);
	titleHelpMessage: string | string[];
	isTreeTable: boolean;
	accordion: boolean;
	striped: boolean;
	size: SizeType;
	columns: BasicColumn[];
	dataSource: Recordable[];
	showIndexColumn?: boolean;
	showSummary?: boolean;
	// 计算合计行的方法
	summaryFunc?: (...args: any) => Recordable[];
	summartData?: Recordable[];
	rowKey: string;
	childrenColumnName: string;
	rowSelection: TableRowSelection;
	pagination: PaginationProps | boolean;
	api?: (...arg: any) => Promise<any>;
	actionColumn?: BasicColumn;
	bordered: boolean;
}

type IFlagType = 'INDEX' | 'DEFAULT' | 'ACTION';

export interface BasicColumn extends ColumnProps {
	children?: BasicColumn[];
	title: string;
	width?: number;
	flag?: IFlagType;
	dataIndex: string | number;

	helpMessage?: string | string[] | JSX.Element | VNodeChild;

	customHeaderRender?: (
		column: BasicColumn
	) => string | JSX.Element | VNodeChild;

	edit?: boolean;

	// 当前状态是否可编辑
	editable?: boolean;

	// 编辑规则校验
	editRule?: (text: string) => Promise<string>;

	// 当前组件名称
	editComponent?: ComponentType;

	// 组件的props
	editComponentProps?: Recordable;
}

// 用于传递给子组件的行为
export interface TableActionType {
	getSize: () => SizeType;
	setProps: (props: Partial<BasicTableProps>) => void;
	getColumns: () => BasicColumn[];
	setColumns: (columns: BasicColumn[]) => void;
	setTableData: (dataList: Recordable[]) => void;
	getDataSource: () => Recordable[];
	getRawDataSource: <T = Recordable>() => T;
	collapseAll: () => void;
	expandAll: () => void;
	collapseRows: (keyValues: Key[]) => void;
	expandRows: (keyValues: Key[]) => void;
	rowSelection?: TableRowSelection;
	getSelectRowKeys?: () => Key[];
	getSelectRows?: () => Recordable[];
	setSelectedRowKeys?: (data: Key[]) => void;
	clearSelectedRowKeys?: () => void;
	setLoading?: (loading: Boolean) => void;
	setPagination?: (info: Partial<PaginationProps>) => void;
	getPaginationRef?: () => PaginationProps | boolean;
	reload: (opt?: FetchParams) => void;
	emits?: EmitType;
}

export interface ColumnOptionsType {
	value: string | number;
	label: string;
	fixed?: FixedType;
	column: {
		defaultHidden?: boolean;
	};
}

export interface InnerMethods {
	getSelectRowKeys: TableActionType['getSelectRowKeys'];
}

export interface FetchParams {
	searchInfo?: Recordable;
	filterInfo?: Recordable;
	sortInfo?: Recordable;
	page?: number;
}
