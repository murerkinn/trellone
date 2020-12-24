<template lang="pug">
  div.panel
    .list-wrapper(v-for="list in panel.lists" :key="list._id")
      div.list
        h3.list-title {{  list.title}}
        draggable(class="list-group" group="cards" :id="list._id" :list="list.cards" @remove="removed" @update="updated")
          div.card(v-for="(element, index) in list.cards" :id="element._id" :key="index")
            span.content {{ element.title }}

        form(:style="`display: ${isCreateCardFormVisible ? 'block' : 'none'}`")
          a-input(placeholder="Content of the card" v-model="cardTitle" style="margin-bottom: 0.3em" ref="cardInput")
          a-button.submitBtn(@click="createCardFormSubmit(list._id)" icon="plus") Create card
          a-button(type="link" style="color: #131313" icon="close" @click="closeCreateCardForm")

        a-button(block icon="plus" @click="openCreateCardForm" :style="`display: ${isCreateCardButtonVisible ? 'block' : 'none'}`") Create new card


    .list-wrapper
      div.list
        form(:style="`display: ${isCreateListFormVisible ? 'block' : 'none'}`")
          a-input(placeholder="Title for the list" v-model="listTitle" style="margin-bottom: 0.3em" ref="listInput")
          a-button.submitBtn(@click="createListFormSubmit" icon="plus") Create list
          a-button(type="link" style="color: #131313" icon="close" @click="closeCreateListForm")

        a-button(block icon="plus" @click="openCreateListForm" :style="`display: ${isCreateListButtonVisible ? 'block' : 'none'}`") Create new list

</template>

<script>
import { mapState, mapActions } from 'vuex'
import { notification } from 'ant-design-vue'
import draggable from 'vuedraggable'

export default {
  data() {
    return {
      isCreateListFormVisible: false,
      isCreateListButtonVisible: true,
      isCreateCardFormVisible: false,
      isCreateCardButtonVisible: true,
      listTitle: '',
      cardTitle: ''
    }
  },
  components: {
    draggable
  },
  computed: {
    ...mapState('panel', ['panel'])
  },
  methods: {
    ...mapActions('panel', ['joinPanel', 'leavePanel', 'createList', 'createCard', 'updateCardsOfList', 'updateCardsBetweenLists']),
    async createListFormSubmit() {
      try {
        await this.createList({ panelId: this.$route.params.panelId, values: { title: this.listTitle } })

        notification.success({
          message: 'List created successfully'
        })

        this.closeCreateListForm()
      } catch (e) {
        console.error(e)
      }
    },
    async createCardFormSubmit(listId) {
      try {
        await this.createCard({ panelId: this.$route.params.panelId, values: { title: this.cardTitle }, listId })

        notification.success({
          message: 'Card created successfully'
        })

        this.closeCreateCardForm()
      } catch (e) {
        console.error(e)
      }
    },
    openCreateListForm() {
      this.isCreateListFormVisible = true
      this.isCreateListButtonVisible = false

      this.$nextTick(() => this.$refs.listInput.$el.focus())
    },
    closeCreateListForm() {
      this.isCreateListFormVisible = false
      this.isCreateListButtonVisible = true

      this.listTitle = ''
    },
    openCreateCardForm() {
      this.isCreateCardFormVisible = true
      this.isCreateCardButtonVisible = false
    },
    closeCreateCardForm() {
      this.isCreateCardFormVisible = false
      this.isCreateCardButtonVisible = true

      this.cardTitle = ''
    },
    updated(e) {
      this.updateCardsOfList({ listId: e.from.id, oldIndex: e.oldIndex, newIndex: e.newIndex })
    },
    removed(e) {
      this.updateCardsBetweenLists({ fromListId: e.from.id, toListId: e.to.id, oldIndex: e.oldIndex, newIndex: e.newIndex })
    }
  },
  created() {
    this.joinPanel(this.$route.params.panelId)
  },
  destroyed() {
    this.leavePanel()
  }
}
</script>

<style lang="scss">
.panel {
  display: flex;
  overflow: auto;
}

.list-wrapper {
  width: 270px;
  margin-right: 0.5em;
}

.list {
  width: 100%;
  padding: 0.2em;
  background-color: #ebecf0;
  border-radius: 3px;
}

.submitBtn {
  background-color: #5aac44 !important;
  color: #fefefe !important;

  &:hover {
    border-color: unset !important;
    filter: brightness(0.94);
  }
}

.card {
  text-align: center;
  background-color: #fefefe;
  border-radius: 3px;
  height: auto;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  margin-bottom: 6px;
  padding: 6px 8px 2px;
  cursor: pointer;
}

.list-title {
  padding-left: 0.3em;
}
</style>
