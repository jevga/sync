var imageList;

//  Data method
function addImage(data) {
	var id = 'img_' + Math.floor(Math.random() * 100000000);
	imageList.add(id, data);
	hide('loader');
}
function addImageFromBrowse() {
	File.prototype.browseAsDataURL(
		function() {
			show('loader');
		},
		addImage
	);
}

function addImageFromCamera() {
	show('loader');
	Image.prototype.getDataFromCamera(addImage);
}

function addImageFromGalery() {
	show('loader');
	Image.prototype.getDataFromGalery(addImage);
}

function delImage() {
	imageList.del(this.id);
}

//  HTML methods
function showFullImage() {
	
}
function showImage(id, data) {
	var div = add$('list', 'div', 'div_' + id);
	div.className = 'preview';

	var span = add$(div, 'span', 'span_' + id);
	span.className = 'helper';
	
	var img = add$(div, 'img', id);
	img.src = data;
	img.onclick = showFullImage;
	img.ondblclick = delImage;
}

function hideImage(id, data) {
	del$(id);
	del$('span_' + id);
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
