import axios from 'axios'

const mutations = {
  SET_USER: 'setUser'
}

const actions = {
  REGISTER_USER: 'registerUser',
  LOGIN: 'login',
  LOGOUT: 'logout',
  FETCH_SESSION: 'fetchSession',
  INIT: 'init'
}

const account = {
  namespaced: true,
  state: () => ({
    user: null
  }),
  mutations: {
    [mutations.SET_USER](state, user) {
      state.user = user
    }
  },
  actions: {
    async [actions.INIT]({ dispatch }) {
      await dispatch(actions.FETCH_SESSION)
    },
    async [actions.REGISTER_USER](store, user) {
      return axios.post('/account/register', { user })
    },
    async [actions.LOGIN]({ commit }, credentials) {
      const user = await axios.post('/account/session', credentials)

      commit(mutations.SET_USER, user.data)
    },
    async [actions.LOGOUT]({ commit }) {
      await axios.delete('/account/session')

      commit(mutations.SET_USER, null)
    },
    async [actions.FETCH_SESSION]({ commit }) {
      const user = await axios.get('/account/session')

      commit(mutations.SET_USER, user.data)
    }
  }
}

export default account
