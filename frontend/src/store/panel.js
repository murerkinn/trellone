import axios from 'axios'
import io from 'socket.io-client'
const socket = io(process.env.VUE_APP_SOCKET_PATH)

const mutations = {
  SET_PANEL: 'setPanel'
}

const actions = {
  CREATE_PANEL: 'createPanel',
  FETCH_PANEL: 'fetchPanel',
  JOIN_PANEL: 'joinPanel',
  LEAVE_PANEL: 'leavePanel',
  CREATE_LIST: 'createList',
  CREATE_CARD: 'createCard',
  UPDATE_CARDS_OF_LIST: 'updateCardsOfList',
  UPDATE_CARDS_BETWEEN_LISTS: 'updateCardsBetweenLists',
  INIT: 'init'
}

const panel = {
  namespaced: true,
  state: () => ({
    panel: {}
  }),
  mutations: {
    [mutations.SET_PANEL](state, panel) {
      state.panel = panel
    }
  },
  actions: {
    async [actions.INIT]({ state, dispatch }) {
      socket.on('panel updated', () => {
        dispatch(actions.FETCH_PANEL, state.panel._id)
      })
    },
    async [actions.CREATE_PANEL]({ dispatch }, panelInfo) {
      await axios.post('/panels', panelInfo)

      await dispatch('account/fetchSession', {}, { root: true })
    },
    async [actions.JOIN_PANEL]({ dispatch }, panelId) {
      socket.emit('join-panel', panelId)

      dispatch(actions.FETCH_PANEL, panelId)
    },
    async [actions.LEAVE_PANEL]({ commit }) {
      commit(mutations.SET_PANEL, {})
    },
    async [actions.FETCH_PANEL]({ commit }, panelId) {
      const req = await axios.get(`/panels/${panelId}`)

      commit(mutations.SET_PANEL, req.data)
    },
    async [actions.CREATE_LIST](store, listInfo) {
      await axios.post(`/panels/${listInfo.panelId}/lists`, listInfo.values)
    },
    async [actions.CREATE_CARD](store, cardInfo) {
      await axios.post(`/panels/${cardInfo.panelId}/lists/${cardInfo.listId}/card`, cardInfo.values)
    },
    async [actions.UPDATE_CARDS_OF_LIST]({ state }, data) {
      await axios.post(`/panels/${state.panel._id}/lists/${data.listId}/cards`, data)
    },
    async [actions.UPDATE_CARDS_BETWEEN_LISTS]({ state }, data) {
      await axios.post(`/panels/${state.panel._id}/update-cards`, data)
    }
  }
}

export default panel
