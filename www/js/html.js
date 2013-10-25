/*  DOM methods  */
function $(id) {
	return typeof id == 'string' ? document.getElementById(id) : id;
}

function add$(container, nodeName, id) {
	container = typeof container == 'string' ? $(container) : container;

	var el = document.createElement(nodeName);
	if (id) el.id = id;
	container.appendChild(el);
	return el;
}

function del$(id) {
	id = typeof id == 'string' ? $(id) : id;

	id.parentNode.removeChild(id);
}

function replace$(oldEl, newEl) {
	oldEl.parentNode.insertBefore(newEl, oldEl)
	oldEl.parentNode.removeChild(oldEl);
}

/*  Show/hide methods  */
function toogle(id, className) {
	var el = $(id);
	el.className = el.className == className ? className + ' hide' : className;
}

function show(id) {
	showHide(id, true);
}

function hide(id) {
	showHide(id, false);
}

function showHide(id, on) {
	var el = $(id);
	el.className = el.className.replace('hide', '').replace(/\s+/, '');
	if (!on) {
		el.className += ' hide';
	}
}

function hideLater(id) {
	clearTimeout(timeoutElement[id]);
	timeoutElement[id] = setTimeout(function() { hide(id); }, 2000);
}

function showShort(id) {
	show(id);
	hideLater(id);
}
