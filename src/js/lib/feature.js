export function isEnabled(name) {
    return window.location.hash.split('#').includes(name);
}

export function filterArrayOpen(todos){
	return !todos.done ;
}

export function filterArrayClosed(todos){
	return todos.done ;
}
