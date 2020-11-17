import Index from '../views/home/index' // 首页
// 页脚
import Legislation from '../views/agreementFooter/legislation.vue'
import Privacy from '../views/agreementFooter/privacy.vue'
import Pneumatic from '../views/agreementFooter/pneumatic.vue'
import Safety from '../views/agreementFooter/safety.vue'
import Security from '../views/agreementFooter/security.vue'  // 安全性
import Announcement from '../views/agreementFooter/announcement.vue' // 公告
import User from '../views/agreementFooter/user.vue'
// 登录注册邀请
import Log from '../views/log/log'
import Regist from '../views/log/regist.vue'
import Password from '../views/log/password.vue'
import Solutions from '../views/log/solutions.vue'
import Contactus from '../views/log/contactus.vue'
 
 // 币币交易
 import Currency from '../views/currencyTrading/currencyTrading'
// 合约交易
import Products from '../views/products/products'
// 资产管理
import AssetManagement from '../views/assetManagement'
import AssetDetails from '../views/assetManagement/assetDetails' // 资产明细
import RechargeCurrency from '../views/assetManagement/assetDetails/rechargeCurrency'
import Withdrawal from '../views/assetManagement/assetDetails/withdrawal'
import EntrustOrder from '../views/assetManagement/entrustOrder'
import PositionOrder from '../views/assetManagement/positionOrder' 
import HoldOrder from '../views/assetManagement/holdOrder' // 持仓订单
import FundsTransfer from '../views/assetManagement/fundsTransfer/index'
import RechargeAndWithdrawRecord from '../views/assetManagement/rechargeAndWithdrawRecord'
// 用户管理
import UserManagement from '../views/userManagement/index'
import Authentication from '../views/userManagement/authentication'
import Passwordmodify from '../views/userManagement/passwordmodify'
import Replacephone from '../views/userManagement/replacephone' // 更换手机
import Replacepemal from '../views/userManagement/replacepemal' // 绑定邮箱
export default [
  {
    path: '/index',
    component: Index
  },
  {
    path: '/footer/legislation',
    component: Legislation
  },
  {
    path: '/footer/pneumatic',
    component: Pneumatic
  },
  {
    path: '/footer/privacy',
    component: Privacy
  },
  {
    path: '/footer/safety',
    component: Safety
  },
  {
    path: '/footer/security',
    component: Security
  },
  {
    path: '/footer/announcement',
    component: Announcement
  },
  {
    path: '/footer/user',
    component: User
  },
  {
    path: '/log',
    component: Log
  },
  {
    path: '/contactus',
    component: Contactus
  },
  {
    path: '/regist',
    component: Regist
  },
  {
    path: '/password',
    component: Password
  },
  {
    path: '/solutions',
    component: Solutions
  },
  {
    path: '/products',
    component: Products
  },
  // 币币交易
  {
    path: '/currency',
    component: Currency
  },
  // 用户管理
  {
    path: '/userManagement',
    name: 'userManagement',
    component: UserManagement,
    redirect: '/userManagement/authentication',
    children:[
      {
        path: '/userManagement/authentication',
        name: 'authentication',
        component: Authentication
      },
      {
        path: '/userManagement/passwordmodify',
        name: 'passwordmodify',
        component: Passwordmodify
      },
      {
        path: '/userManagement/replacephone',
        name: 'replacephone',
        component: Replacephone
      },
      {
        path: '/userManagement/replacepemal',
        name: 'replacepemal',
        component: Replacepemal
      },
    ]
  },
  // 资产管理
  {
    path: '/assetManagement',
    name: 'assetManagement',
    component: AssetManagement,
    redirect: '/assetManagement/assetDetails',
    children: [
      {
        path: '/assetManagement/assetDetails',
        name: 'assetDetails',
        component: AssetDetails
      },
      {
        path: '/assetManagement/assetDetails/rechargeCurrency',
        name: 'rechargeCurrency',
        component: RechargeCurrency
      },
      {
        path: '/assetManagement/assetDetails/withdrawal',
        name: 'withdrawal',
        component: Withdrawal
      },
      {
        path: '/assetManagement/entrustOrder',
        name: 'entrustOrder',
        component: EntrustOrder
      },
      {
        path: '/assetManagement/positionOrder',
        name: 'positionOrder',
        component: PositionOrder
      },
      {
        path: '/assetManagement/holdOrder',
        name: 'holdOrder',
        component: HoldOrder
      },
      {
        path: '/assetManagement/fundsTransfer',
        name: 'fundsTransfer',
        component: FundsTransfer
      },
      {
        path: '/assetManagement/rechargeAndWithdrawRecord',
        name: 'rechargeAndWithdrawRecord',
        component: RechargeAndWithdrawRecord
      }
    ]
  },
  {
    path: '/',
    redirect: '/index'
  }
]
