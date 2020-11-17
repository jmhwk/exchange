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
    let $router = params.$router
    let $message = params.$message
    const {password, phone,phoneCode} = params
    const result = await reqTelLogin({password, phone,phoneCode})
    if(result.code === 200) {
      const token = result.data.token
      const user = result.data.user
      setToken(token)
      commit(TOKEN_USER, token)
      commit(RECEIVE_USER, user)
      $router.push('/index')
    }else{
      $message({
        message: result.msg,
        type: 'error'
      })
    }
  },
  // 获取个人信息
  async usermessage({ commit }) {
    const result = await reqUser()
    if(result.code === 200) {
      result.data.createTime = timestampToTime(result.data.createTime)
      const user = result.data
      commit(RECEIVE_USER, user)
      
    }else{
      // alert(result.msg)
    }
  },
  
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