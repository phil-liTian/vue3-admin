/*
 * @Date: 2024-04-01 09:39:52
 * @LastEditors: phil_litian
 */

import { ButtonProps } from "ant-design-vue"

export interface DrawerFooterProps {
  showFooter?: boolean,
  footerProps?: number,
  cancelText?: string,
  okText?: string,
  showOkBtn?: boolean,
  showCancelBtn?: boolean,
  okType?: string,
  cancelButtonProps: { props: ButtonProps, on: {} },
  okButtonProps: { props: ButtonProps, on: {} },
}

export interface DrawerProps extends DrawerFooterProps {
  open: boolean,
  loading?: boolean,
  title?: string
}

export type DrawerInstance = {
  setDrawerProps: (props: Partial<DrawerProps>) => void
}

export interface ReturnMethods extends DrawerInstance {
  openDrawer: (open?: boolean) => void
}

// 注册
export type registerFn = ( drawerInstance: DrawerInstance ) => void

export type UseDrawerReturnType = [ registerFn, ReturnMethods ]
