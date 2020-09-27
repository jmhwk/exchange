/*
k线模块
 */

import {
  HOME_MARKET,
  MARKET_LIST,
  MARKET_ALL
} from '../mutation-types'
import { getSocket } from '../../assets/js/websocket.js'

const state = {
  allMarketList:[], // 推荐
  recommendMarketList:[] ,//全部
  marketList:[],// 深度数据
  marketAll:[]// k线选择数据 
  
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
}

const actions = {
  // 首页数据
  getSocketData({ commit }) {
    let params = {
      "channel": "homeMarket"
    }
    getSocket(JSON.stringify(params), (data, ws) => {
      commit(HOME_MARKET, data)
      // this.$store.commit(HOME_MARKET, data)
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