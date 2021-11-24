import Vue from 'vue'
import VueZoomer from 'vue-zoomer'
import CarteLyon from './components/CarteLyon'
import Calendrier from './components/Calendrier';
import Vuetify from 'vuetify'

Vue.use(VueZoomer)
Vue.use(Vuetify)
Vue.component('CarteLyon', CarteLyon)
Vue.component('Calendrier', Calendrier)

new Vue({
    el: '#app',
    vuetify: new Vuetify(),
})
