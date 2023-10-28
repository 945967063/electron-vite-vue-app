import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { mountRouter } from '@renderer/router'
import App from './App.vue'
const app = createApp(App)
mountRouter(app)
app.use(ElementPlus)
app.mount('#app')
