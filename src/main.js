import { createApp } from 'vue'

import vuetify from './plugins/vuetify';
import App from './App.vue'
import router from './router';
import store from './store'

import './style.scss';

const app = createApp(App)
app.use(router)

app.mount('#app')
app.use(vuetify)
app.use(store)