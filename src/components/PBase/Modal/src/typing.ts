/*
 * @Date: 2024-04-12 17:01:32
 * @LastEditors: phil_litian
 */

export interface ModalProps {
  open?: boolean
}

export interface ModalMethods {
  setModalProps: (props: Partial<ModalProps>) => void
}

export interface ReturnMethods {
  openModal: () => void
}

export interface UseModalReturnType {

}

