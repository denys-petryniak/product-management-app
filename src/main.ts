import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin } from '@formkit/vue'
import config from '../formkit.config'

import App from './App.vue'
import router from './router'

import './assets/index.css'
import 'iconify-icon'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(plugin, config)

app.mount('#app')
