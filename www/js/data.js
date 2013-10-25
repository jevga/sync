/*  Data  */
/*
path: {
	id1: data1,
	id2: data2,
}
*/
function Data(path) {
	this.path = path;
}

//  Constants
Data.prototype.ref = 'https://jevga.firebaseIO.com/';

//  Methods
Data.prototype.Firebase = function(id) {
	id = id ? id : '';

	return new Firebase(Data.prototype.ref + this.path + '/' + id);
}
Data.prototype.add = function(id, data) {
	var _data = this.Firebase(id);

	_data.set(data);
}

Data.prototype.del = function(id) {
	var _data = this.Firebase(id);

	_data.remove();
}

Data.prototype.list = function(onAdd, onDel, onChange) {
	var _list = this.Firebase();

	_list.on('child_added', function (snap) {
		if (onAdd) onAdd(snap.name(), snap.val());
	});
	_list.on('child_removed', function (snap) {
		if (onDel) onDel(snap.name(), snap.val());
	});
	_list.on('child_changed', function (snap) {
		if (onChange) onChange(snap.name(), snap.val());
	});
}
