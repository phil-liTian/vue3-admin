/*
 * @Date: 2024-04-12 16:11:50
 * @LastEditors: phil_litian
 */

import { withInstall } from "@/utils";
import BasicModal from "./src/BasicModal.vue";
export { useModal, useModalInner } from './src/hooks/useModal'

export const PBasicModal = withInstall(BasicModal)
