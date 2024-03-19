import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // 导入插件
import './style.css'
import App from './App.vue'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) // 在创建 Pinia 实例后使用插件

const app = createApp(App)
app.use(pinia)
app.mount('#app')
