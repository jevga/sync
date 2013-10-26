/*
if (typeof Camera == 'undefined') {
	Camera = {};
	Camera.DestinationType = {
		DATA_URL : 0,                // Return image as base64 encoded string
		FILE_URI : 1                 // Return image file URI
	};
	Camera.PictureSourceType = {
		PHOTOLIBRARY : 0,
		CAMERA : 1,
		SAVEDPHOTOALBUM : 2
	};
	Camera.EncodingType = {
		JPEG : 0,               // Return JPEG encoded image
		PNG : 1                 // Return PNG encoded image
	};
	Camera.MediaType = { 
		PICTURE: 0,             // allow selection of still pictures only. DEFAULT. Will return format specified via DestinationType
		VIDEO: 1,               // allow selection of video only, WILL ALWAYS RETURN FILE_URI
		ALLMEDIA : 2            // allow selection from all media types
	}
	navigator.camera = {};
	navigator.camera.getPicture = function(onSuccess, onFail, params) {
	}
}
*/
function Image() {
}

//  Constants
Image.prototype.params = {
	quality: 50
//	destinationType: Camera.DestinationType.DATA_URL,  //  DATA_URL, FILE_URI
//	sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM  //  PHOTOLIBRARY, CAMERA, PHOTOLIBRARY
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
		},
		onFail ? onFail : Image.prototype.onFail,
		params
	); 
}

Image.prototype.getDataFromCamera = function(onSuccess, onFail) {
debugger;
	var params = {
		quality: Image.prototype.params.quality,
		destinationType: Camera.DestinationType.FILE_URI,
		sourceType: Camera.PictureSourceType.CAMERA
	};
	Image.prototype.getPicture(params, onSuccess, onFail);
}

Image.prototype.getDataFromGalery = function(onSuccess, onFail) {
debugger;
	var params = {
		quality: Image.prototype.params.quality,
		destinationType: Camera.DestinationType.FILE_URI,
		sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM
	};
	Image.prototype.getPicture(params, onSuccess, onFail);
}
