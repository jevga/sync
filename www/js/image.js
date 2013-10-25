function Image() {
}

//  Constants
Image.prototype.params = {
	quality: 100
//	destinationType: Camera.DestinationType.DATA_URL,  //  DATA_URL, FILE_URL
//	sourceType: pictureSource.SAVEDPHOTOALBUM  //  PHOTOLIBRARY, CAMERA, PHOTOLIBRARY
};

//  Methods
Image.prototype.onSuccess = function(msg) {
	alert(msg);
}

Image.prototype.onFail = function(msg) {
	alert(msg);
}

Image.prototype.get = function(params, onSuccess, onFail) {
	params = params ? params : {};
	params.quality = params.quality ? params.quality : Image.prototype.params.quality;

	navigator.camera.getPicture(
		onSuccess ? onSuccess : Image.prototype.onSuccess,
		onFail ? onFail : Image.prototype.onFail,
		params
	); 
}

Image.prototype.getDataFromCamera = function(onSuccess, onFail) {
	var params = {
		quality: Image.prototype.params.quality,
		destinationType: Camera.DestinationType.DATA_URI,
		sourceType: pictureSource.CAMERA
	};
	Image.prototype.getPhoto(
		params,
		function(data) {
			var data = 'data:image/jpeg;base64,' + data;
			onSuccess(data);
		},
		onFail
	);
}

Image.prototype.getDataFromGalery = function(onSuccess, onFail) {
	var params = {
		quality: Image.prototype.params.quality,
		destinationType: Camera.DestinationType.DATA_URI,
		sourceType: pictureSource.SAVEDPHOTOALBUM
	};
	Image.prototype.getPhoto(
		params,
		function(data) {
			var data = 'data:image/jpeg;base64,' + data;
			onSuccess(data);
		},
		onFail
	);
}
