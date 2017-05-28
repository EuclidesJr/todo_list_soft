import {createStore} from './lib/state';

const initialState = {
    todos: [
        {
            id: 0,
            text: 'Take a look at the application',
            done: true
        },
        {
            id: 1,
            text: 'Add ability to filter todos',
            done: false
        },
        {
            id: 2,
            text: 'Filter todos by status',
            done: false
        },
        {
            id: 3,
            text: 'Filter todos by text',
            done: false
        }
    ]
};

function todoChangeHandler(state, change) {
    switch(change.type) {
        case 'ADD_TODO':
            state.todos.push({
                id: state.todos.length,
                text: change.text,
                done: false
            });
            break;
        case 'TODO_TOGGLE_DONE':
            for(let todo of state.todos) {
                if(todo.id === change.id) {
                    todo.done = !todo.done;
                    break;
                }
            }
            break;
        case 'SHOW_OPEN':
			state.filterOption = "open";
			break;
		case 'SHOW_CLOSED':
			state.filterOption = "closed";
			break;
		case 'SHOW_ALL':
			state.filterOption = "all";
			break;
		case 'REMOVE_TODO':
			for(var i = state.todos.length - 1; i >= 0 ; i--) {
				if(state.todos[i].done){
					state.todos.splice(i, 1);
				}
			}			
			break;
    }
}

export const todos = createStore(todoChangeHandler, initialState);
export const filterOption = "all";
