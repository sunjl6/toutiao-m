import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    user: getItem(TOKEN_KEY),
    userId: null
  },
  getters: {
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      setItem(TOKEN_KEY, state.user)
    },
    setUserId (state, payload) {
      state.userId = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
