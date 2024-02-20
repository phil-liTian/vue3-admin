import { createPinia } from 'pinia'

const store = createPinia()

export const setupStore = (app) => {
  console.log('store', store);
  
  app.use(store)
}

// export { store }