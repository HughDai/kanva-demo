import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

export default window.vm = new Vue({
  store,
  render: h => h(App),
}).$mount('#app')

console.log(window.vm)
