<template>
  <q-page padding>
    <div class="row full-width">
      <q-btn-toggle
        v-model="queryOptions.filterByCompleted"
        spread
        class="my-custom-toggle full-width"
        no-caps
        rounded
        unelevated
        toggle-color="primary"
        color="white"
        text-color="primary"
        :options="[
          {label: 'Все', value: false},
          {label: 'Выполненные', value: true}
        ]"
      />
    </div>
    <div class="row full-width">
      <q-checkbox label="Сортировка по имени" v-model="queryOptions.sortByTitle" />
    </div>
    <q-list bordered class="full-width">
      <q-item v-for="todoItem in queriedTodos" :key="todoItem.id" clickable v-ripple @click="() => showEditItemDialog(todoItem)">
        <q-item-section>
          <q-item-label v-text="todoItem.title" />
        </q-item-section>
        <q-item-section avatar>
          <q-checkbox v-model="todoItem.completed" />
        </q-item-section>
        <q-item-section avatar>
          <q-btn icon="delete" round dense color="red" @click.stop="() => showRemoveItemDialog(todoItem)" />
        </q-item-section>
      </q-item>
    </q-list>

    <q-page-sticky position="bottom" :offset="[24, 24]" expand>
      <div class="row justify-end full-width">
        <q-btn icon="add" round class="bg-primary text-white"  push size="lg" @click="showAddItemDialog" />
      </div>
    </q-page-sticky>
  </q-page>
</template>

<script>
import {addTodo, editTodo, queryList, removeTodo} from "pages/todoCore";
import { QSpinnerFacebook } from 'quasar'

export default {
  name: 'PageIndex',
  data: () => ({
    todoList: [],
    queryOptions: {
      filterByCompleted: false,
      sortByTitle: false
    }
  }),
  mounted() {
    this.$q.loading.show({ message: "Загрузку Todo...", spinner: QSpinnerFacebook })
    this.$axios.get('https://jsonplaceholder.typicode.com/users/1/todos4')
      .then(this.setTodoList)
      .catch(this.showError)
      .finally(() => this.$q.loading.hide())
  },
  computed: {
    queriedTodos() {
      return queryList(this.todoList, this.queryOptions)
    }
  },
  methods: {
    setTodoList(response) {
      this.$set(this, 'todoList', response.data)
    },
    showAddItemDialog() {
      this.$q.dialog({
        title: 'Новая заметка ',
        message: 'Минимум 3 символа, максимум 100',
        prompt: {
          model: '',
          isValid: val => val.length > 2 && val.length <= 100, // << here is the magic
          type: 'text' // optional
        },
        cancel: true,
        persistent: true
      }).onOk(title => addTodo(this.todoList, title))
    },
    showEditItemDialog(item) {
      this.$q.dialog({
        title: 'Заметка',
        message: 'Редактирование',
        prompt: {
          model: item.title,
          isValid: val => val.length > 2 && val.length <= 100, // << here is the magic
          type: 'text' // optional
        },
        cancel: true,
        persistent: true
      }).onOk(title => editTodo(this.todoList, item, {...item, title}))
    },
    showRemoveItemDialog(todoItem) {
      this.$q.dialog({
        title: 'Подтверждение',
        message: 'Вы действительно хотите удалить заметку?',
        cancel: true,
        persistent: true
      }).onOk(() => removeTodo(this.todoList, todoItem))
    },
    showError(e) {
      this.$q.notify({message: "Ошибка загрузки: " + e })
    }
  }
}
</script>

<style lang="scss">
.my-custom-toggle {
  border: 1px solid #027be3;
}
</style>
