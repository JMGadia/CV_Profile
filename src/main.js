import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 1. Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// 2. Import Bootstrap JS (Optional: only if using dropdowns, modals, etc.)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const app = createApp(App)
app.use(router)
app.mount('#app')