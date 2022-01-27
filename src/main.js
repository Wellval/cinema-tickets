import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './styles/index.scss'
import vClickOutside from 'click-outside-vue3'
import '@stripe/stripe-js'
import VueSocketIO from 'vue-3-socket.io'
import io from 'socket.io-client';

createApp(App).use(new VueSocketIO({
    debug: true,
    connection: io('http://localhost:5500'),
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
})).use(vClickOutside).use(store).use(router).mount('#app')
