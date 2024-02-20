import type { Component } from 'vue'

export const withInstall = <T extends Component>(component: T, alias?: string) => {
  (component as Record<string, unknown>).install = (app) => {
    console.log('component', component);
  }


  return component
}