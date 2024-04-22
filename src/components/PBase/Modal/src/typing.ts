/*
 * @Date: 2024-04-12 17:01:32
 * @LastEditors: phil_litian
 */

export interface ModalProps {
  open?: boolean,
  wrapClassName?: string,
  draggable?: boolean,
  destroyOnClose?: boolean,

  // 是否可以全屏
  canFullScreen?: boolean,
  // 打开modal默认滚动到顶部
  scrollTop?: boolean
}

export interface ModalMethods {
  setModalProps: (props: Partial<ModalProps>) => void
}

export interface ReturnMethods {
  openModal: () => void,
  closeModal?: () => void,
  setModalProps?: (props: Partial<ModalProps>) => void
}

export interface UseModalReturnType {

}

