import {isEnabled,filterArray} from './lib/feature';

export function render(el, state) {
	const todoListOpen = filterArray(state.todos,"open");
	const todoListClosed = filterArray(state.todos,"closed");
	el.innerHTML = renderApp(
		renderInput(),
		renderTodos(todoListOpen.map(renderTodoItem).join(''),todoListClosed.map(renderTodoItem).join('')),
		state
	);	
}

function renderApp(input, todoList, state) {
	if(isEnabled('renderBottom') && !isEnabled('filter')) {
		return renderAddTodoAtBottom(input, todoList);
	}else if(!isEnabled('renderBottom') && isEnabled('filter')){
		if(state.filterOption == "all" || state.filterOption === undefined){
			const todoListOpen = filterArray(state.todos,"open");
			const todoListClosed = filterArray(state.todos,"closed");
			return renderAddTodoAtTopRadio(input, renderTodos(todoListOpen.map(renderTodoItem).join(''),todoListClosed.map(renderTodoItem).join('')), renderRadio(state.filterOption));
		}else{
			todoList = filterArray(state.todos,state.filterOption);
			return renderAddTodoAtTopRadio(input, renderTodos(todoList.map(renderTodoItem).join('')), renderRadio(state.filterOption));
		}
	}else if(isEnabled('renderBottom') && isEnabled('filter') && !isEnabled('filterTop')){
		if(state.filterOption == "all" || state.filterOption === undefined){
			const todoListOpen = filterArray(state.todos,"open");
			const todoListClosed = filterArray(state.todos,"closed");
			return renderAddTodoAtBottomRadio(input, renderTodos(todoListOpen.map(renderTodoItem).join(''),todoListClosed.map(renderTodoItem).join('')), renderRadio(state.filterOption));
		}else{
			todoList = filterArray(state.todos,state.filterOption);
			return renderAddTodoAtBottomRadio(input, renderTodos(todoList.map(renderTodoItem).join('')), renderRadio(state.filterOption));
		}
	}else if(isEnabled('renderBottom') && isEnabled('filter') && isEnabled('filterTop')){
		if(state.filterOption == "all" || state.filterOption === undefined){
			const todoListOpen = filterArray(state.todos,"open");
			const todoListClosed = filterArray(state.todos,"closed");
			return renderFilterTop(input, renderTodos(todoListOpen.map(renderTodoItem).join(''),todoListClosed.map(renderTodoItem).join('')), renderRadio(state.filterOption));
		}else{
			todoList = filterArray(state.todos,state.filterOption);
			return renderFilterTop(input, renderTodos(todoList.map(renderTodoItem).join('')), renderRadio(state.filterOption));
		}
	}else {
		return renderAddTodoAtTop(input, todoList);
	}
}

function renderAddTodoAtTop(input, todoList) {
    return `<div id="app">
		<h1>To do list</h1>
        ${input}
        ${todoList}
    </div>`;
}

function renderAddTodoAtBottom(input, todoList) {
    return `<div id="app">
		<h1>To do list</h1>
        ${todoList}
        ${input}
    </div>`;
}

function renderAddTodoAtTopRadio(input, todoList, radio){
	return `<div id="app">
		<h1>To do list</h1>
		${input}
		${radio}
        ${todoList}
    </div>`;
}

function renderAddTodoAtBottomRadio(input, todoList, radio){
	return `<div id="app">
		<h1>To do list</h1>
        ${todoList}
        ${input}
        ${radio}
    </div>`;
}

function renderFilterTop(input, todoList, radio){
	return `<div id="app">
		<h1>To do list</h1>
        ${radio}        
        ${todoList}
        ${input}
    </div>`;
}

function renderInput() {
    return `<div class="todo__input">
				<button id="addTodo">+</button>	<input type="text" id="todoInput" placeholder="Add a task" >
			</div>`;
}

function renderRadio(option) {
    return `<div class="todo__filter">
				<input type="radio" id="r1" name="filterStatus" value="all" ${option=="all" || option===undefined ? ' checked' : ''} ><label for="r1">All</label>
				<input type="radio" id="r2" name="filterStatus" value="open" ${option=="open" ? ' checked' : ''}><label for="r2">Open</label>
				<input type="radio" id="r3" name="filterStatus" value="closed" ${option=="closed" ? ' checked' : ''}><label for="r3">Closed</label>
			</div>`;
}

function renderTodos(todoItemsOpen = "", todoItemsClosed = "") {
	if(todoItemsClosed != ""){
		return `<ul class="todo">${todoItemsOpen}</ul>
				<hr><button id="removeTodo">Clean all removed tasks</button>
				<ul class="todo">${todoItemsClosed}</ul>
				`;
	}else{
		return `<ul class="todo">${todoItemsOpen}</ul>`;
	}
}

function renderTodoItem(todo) {
    const todoClass = `todo__item todo__item--${todo.done ? 'done' : 'open'}`;
    return `<li class="todo__item_li">
        
        <input class="js_toggle_todo" type="checkbox" id="${todo.id}" data-id="${todo.id}"${todo.done ? ' checked' : ''}>
        <label for="${todo.id}"><a class="todo_text ${todoClass}">${todo.text}</a></label>
    </li>`;
}
