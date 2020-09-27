/*
用户模块
 */

import {
  RECEIVE_USER,
  TOKEN_USER,
} from '../mutation-types'
import { timestampToTime  } from '@/assets/js/time.js'

import {
  reqUser,
  reqTelLogin,
  reqLogout
} from '@/api'
import {
  getToken, setToken, removeToken 
} from '@/assets/js/auth'

const state = {
  user:{}, // 登陆用户信息对象
  token: getToken(), //  token
}

const mutations = {
  [RECEIVE_USER] (state, user) {
    state.user =user
  },
  [TOKEN_USER] (state, token) {
    state.token = token
  },
}

const actions = {
  //log登录
  async Login({ commit },params) {
    const result = await reqTelLogin(params)
    if(result.code === 200) {
      const token = result.data.token
      const user = result.data.user
      setToken(token)
      commit(TOKEN_USER, token)
      commit(RECEIVE_USER, user)
    }else{
      
    }
  },
  // 获取个人信息
  async usermessage({ commit }) {
    const result = await reqUser()
    if(result.code === 200) {
      result.data.updateTime = timestampToTime(result.data.updateTime)
      const user = result.data
      commit(RECEIVE_USER, user)
    }else{
      // alert(result.msg)
    }
  },
  // 首页数据
  // getSocketData({ commit }) {
  //   let params = {
  //     "channel": "homeMarket"
  //   }
  //   getSocket('ws://47.242.81.154:8087/ws', JSON.stringify(params), (data, ws) => {
  //     commit(HOME_MARKET, data)
  //     // this.$store.commit(HOME_MARKET, data)
  //   });
  // },
  
  // 前端 登出
  FedLogOut({ commit }) {
    commit(RECEIVE_USER, '')
    commit(TOKEN_USER, '')
    removeToken()
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