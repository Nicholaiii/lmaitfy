import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import './assets/main.css'

const app = createApp(App).use(autoAnimatePlugin)

app.use(router)

app.mount('#app')
