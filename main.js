import Vue from 'vue'
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'
import cuBar from './colorui/components/cu-bar.vue'
import cuCard from './colorui/components/cu-card.vue'

Vue.component('cu-custom', cuCustom)
Vue.component('cu-bar', cuBar)
Vue.component('cu-card', cuCard)
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
