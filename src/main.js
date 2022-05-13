import Vue from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import router from "@/router";

// primevue css
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

Vue.use(PrimeVue)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
