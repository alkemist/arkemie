import Vue from 'vue'
import HelloWorld1 from './components/HelloWorld1'
import HelloWorld2 from './components/HelloWorld2'

Vue.component('helloWorld1', HelloWorld1)
Vue.component('helloWorld2', HelloWorld2)

new Vue({
    el: '#app',
})