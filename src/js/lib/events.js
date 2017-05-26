export function listen(eventName, selector, handler) {
	document.body.addEventListener(eventName, event => {
		if(event.target.matches(selector)) {
			return handler(event);
		} 
        
        if(event.which == 13){
			return handler(event);
		}
	});
}
