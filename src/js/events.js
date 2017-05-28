import {todos} from './state';
import {listen} from './lib/events';
import {addTodo, toggleTodoState, showFiltered, removeDone} from './actions';

export function registerEventHandlers() {
	listen('click', '#addTodo', event => {
		const todoInput = document.getElementById('todoInput');
		todos.dispatch(addTodo(todoInput.value));
		event.stopPropagation();
		document.getElementById('todoInput').focus();
	});
	
	listen('keypress', '#addTodo', event => {
		const todoInput = document.getElementById('todoInput');
		todos.dispatch(addTodo(todoInput.value));
		event.stopPropagation();
		document.getElementById('todoInput').focus();
	});
	
	listen('click', '.js_toggle_todo', event => {
		const id = Number.parseInt(event.target.getAttribute('data-id'), 10);
		todos.dispatch(toggleTodoState(id));
	});
	
	listen('change', 'input[type="radio"]', event => {
		const filterRadio = document.querySelector("input[name=filterStatus]:checked").value;
		todos.dispatch(showFiltered(filterRadio));
		event.stopPropagation();
	});
	
	listen('click', '#removeTodo', event => {
		const todoInput = document.getElementById('todoInput');
		todos.dispatch(removeDone(todoInput.value));
		event.stopPropagation();
	});
}
