import Vue from 'vue'
import VueZoomer from 'vue-zoomer'
import CarteLyon from './components/CarteLyon'
import Calendrier from './components/Calendrier';

Vue.use(VueZoomer)
Vue.component('CarteLyon', CarteLyon)
Vue.component('Calendrier', Calendrier)

new Vue({
    el: '#app',
})
