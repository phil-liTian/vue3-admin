import type { RouteRecordRaw, RouteMeta } from 'vue-router'

export type Component<T = any> = () => Promise<T>

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string,
  component?: Component,
  meta: RouteMeta,
  children?: AppRouteRecordRaw[]
}