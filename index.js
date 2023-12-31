const { createStore, applyMiddleware } = require('redux');
const { delayActionMiddleware, fetchAsyncMiddlewares } = require('./middlewares');
const { fetchTodos } = require('./function');

// initial state
const initialState = {
    todos: [],
};

// reducer
const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'todos/todoAdded':
            return {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        title: action.payload,
                    },
                ],
            };

        case 'todos/todoLoaded':
            return {
                ...state,
                todos: [...state.todos, ...action.payload],
            };

        default:
            return state;
    }
};

// store
const store = createStore(todoReducer, applyMiddleware(delayActionMiddleware, fetchAsyncMiddlewares));

// subscribe to state changes
store.subscribe(() => {
    console.log(store.getState());
});

// dispatch actions
// store.dispatch({
//     type: 'todos/todoAdded',
//     payload: 'Learning redux',
// });

store.dispatch(fetchTodos);
