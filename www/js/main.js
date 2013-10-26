var imageList;

//  Data method
function addImage(data) {
	var id = 'img_' + Math.floor(Math.random() * 100000000);
	showImage(id, data);
	imageList.add(id, data, true);
	//hide('loader');
}
function addImageFromBrowse() {
	File.prototype.browseAsDataURL(
		function() {
			//show('loader');
		},
		addImage
	);
}

function addImageFromCamera() {
	//show('loader');
	Image.prototype.getDataFromCamera(addImage);
}

function addImageFromGalery() {
	//show('loader');
	Image.prototype.getDataFromGalery(addImage);
}

function delImage() {
	imageList.del(this.id);
}

//  HTML methods
function showFullImage() {
	
}
function showImage(id, data, showSync) {
	var div_id = 'div_' + id;
	var sync_id = 'sync_' + id;
	var helper_id = 'helper_' + id;
	if (!$(div_id)) {
		var div = add$('list', 'div', div_id);
		div.className = 'preview';

		var span = add$(div, 'span', helper_id);
		span.className = 'helper';

		var span = add$(div, 'span', sync_id);
		span.className = 'sync';
		span.innerHTML = '&nbsp;';

		var img = add$(div, 'img', id);
		img.onclick = showFullImage;
		img.ondblclick = delImage;
	}
	showHide(sync_id, showSync);
	img.src = data;
}

function hideImage(id, data) {
	del$(id);
	del$('helper_' + id);
	del$('sync_' + id);
	del$('div_' + id);
}

function changeImage(id, data) {
	$(id).src = data;
}

function init() {
	show('main');
	imageList = new Data('images');
	imageList.list(showImage, hideImage, changeImage);
}

function load() {
	if (isMobile()) {
		show('camera');
		show('gallery');
		hide('browse');
		document.addEventListener('deviceready', init, false);
	} else {
		hide('camera');
		hide('gallery');
		show('browse');
		init();
	}
}
