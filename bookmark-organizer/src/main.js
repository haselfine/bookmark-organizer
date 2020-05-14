import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'

import BookAPIService from '@/services/BookService'


Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vuetify from './plugins/vuetify';

Vue.prototype.$book_api = BookAPIService

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
