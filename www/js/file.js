function File() {
}

//  Constants
File.prototype.upload = { form: 'formFile', input: 'inputFile' };

//  Methods
File.prototype.readAsDataURL = function(file, onRead) {
	if (file) {
		var reader = new FileReader();

		reader.onload = function (e) {
			var data = e.target.result;
			if (onRead) onRead(data);
		}

		reader.readAsDataURL(file);
	}
}

File.prototype.browse = function(onBrowse, onOpen, onCancel) {
	var form = $(File.prototype.upload.form);
	if (!form) {
		form = add$(document.body, 'form', File.prototype.upload.form);
		hide(form);
	}

	var file = $(File.prototype.upload.input);
	if (!file) {
		file = add$(form, 'input', File.prototype.upload.input);
		file.type = 'file';

		file.onchange = function(e) {
			onBrowse();
			var f = e.target.files ? e.target.files[0] : undefined;
			var ret = typeof f != 'undefined' ? onOpen(f) : onCancel();
			del$(file);
		}
	}

	file.click();
}

File.prototype.browseAsDataURL = function(onBrowse, onOpen, onCancel) {
	File.prototype.browse(
		onBrowse,
		function(file) {
			File.prototype.readAsDataURL(file, onOpen);
		},
		onCancel
	);
}
