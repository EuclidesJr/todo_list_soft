
export function toggleTodoState(id) {
    return {
        type: 'TODO_TOGGLE_DONE',
        id
    };
}

export function addTodo(text) {
	return {
		type: 'ADD_TODO',
		text
	}
}

export function showFiltered(text) {
	if(text == "open"){
		return {
			type: 'SHOW_OPEN',
			text
		}
	}
	if(text == "closed"){
		return {
			type: 'SHOW_CLOSED',
			text
		}
	}
	if(text == "all"){
		return {
			type: 'SHOW_ALL',
			text
		}
	}
}
