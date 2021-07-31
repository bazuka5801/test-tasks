import {findIndex, propEq, sortBy, prop} from 'ramda'
import Vue from 'vue'

const findIndexById = (list, id) => findIndex(propEq('id', id))(list)
const removeByIndex = (list, index) => list.splice(index, 1)
const newId = () => 1000000 + Math.ceil(Math.random() * 1000000)

export function removeTodo(list, item) {
  const todoIndex = findIndexById(list, item.id);
  removeByIndex(list, todoIndex)
}

export function addTodo(list, title) {
  list.push(
    {title, completed: false, id: newId()}
  )
}

export function editTodo(list, oldItem, newItem) {
  const todoIndex = findIndexById(list, oldItem.id);
  newItem.id = oldItem.id;
  Vue.set(list, todoIndex, newItem)
}


const sortByTitle = sortBy(prop('title'));

export function queryList(list, options) {
  let result = list
  if (options.filterByCompleted) {
    result = result.filter(propEq('completed', true))
  }
  if (options.sortByTitle) {
    result = sortByTitle(result)
  }

  return result
}
