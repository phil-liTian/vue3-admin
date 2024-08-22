import { number } from "vue-types";

export const toolbarList = [
  {
    title: 'btn_reset',
    preIcon: 'ant-design:reload-outlined',
    type: 'reset'
  },
  {
    title: 'btn_rotate_left',
    preIcon: 'ant-design:rotate-left-outlined',
    type: 'rotate',
    number: 45
  },
  {
    title: 'btn_rotate_right',
    preIcon: 'ant-design:rotate-right-outlined',
    type: 'rotate',
    number: -45
  },
  {
    title: 'btn_scale_x',
    preIcon: 'vaadin:arrows-long-h',
    type: 'scaleX'
  },
  {
    title: 'btn_scale_y',
    preIcon: 'vaadin:arrows-long-v',
    type: 'scaleY'
  },
  {
    title: 'btn_zoom_in',
    preIcon: 'ant-design:zoom-in-outlined',
    type: 'zoom',
    number: 0.1
  },
  {
    title: 'btn_zoom_out',
    preIcon: 'ant-design:zoom-out-outlined',
    type: 'zoom',
    number: -0.1
  }
]