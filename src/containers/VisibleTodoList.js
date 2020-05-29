import { connect } from 'react-redux'
import { toggleTodo } from '../redux/actions'
import TodoList from '../components/TodoList'
import { VISIBILITY_FILTERS } from '../constants'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VISIBILITY_FILTERS.SHOW_ALL:
      return todos
    case VISIBILITY_FILTERS.SHOW_COMPLETED:
      return todos.filter(t => t.completed)
    case VISIBILITY_FILTERS.SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = state => ({
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)