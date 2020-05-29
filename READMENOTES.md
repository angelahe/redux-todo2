# todo-redux2
basic tutorial from redux.js.org (vanilla)
https://redux.js.org/basics/basic-tutorial
then add react to it
https://redux.js.org/basics/example

## setup
```
npx create-react-app todo-redux2
npm i redux --save-dev
npm i react-redux --save-dev
npm install enzyme enzyme-adapter-react-16 enzyme-to-json --save-dev
```

## tests
npm test

# vim shortcuts
https://vim.rtorr.com/
move: eg 4 j go down 4 lines
h j k l
H M L
w e b
W E B
0 - start of line
^ - 1st non blank char
gg - 1st line of doc
G - last line
5G - line 5
{ } - jump to next/prev paragraph
move screens: down 1, up 1, up 1 screen, down 1 screen, 1/2 screen
Ctrl+e y b f d u

insert:
r - replace character
i - before cursor
I - at beginning of line
a - after cursor
A - end of line
o - append new line below current
O - apprend above current line

cut/paste:
yy - copy line (2yy for 2 lines)
y$ - copy to end of line
p - paste
dd - delete 1 line, 2dd
dw - delete word
D - delete to end of line
d$ cut to end of line
x - delete
> shift text right
< shift text left

## tutorial notes
### actions 
- for sending payloads of information from your application to your store using store.dispatch 
- plain javascript
- must have a type property
- initiate a dispatch by passing the result of an action to the dispatch function
- describe what happened but not how the app state changes

e.g. 
dispatch(addTodo(text))
dispatch(completeTodo(index))
OR
- create a bound action creator that automatically dispatches
e.g. 
const boundAddTodo = text => dispatch(addTodo(text))
const boundCompleteTodo = index => dispatch(completeTodo(index))
VIA
store.dispatch() but more likely with connect()

### reducers
- specify how the application state changes in response to actions sent to the store
- app state stored in a single object
- keep state normalized without nesting
- every entity in an object stored with an id as a key
- use ids to reference object from other entities or lists
- ie state = db
e.g. todosById: { id -> todo } and todos: array<id>
- pure function that takes the previous state and an action, and returns the next state
- never mutate its arguments, perform side effects like API calls or routing transitions
- never call non-pure functions like date.now() or math.random()
- use Object.assign() to create a copy of the state
- can use object spread oberator proposal to make a copy of state instead
- solves need to emit an update, register the stor with a dispatcher, and need for store to be an object by using pure reducers instead of event emitters
- reducer composition - e.g. todos accepts state, but todoApp gives just a slice of the state to manage
- when app is larger can split the reducers into separate files and keep them completely independent and managing different data domains
equivalent reducers:
const reducer = combineReducers({
  a: doSomethingWithA,
  b: processB,
  c: c
})
function reducer(state = {}, action) {
  return {
    a: doSomethingWithA(state.a, action),
    b: processB(state.b, action),
    c: c(state.c, action)
  }
}
- can put all top level reducers into a separate file, export each reducer function, and use import * as reducers to get them as an object with their
names as keys, but warning is new syntax so not used here
- use combineReducers() to combine several reducers into one

### store
- holds application state
- allows access to state via getState();
- allows state to be updated via dispatch(action);
- registers listeners via subscribe(listener);
- handles unregistering of listeners via the function returned by subscribe(listener)
- import reducers that were combined via combineReducers() and pass to createStore()

### testing the program works even without UI
put in index.js

## data lifecycle
1. call store.dispatch(action)
{ type: 'LIKE_ARTICLE', articleId: 42 }
 { type: 'FETCH_USER_SUCCESS', response: { id: 3, name: 'Mary' } }
 { type: 'ADD_TODO', text: 'Read the Redux docs.' }
2. redux store calls the reducer function you gave it
store pass 2 arguments to the reducer - the current state tree and the action
```
// The current application state (list of todos and chosen filter)
let previousState = {
  visibleTodoFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Read the docs.',
      complete: false
    }
  ]
}

// The action being performed (adding a todo)
let action = {
  type: 'ADD_TODO',
  text: 'Understand the flow.'
}

// Your reducer returns the next application state
let nextState = todoApp(previousState, action)
```

3. root reducer may combine the output of multiple reducers into a single state tree
via combineReducers()
```
function todos(state = [], action) {
  // Somehow calculate it...
  return nextState
}

function visibleTodoFilter(state = 'SHOW_ALL', action) {
  // Somehow calculate it...
  return nextState
}

let todoApp = combineReducers({
  todos,
  visibleTodoFilter
})
```

when emit an action, todoApp returned by combineReducers will call both reducers

```
let nextTodos = todos(state.todos, action)
let nextVisibleTodoFilter = visibleTodoFilter(state.visibleTodoFilter, action)
```

4. redux store save the complete state tree returned by the root reducer
the new tree is now the next state of your app
every listener registered with store.subscribe(listener) will be invoked, and
listeners may call store.getState() to get the current state
now the UI can be updated to reflect the new state
call component.setState(newState)

## Using Redux with React
-----------------------------------------------------------------------------
                  Presentational Components	        | Container Components
-----------------------------------------------------------------------------
Purpose	        | How things look (markup, styles)	| How things work (data fetching, state updates)
Aware of Redux	| No	                              | Yes
To read data	  | Read data from props	            | Subscribe to Redux state
To change data	| Invoke callbacks from props	      | Dispatch Redux actions
Are written	    | By hand	                          | Usually generated by React Redux

presentational:
Footer, Link, Todo, TodoList

container:
uses store.subscribe() to read part of the redux state tree and supply props to a presentational component it renders
using connect() to generate them has useful optimizations to prevent unnecessary re-renders
ie don't have to implement shouldComponentUpdate
use mapStateToProps to describe how to transform the current redux store state into the props 

use mapDispatchToProps() to receive the dispatch() method and return callback props that want to inject into the presentational component

## passing the store
use <Provider> only once when you render the root component

## further reading
for how to structure actions
https://github.com/redux-utilities/flux-standard-action
flux - application architecture for building user interfaces
http://facebook.github.io/flux/
for normalizing state
https://github.com/paularmstrong/normalizr
advanced tutorial to handle side effects:
https://redux.js.org/advanced/advanced-tutorial
using object spread operator:
https://redux.js.org/recipes/using-object-spread-operator
reducing boilerplate:
https://redux.js.org/recipes/reducing-boilerplate#reducers
es6 object destructuring:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
redux motivation:
https://redux.js.org/introduction/motivation
the case for flux:
https://medium.com/swlh/the-case-for-flux-379b7d1982c6
react is not flux:
https://redux.js.org/introduction/prior-art
async flow:
https://redux.js.org/advanced/async-flow
advanced tutorial:
https://redux.js.org/advanced/advanced-tutorial
async actions:
https://redux.js.org/advanced/async-actions
components structuring:
https://redux.js.org/faq/react-redux#should-i-only-connect-my-top-component-or-can-i-connect-multiple-components-in-my-tree
thinking in react:
https://reactjs.org/docs/thinking-in-react.html
ref attribute:
https://reactjs.org/docs/refs-and-the-dom.html
computing derived data:
https://redux.js.org/recipes/computing-derived-data