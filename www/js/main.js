var imageList;

//  Data method
function addImage(data) {
	alert(data.length);
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
	Image.prototyle.getDataFromCamera(addImage);
}

function addImageFromGalery() {
	show('loader');
	Image.prototyle.getDataFromGalery(addImage);
}

function delImage() {
	imageList.del(this.id);
}

//  HTML methods
function showImage(id, data) {
	var img = add$('list', 'img', id);
	img.className = 'preview';
	img.src = data;
	img.onclick = delImage;
}

function hideImage(id, data) {
	del$(id);
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
	document.addEventListener('deviceready', init, false);
}
