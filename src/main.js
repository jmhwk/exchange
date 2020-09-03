import Vue from 'vue'
import App from './App.vue'
// import ElementUI from 'element-ui'
import {
  Button,
  Row,
  Col,
  Form,
  FormItem,
  Input,
  Checkbox,
  Message,
  Tabs,
  Icon,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  TabPane
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/commonality.css'
import './assets/css/reset.css'
import locale from 'element-ui/lib/locale/lang/en'
import i18n from './i18n'
import router from './router'
import store from './store'
// import Headnav from './components/Head/Headnav'
// 设置语言
Vue.use({ locale })
Vue.use(Button)
Vue.use(Checkbox)
Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Icon)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.prototype.$message = Message
Vue.config.productionTip = false
// 注册全局组件
// Vue.component('Headnav', Headnav)
// 将store保存为Vue的属性
Vue.store = store
new Vue({
  i18n, // 中英文切换
  router, // 配置路由器
  store, // 配置vuex的store
  render: h => h(App)
}).$mount('#app')
