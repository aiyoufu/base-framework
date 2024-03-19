import { defineStore } from 'pinia'

export const useStore = defineStore('storeId', {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      count: 0,
    }
  },
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  persist: true,
})
