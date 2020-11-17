/*
资产模块
 */

import {
  ASSET_MANAGEMENT,
  SUMLIST_MANAGEMENT,
  SERVE_OPTIONS,
  BRING_OPTIONS,
  ACCOUNT_LIST,
  ALL_OPTIONS,
  LATES_TCONTRACT,
  BUYING_SELLING,
} from '../mutation-types'
import { coinList, getAccount }from '@/api'
const state = {
  allowanceBalance:[], // 资金账户
  otcBalance:[],
  balance:[],
  contractBalance:[],
  financialBalance:[],
  headnav:{},
  financialheadnav:{}, // 理财
  sumList:{}, // 资产账户交易账户等
  sumlistcny:0,
  serveOptions:[], // 充
  bringOptions:[], // 提
  allOptions:[], // 所有
  accountList:{} ,// 币种信息
  latesTcontract:'',//最新价格
  buyingTelling:'', // 买卖数据
  // contractprice:'', // 合约价格
}

const mutations = {
  [ASSET_MANAGEMENT] (state, maeket) {
    // state.allowanceBalance = maeket.allowanceBalance
    state.otcBalance = maeket.otcBalance
    state.allowanceBalance = maeket.allowanceBalance
    state.balance = maeket.balance
    state.contractBalance = maeket.contractBalance
    state.financialBalance = maeket.financialBalance
    state. headnav = maeket. headnav
    state. financialheadnav = maeket. financialheadnav
  },
  [SUMLIST_MANAGEMENT] (state, maeket) {
    state.sumList = maeket.sumlist
    state.sumlistcny = maeket.CNY
  },
  
  [SERVE_OPTIONS] (state, maeket) {
    state.serveOptions = maeket
  },
  [BRING_OPTIONS] (state, maeket) {
    state.bringOptions = maeket
  },
  [ACCOUNT_LIST] (state, maeket) {
    state.accountList = maeket
  },
  [ALL_OPTIONS] (state, maeket) {
    state.allOptions = maeket
  },
  [LATES_TCONTRACT] (state, maeket) {
    state.latesTcontract = maeket
  },
  [BUYING_SELLING] (state, maeket) {
    state.buyingTelling = maeket
  }, 
}

const actions = {
  // 充币列表
  async accountList({ commit },type) {
    let result = await coinList (type)
    if (result.code == 200) {  
      if(type==1){
        commit(SERVE_OPTIONS, result.data)
      }else if (type==2){
        commit(BRING_OPTIONS, result.data)
      }else{
        commit(ALL_OPTIONS, result.data)
      }
    }
  },
  // 币种信息
  async getAccountlist({ commit },type) {
    let result = await getAccount (type)
    if (result.code == 200) {
      commit(ACCOUNT_LIST, result.data)
    }
  },
  
 }

const getters = {
  // Clickswitch (state) {
  //   debugger
  //   return contractprice = state
  //   console.log(state)
  // }

}

export default {
  state,
  mutations,
  actions,
  getters
}