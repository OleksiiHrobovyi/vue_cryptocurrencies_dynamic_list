import Vue from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
const app = Vue(App);

app.use(PrimeVue);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
