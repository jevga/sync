function Image() {
}

//  Constants
Image.prototype.params = {
	quality: 50
//	destinationType: Camera.DestinationType.DATA_URL,  //  DATA_URL, FILE_URI
//	sourceType: pictureSource.SAVEDPHOTOALBUM  //  PHOTOLIBRARY, CAMERA, PHOTOLIBRARY
};

//  Methods
Image.prototype.onSuccess = function(msg) {
	alert(msg);
}

Image.prototype.onFail = function(msg) {
	alert(msg);
}

Image.prototype.getPicture = function(params, onSuccess, onFail) {
	params = params ? params : {};
	params.quality = params.quality ? params.quality : Image.prototype.params.quality;

	navigator.camera.getPicture(
		function(data) {
			if (params.destinationType == Camera.DestinationType.DATA_URL) {
				data = 'data:image/jpeg;base64,' + data;
			}
			if (onSuccess) {
				onSuccess(data);
			} else {
				Image.prototype.onSuccess(data);
			}
		}
		onFail ? onFail : Image.prototype.onFail,
		params
	); 
}

Image.prototype.getDataFromCamera = function(onSuccess, onFail) {
	var params = {
		quality: Image.prototype.params.quality,
		destinationType: Camera.DestinationType.FILE_URI,
		sourceType: Camera.PictureSourceType.CAMERA
	};
	Image.prototype.getPicture(params, onSuccess, onFail);
}

Image.prototype.getDataFromGalery = function(onSuccess, onFail) {
	var params = {
		quality: Image.prototype.params.quality,
		destinationType: Camera.DestinationType.FILE_URI,
		sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM
	};
	Image.prototype.getPicture(params, onSuccess, onFail);
}
