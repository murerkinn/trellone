<template lang="pug">
  div
    a-row(type="flex")
      a-col(:span="24")
        h1 Your panels

        a-row(v-if="user.panels.length" type="flex")
          a-col.panelCardContainer(:span="6" v-for="panel in user.panels" :key="panel._id")
            router-link(:to="`/panels/${panel._id}`")
              panel-card(:title="panel.title")

          a-col.panelCardContainer(:span="6" @click="openModal")
            panel-card(:createNewPanel="true" background="#f0f2f5")

        a-empty(v-else)
          span(slot="description") You don't have any panels. Click below to create your first panel.✨
          a-button(type="primary" @click="openModal") Create Now

        a-modal(
          v-model="isModalVisible"
          title="Create a new panel"
          centered
          :footer="null"
        )
          a-form(:form="form" @submit="formSubmit")
            a-form-item
              a-input(placeholder="Title for the panel" v-decorator="validationRules.title")
            a-form-item
              a-button(type="primary" html-type="submit" :loading="loading" block icon="plus") Create panel
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { notification } from 'ant-design-vue'

import PanelCard from '../components/PanelCard'

export default {
  data() {
    return {
      loading: false,
      isModalVisible: false,
      validationRules: {
        title: [
          'title',
          {
            rules: [
              { required: true, message: 'Panel title is required.\n' },
              { min: 3, max: 200, message: 'Panel title must be between 3 and 200 characters.\n' }
            ]
          }
        ]
      },
      backendError: null
    }
  },
  computed: {
    ...mapState('account', ['user'])
  },
  components: {
    PanelCard
  },
  methods: {
    ...mapActions('panel', ['createPanel']),
    formSubmit(e) {
      e.preventDefault()
      this.backendError = null
      this.form.validateFieldsAndScroll(async (err, values) => {
        if (err) return

        try {
          await this.createPanel(values)

          this.isModalVisible = false

          notification.success({
            message: 'Panel created successfully'
          })

          this.form.resetFields()
        } catch (e) {
          this.backendError = e.response.data
        }
      })
    },
    onValuesChange() {
      this.backendError = null
    },
    openModal() {
      this.isModalVisible = true
    }
  },
  beforeCreate() {
    const component = this
    this.form = this.$form.createForm(this, {
      name: 'createPanelForm',
      onValuesChange() {
        component.backendError = null
      }
    })
  }
}
</script>

<style lang="scss">
.panelCardContainer {
  margin: 0.7em !important;
  cursor: pointer;
}
</style>
