/*
 * @Date: 2024-05-06 11:20:13
 * @LastEditors: phil_litian
 */

export interface DragVerifyActionType {
  resume: () => void
}

export interface PassingData {
  isPassing: boolean,
  time: number
}

export interface MoveData {
  event: MouseEvent,
  moveDistance: number,
  moveX: number
}
