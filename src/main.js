import { createApp } from 'vue'
import './style.css'
import store from './store'
import App from './App.vue'

const app = createApp(App)
app.use(store);
// app.use(router)

app.mount('#app')

// createApp(App).mount('#app')
