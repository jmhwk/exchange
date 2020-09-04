import Index from '../views/home/index' // 首页
// 页脚
import Legislation from '../views/agreementFooter/legislation.vue'
import Privacy from '../views/agreementFooter/privacy.vue'
import Pneumatic from '../views/agreementFooter/pneumatic.vue'
import Safety from '../views/agreementFooter/safety.vue'
import Security from '../views/agreementFooter/security.vue'
import User from '../views/agreementFooter/user.vue'
// 登录注册邀请
import Log from '../views/log/log'
import Regist from '../views/log/regist.vue'
import Password from '../views/log/password.vue'
import Solutions from '../views/log/solutions.vue'
// 合约交易
import Products from '../views/products/products'
// 资产管理
import AssetManagement from '../views/assetManagement'
import AssetDetails from '../views/assetManagement/assetDetails'
import RechargeCurrency from '../views/assetManagement/assetDetails/rechargeCurrency'
import EntrustOrder from '../views/assetManagement/entrustOrder'
import PositionOrder from '../views/assetManagement/positionOrder'
import RechargeAndWithdrawRecord from '../views/assetManagement/rechargeAndWithdrawRecord'

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
    path: '/footer/user',
    component: User
  },
  {
    path: '/log',
    component: Log
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
