import Vue from 'vue'
import CarteLyon from './components/CarteLyon'
import VueZoomer from 'vue-zoomer'

Vue.use(VueZoomer)
Vue.component('CarteLyon', CarteLyon)

new Vue({
    el: '#app',
})
