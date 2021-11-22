import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './styles/index.scss'
import vClickOutside from 'click-outside-vue3'

createApp(App).use(vClickOutside).use(store).use(router).mount('#app')
