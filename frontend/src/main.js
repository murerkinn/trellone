import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import './assets/style/main.scss'

import AuthLayout from './layouts/AuthLayout'
import PanelLayout from './layouts/PanelLayout'
import DashboardLayout from './layouts/DashboardLayout'
import DefaultLayout from './layouts/DefaultLayout'

Vue.component('auth-layout', AuthLayout)
Vue.component('panel-layout', PanelLayout)
Vue.component('dashboard-layout', DashboardLayout)
Vue.component('default-layout', DefaultLayout)

Vue.use(Antd)

Vue.config.productionTip = false

async function main() {
  let storeInstance = await store()

  new Vue({
    router: router(storeInstance),
    store: storeInstance,
    render: h => h(App)
  }).$mount('#app')
}

main()
