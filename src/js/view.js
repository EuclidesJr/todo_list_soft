import {isEnabled,filterArray} from './lib/feature';

export function render(el, state) {
	const todoItems = state.todos.map(renderTodoItem).join('');
	el.innerHTML = renderApp(
		renderInput(),
		renderTodos(todoItems),
		state
	);	
}

function renderApp(input, todoList,state ) {
	if(isEnabled('renderBottom') && !isEnabled('filter')) {
		return renderAddTodoAtBottom(input, todoList);
	}else if(!isEnabled('renderBottom') && isEnabled('filter')){		
		todoList = filterArray(state.todos,state.filterOption);		
		return renderAddTodoAtTopRadio(input, renderTodos(todoList.map(renderTodoItem).join('')), renderRadio(state.filterOption));
	}else if(isEnabled('renderBottom') && isEnabled('filter') && !isEnabled('filterTop')){
		todoList = filterArray(state.todos,state.filterOption);
		return renderAddTodoAtBottomRadio(input, renderTodos(todoList.map(renderTodoItem).join('')), renderRadio(state.filterOption));
	}else if(isEnabled('renderBottom') && isEnabled('filter') && isEnabled('filterTop')){
		todoList = filterArray(state.todos,state.filterOption);
		return renderFilterTop(input, renderTodos(todoList.map(renderTodoItem).join('')), renderRadio(state.filterOption));
	}else {
		return renderAddTodoAtTop(input, todoList);
	}
}

function renderAddTodoAtTop(input, todoList) {
    return `<div id="app">
        ${input}
        ${todoList}
    </div>`;
}

function renderAddTodoAtBottom(input, todoList) {
    return `<div id="app">
        ${todoList}
        ${input}
    </div>`;
}

function renderAddTodoAtTopRadio(input, todoList, radio){
	return `<div id="app">
        ${radio}
        ${input}
        ${todoList}
    </div>`;
}

function renderAddTodoAtBottomRadio(input, todoList, radio){
	return `<div id="app">
        ${todoList}
        ${input}
        ${radio}
    </div>`;
}

function renderFilterTop(input, todoList, radio){
	return `<div id="app">
        ${radio}        
        ${todoList}
        ${input}
    </div>`;
}

function renderInput() {
    return `<div class="todo__input"><input type="text" id="todoInput"><button id="addTodo">Add</button></div>`;
}

function renderRadio(option) {
    return `<div class="todo__filter">
				<input type="radio" name="filterStatus" value="all" ${option=="all" || option===undefined ? ' checked' : ''} >All
				<input type="radio" name="filterStatus" value="open" ${option=="open" ? ' checked' : ''}>Open
				<input type="radio" name="filterStatus" value="closed" ${option=="closed" ? ' checked' : ''}>Closed
			</div>`;
}

function renderTodos(todoItems) {
    return `<ul class="todo">${todoItems}</ul>`;
}

function renderTodoItem(todo) {
    const todoClass = `todo__item todo__item--${todo.done ? 'done' : 'open'}`;
    return `<li class="${todoClass}">
        <input class="js_toggle_todo" type="checkbox" data-id="${todo.id}"${todo.done ? ' checked' : ''}>
        ${todo.text}
    </li>`;
}

function renderTodoItemFilter(todo,filterRadio) {
    const todoClass = `todo__item todo__item--${todo.done ? 'done' : 'open'}`;
    if(filterRadio == "open" && todo.done	){
		return `<li class="${todoClass}">
			<input class="js_toggle_todo" type="checkbox" data-id="${todo.id}"${todo.done ? ' checked' : ''}>
			${todo.text}
		</li>`;
	} else if(filterRadio == "closed" && !todo.done){
			return `<li class="${todoClass}">
			<input class="js_toggle_todo" type="checkbox" data-id="${todo.id}"${todo.done ? ' checked' : ''}>
			${todo.text}
		</li>`;
	}	
}
