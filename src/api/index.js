/*
包含n个接口请求函数的模块
调用ajax函数发请求
函数的返回值是promise
 */
import ajax from './ajax'

// const BASE = 'http://10.168.1.36:8070/' // 本地
// const BASE = 'http://120.25.153.148:8070/' // 测试
// const base = 'http://120.25.153.148:8073/' // 合约环境
const base = 'http://47.242.81.154:8073/' // 合约正式环境
const BASE = 'http://47.242.81.154:8070/'  // 正式
// import qs from 'qs'

/* 用户模块 */
// 1 注册
export const reqSmsLogin = ({ inviteCode, password, phone, phoneCode }) => ajax(BASE + 'user/register', { inviteCode, password, phone, phoneCode }, 'POST')
// 1 登录
export const reqTelLogin = ({password, phone,phoneCode}) => ajax(BASE + 'user/login', {password, phone,phoneCode}, 'POST')
// 2 发送短信验证码
export const reqCode = ({ phone , type }) => ajax(BASE + 'sms/sendSms', { phone,type }, 'POST')
export const sendEmailCode = (email) => ajax(BASE + 'email/sendEmailCode',{email}, 'POST') // 获取邮箱验证码
export const bindEmail = ({email,emailCode}) => ajax(BASE + 'user/bindEmail',{email,emailCode}, 'POST') // 绑定邮箱
// 根据会话获取用户信息
export const reqUser = () => ajax(BASE + 'user/userCenter')
// 忘记密码 
export const forget = ({ password,phone,phoneCode, repeatPassword }) => ajax(BASE + 'user/forgetPasswordPhone', { password,phone,phoneCode, repeatPassword }, 'POST')
// 修改登录密码
export const modificationforget = ({ newPassword,oldPassword ,phoneCode,repeatPassword }) => ajax(BASE + 'user/updateLoginPassword', { newPassword,oldPassword ,phoneCode,repeatPassword }, 'POST')
// 修改交易密码
export const repeatforget = ({ transactionPassword ,phoneCode,repeatPassword }) => ajax(BASE + 'user/setTransactionPassword', { transactionPassword ,phoneCode,repeatPassword }, 'POST')
// 修改手机号
export const updatePhone = ({ oldPhoneCode, phoneCode, phone }) => ajax(BASE + 'user/updatePhone', { oldPhoneCode, phoneCode, phone}, 'POST')
// 实名认证
export const identityAuthen = ({ cardNo, cardType, handImage, idImageA,idImageB, idName,country }) => ajax(BASE + 'user/identityAuthen', { cardNo, cardType, handImage, idImageA,idImageB, idName,country }, 'POST')
// 实名认证图片上传
export const uploadBase64 = ({params,index}) => ajax(BASE + 'file/uploadBase64', {params,index}, 'POST')
// 公告
export const article = (type) => ajax(BASE + 'article/list/'+type)

/* 资产管理 */

// 用户资产列表
export const accountList = () => ajax(BASE + 'userCoin/accountList')
// 理财收益记录
export const financialUserRecord = (type) => ajax(BASE + 'financialUserRecord/getNewUserDetail/'+ type)
// 补贴账户
export const myAllowance = () => ajax(BASE+'fAllowanceRelease/myAllowance')
// 补贴记录
export const allowanceDetail = (type) => ajax(BASE+'fAllowanceRelease/allowanceDetail/'+type)
// 释放记录
export const releaseDetail = (type) => ajax(BASE+'fAllowanceRelease/releaseDetail/'+type)
/* 提充记录 */

// 提币种类列表
export const getAccount = (type) => ajax(BASE + 'userCoin/getAccount/'+type)
// 合约账户
export const getContractAccount = () => ajax(BASE + 'userAccountTransfer/getContractAccount')
// 币种列表 type 1 充币2 提币 3 全部
export const coinList = (type) => ajax(BASE + 'userCoin/coinList/'+type) 
// 提币记录
export const getTransferOut = (type) => ajax(BASE + 'userCoin/getTransferOut/'+type)
// 充币记录
export const getCoinRecord = (type) => ajax(BASE + 'userCoin/getCoinRecord/'+type)
// 充币地址
export const recharge = (type) => ajax(BASE + 'userCoin/recharge/'+type)
// 提币接口
export const withDrawOut = ({amount,coinName,fee,phoneCode,toAddress,txPassword,emailCode}) => ajax(BASE + 'userCoin/withDrawOut', { amount,coinName,fee,phoneCode,toAddress,txPassword,emailCode }, 'POST')
// 划转记录
export const getTransferDetail = (type) => ajax(BASE + 'userAccountTransfer/getTransferDetail/'+type) // 传接
// 划转接口
export const transferAccount = ({ amount , coinId, coinName, fromAccount, toAccount,toCoinId }) => ajax(BASE + 'userAccountTransfer/transferAccount', { amount , coinId, coinName, fromAccount, toAccount,toCoinId }, 'POST')


/* 邀请返佣 */

// 邀请注册
export const getRefeRee = () => ajax(BASE + 'userReferee/getRefeRee')
// 推荐人数
export const refereeTotal = () => ajax(BASE + 'userReferee/refereeTotal')
// 邀请注册
export const userInvite = (type) => ajax(BASE + 'user/userInvite/'+type)
// 返佣
export const myTeam = () => ajax(BASE + 'userReferee/myTeam')

/* 订单委托 */
// 订单详情
export const orderList = (params) => ajax(BASE + 'orders/orderList', params, 'POST')
// 历史委托
export const tradeList = (params) => ajax(BASE + 'trade/tradeList', params, 'POST')
// 撤销 
export const cancelOrder = (params) => ajax(BASE + 'orders/cancelOrder', params, 'POST')

/* 持仓订单 */
// 订单详情 全部委托
export const lendorderList = (params) => ajax(base + 'lendOrders/orderList', params, 'POST')
// 历史平仓
export const getNewHistory = (type) => ajax(base + 'lendOrders/getNewHistory/'+type)
// 币种列表
export const getMarket = () => ajax(base + 'lendMarket/getMarket')
// 历史委托 历史记录
export const historyOrderList = (params) => ajax(base + 'lendOrders/historyOrderList', params, 'POST')
// 撤销 
export const lendcancelOrder = (params) => ajax(base + '/lendOrders/cancelOrder', params, 'POST')

/* 币币买卖 */
// type 1 买入开多 2 卖出开空 3卖出平多 4买入平空
export const add = ({ marketId, orderType, price, qty,type  }) => ajax(BASE + 'orders/add', { marketId, orderType, price, qty,type  }, 'POST')
/* 合约买卖 */
// type 1 买入开多 2 卖出开空 3卖出平多 4买入平空
// export const lendadd = ({lendRate, marketId, orderType, price, qty,type,earnPrice ,lossPrice}) => ajax(base + 'lendOrders/add', {lendRate, marketId, orderType, price, qty,type,earnPrice ,lossPrice}, 'POST')
export const lendadd = (params) => ajax(base + 'lendOrders/add', params, 'POST')

// 杠杆接口
export const lendRateConfig = (marketId) => ajax(base + 'lendOrders/lendRateConfig/'+marketId )
// 合约交易持仓
export const lendUserHold = (marketId) => ajax(base + 'lendUserHold/getUserHold/'+marketId )