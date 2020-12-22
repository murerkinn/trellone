import axios from 'axios'

const actions = {
  CREATE_PANEL: 'createPanel'
}

const panel = {
  namespaced: true,
  actions: {
    async [actions.CREATE_PANEL]({ dispatch }, panelInfo) {
      await axios.post('/panels', panelInfo)

      await dispatch('account/fetchSession', {}, { root: true })
    }
  }
}

export default panel
