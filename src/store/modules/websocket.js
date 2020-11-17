/*
k线模块
 */

import {
  HOME_MARKET,
  MARKET_LIST,
  MARKET_ALL,
  LENDMAEKET_ALL,
  LENDALL_LIST,
  PROPORTION_LIST,
  CION_LIST,
  PROPORTION_CION,
  CONTRA_FORM,
  COINS_FORM,
  LENDUSER_ORDER,
  LENDUSER_HOLD,
  USER_ORDER
} from '../mutation-types'
import * as socketApi from '@/assets/js/socket.js'
const state = {
  allMarketList:[], // 推荐
  recommendMarketList:[] ,//全部
  marketList:[],// 深度数据
  marketAll:[],// k币币线选择数据 
  lendMaeketAll:[] ,// 合约k线
  lendallList:{},// 合约所有数据
  cionList:{},// 币币所有数据
  proportionList:{
    proportionred:'',
    proportiongreen:''
  },// 比例
  proportionCion:{
    proportionred:'',
    proportiongreen:''
  },// 比例
  contraForm:{
    Buying:'',
    selling:''
  }, //合约
  coinsForm:{
    Buying:'',
    selling:''
  }, // 币
  lenduserOrder:[], // 限价委托
  lenduserHold: [], // 当前持仓
  userOrder:[],// 币币当前限价委托
}

const mutations = {
  [HOME_MARKET] (state, maeket) {
    state.allMarketList = maeket.allMarketList[0].marketList
    state.recommendMarketList = maeket.recommendMarketList
  },
  [MARKET_LIST] (state, maeket) {
    state.marketList = maeket
  },
  [MARKET_ALL] (state, maeket) {
    state.marketAll = maeket
  },
  [LENDMAEKET_ALL] (state, maeket) {
    state.lendMaeketAll = maeket
  },
  [LENDALL_LIST](state, maeket) {
    maeket.sellList.reverse()
    state.lendallList = maeket
  }, 
  [PROPORTION_LIST](state, maeket) {
    state.proportionList = maeket
  },
  
  [CION_LIST](state, maeket) {
    maeket.sellList.reverse()
    state.cionList = maeket
  }, 
  [PROPORTION_CION](state, maeket) {
    state.proportionCion = maeket
  },
  [CONTRA_FORM] (state, maeket) {
    state.contraForm = maeket
  },
  [COINS_FORM] (state, maeket) {
    state.coinsForm = maeket
  }, 
  [LENDUSER_ORDER] (state, maeket) {
    state.lenduserOrder = maeket.orderList
  },
  [LENDUSER_HOLD] (state, maeket) {
    state.lenduserHold = maeket
  }, 
  [USER_ORDER] (state, maeket) {
    state.userOrder = maeket
  },
} 

const actions = {
  // 首页数据
  getSocketData({ commit }) {
    const data = {
      "channel": "homeMarket"
    };
    socketApi.sendSock(data, (data) =>{
      if(data.channel=="homeMarket"){
        commit(HOME_MARKET, data)
      }
    });
  },
}

const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}