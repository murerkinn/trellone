import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import './assets/style/main.scss'

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
