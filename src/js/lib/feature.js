export function isEnabled(name) {
    return window.location.hash.split('#').includes(name);
}


export function filterArray(todos,filterOption){
	if(filterOption == "open"){
		return todos.filter( filterArrayOpen );
	} else if(filterOption == "closed"){
		return todos.filter( filterArrayClosed );
	} else {
		return todos;
	}
}

function filterArrayOpen(todos){
	return !todos.done ;
}

function filterArrayClosed(todos){
	return todos.done ;
}
