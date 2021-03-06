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
  TabPane,
  Menu,
  MenuItem,
  Switch,
  Table,
  TableColumn,
  Pagination,
  Select,
  Option,
  RadioButton,
  RadioGroup,
  Tooltip,
  Dialog,
  Upload,
  popover,
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/commonality.css'
import './assets/css/reset.css'
import locale from 'element-ui/lib/locale/lang/en'
import i18n from './i18n'
import router from './router'
import store from './store'

//复制到粘贴板插件
// import VueClipboard from 'vue-clipboard2'
// VueClipboard.config.autoSetContainer = true
// Vue.use(VueClipboard)

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
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Switch)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Select)
Vue.use(Option)
Vue.use(RadioButton)
Vue.use(RadioGroup)
Vue.use(Tooltip);
Vue.use(Dialog);
Vue.use(Upload);
Vue.use(popover);
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
