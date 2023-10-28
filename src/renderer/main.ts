import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { mountRouter } from '@renderer/router'
import { createPinia } from 'pinia'
import App from './App.vue'
const pinia = createPinia()
const app = createApp(App)
mountRouter(app)
app.use(ElementPlus)
app.use(pinia)
app.mount('#app')
