/*
 * @Date: 2024-02-21 09:24:37
 * @LastEditors: phil_litian
 */
import type { Component, App } from 'vue'


type customComponent = Component & { displayName?: string }


export const withInstall = <T extends customComponent>(component: T, alias?: string) => {
  
  (component as Record<string, unknown>).install = (app: App) => {
    console.log('component ===> ', component.name || component.displayName);
    const componentName = component.name || component.displayName
    if ( !componentName ) return
    app.component(componentName, component)
    if( alias ) {
      // app.component(alias, )
      app.config.globalProperties[alias] = component
    }
  }

  return component
}