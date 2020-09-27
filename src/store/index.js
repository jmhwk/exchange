// vuex 核心管理对象：store
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import user from './modules/user'
import websocket from './modules/websocket'
import property from './modules/property'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    websocket,
    user,
    property
  }
})



// const vuexLocal = new VuexPersistense({
//   storage: localStorage,
//   reducer: val => {
//     
//     return {
//       //引入app模板，对象里面可配置需要持久化的status
//       token: val.token,
//     }
//   }
// })
// const store = new Vuex.Store({
//   modules: {
//     user, 
//     websocket
//   },
//   plugins:[createPersistedState({
//     storage: window.localStorage,
//     reducer(val) {
//       return {
//       // 只储存state中的user
//       token: val.token
//     }
//  }
//   })]
// })
 
// export default store