var canvas;
var context;
var image;

function imageHeight() {
	return image.height;
}

function imageWidth() {
	return image.width;
}

function getPage(url,execute)
{
	if (window.XMLHttpRequest)
	{
		xmlhttp=new XMLHttpRequest();

		xmlhttp.open("GET",url,false);
		xmlhttp.send(null);
		if (xmlhttp.responseText != null)
		{
			if(execute) { 
				return eval('(' + xmlhttp.responseText + ')'); 
			} else {
				return xmlhttp.responseText
			}
		} 
	}
	return -1;
}

function saveImage() {
	var http = new XMLHttpRequest();
	var url = "/app/Picture/save";
	var params = "image_content=" + escape(canvas.toDataURL());
	http.open("POST", url, true);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	http.onreadystatechange = function() {//Call a function when the state changes.
		if(http.readyState == 4 && http.status == 200) {
			alert("Image saved");
		}
	}
	http.send(params);
}

function swirl() {
	var width = context.canvas.width;
	var height = context.canvas.height;
	var imgd = context.getImageData(0, 0, width, height);
	var pix = imgd.data;
	var origimgd = context.getImageData(0, 0, width, height);
	var origpix= origimgd.data;
	var x,y,i;
	var fDegree = 0.02;
	var newX, newY;

	var imgHeight = imageHeight();
	var imgWidth = imageWidth();
	var midx = imgWidth/2;
	var midy = imgHeight/2;

	for( y = 0; y < imgHeight; y++) {
		for(x = 0; x < imgWidth; x++) {

			i = (y * width * 4) + (x *4); // *4 for 4 ints per pixel
			trueX = x - midx;
			trueY = y - midy;
			theta = Math.atan2((trueY),(trueX));

			radius = Math.sqrt(trueX*trueX + trueY*trueY);

			newX = midx + (radius * Math.cos(theta + fDegree * radius));
			newX = Math.round(newX);
			if (newX < 0 || newX >= imgWidth) {
				newX = x;
			}
			newY = midy + (radius * Math.sin(theta + fDegree * radius));
			newY = Math.round(newY);
			if (newY < 0 || newY >= imgHeight) {
				newY = y;
			}

			newI = (newY * width * 4) + (newX *4);

			pix[newI  ] = origpix[i];
			pix[newI+1] = origpix[i+1];
			pix[newI+2] = origpix[i+2];
			pix[newI+3] = origpix[i+3];
		}
	}
	context.putImageData(imgd, 0, 0);

}


function wave() {
	var width = context.canvas.width;
	var height = context.canvas.height;
	var imgd = context.getImageData(0, 0, width, height);
	var pix = imgd.data;
	var origimgd = context.getImageData(0, 0, width, height);
	var origpix= origimgd.data;
	var x,y,i;
	var newX, newY;
	var xo,yo;
	var nWave = 10.0;
	var imgHeight = imageHeight();
	var imgWidth = imageWidth();


	for( y = 0; y < imgHeight; y++) {
		for(x = 0; x < imgWidth; x++) {

			i = (y * width * 4) + (x *4); // *4 for 4 ints per pixel
			xo = (nWave * Math.sin(2.0 * 3.1415 * y / 128.0));
			yo = (nWave * Math.cos(2.0 * 3.1415 * x / 128.0));

			newX = (x + xo);
			newY = (y + yo);

			newX = Math.round(newX);
			if (newX < 0 || newX >= imgWidth) {
				newX = 0;
			}
			newY = Math.round(newY);
			if (newY < 0 || newY >= imgHeight) {
				newY = 0;
			}


			newI = (newY * width * 4) + (newX *4);

			pix[newI  ] = origpix[i];
			pix[newI+1] = origpix[i+1];
			pix[newI+2] = origpix[i+2];
			pix[newI+3] = origpix[i+3];
		}
	}
	context.putImageData(imgd, 0, 0);

}

function freshpaint() {
	var width = context.canvas.width;
	var height = context.canvas.height;
	var imgd = context.getImageData(0, 0, width, height);
	var pix = imgd.data;
	var origimgd = context.getImageData(0, 0, width, height);
	var origpix= origimgd.data;
	var x,y,i;
	var newX, newY;
	var nDegree = 10.0;
	var nHalf = Math.floor(nDegree/2);
	var imgHeight = imageHeight();
	var imgWidth = imageWidth();


	for( y = 0; y < imgHeight; y++) {
		for(x = 0; x < imgWidth; x++) {

			i = (y * width * 4) + (x *4); // *4 for 4 ints per pixel
			newX = x - (Math.random() * nDegree - nHalf);
			newY = y - (Math.random() * nDegree - nHalf);

			newX = Math.floor(newX);
			if (newX < 0 || newX >= imgWidth) {
				newX = 0;
			}
			newY = Math.floor(newY);
			if (newY < 0 || newY >= imgHeight) {
				newY = 0;
			}


			newI = (newY * width * 4) + (newX *4);

			pix[newI  ] = origpix[i];
			pix[newI+1] = origpix[i+1];
			pix[newI+2] = origpix[i+2];
			pix[newI+3] = origpix[i+3];
		}
	}
	context.putImageData(imgd, 0, 0);

}


function greyScale() {
	var width = context.canvas.width;
	var height = context.canvas.height;
	var imgd = context.getImageData(0, 0, width, height);
	var pix = imgd.data;
	var x;
	var y;
	var i;

	for( y = 0; y < height; y++) {
		i = (y * width * 4); // *4 for 4 ints per pixel
		for(x = 0; x < width; x++) {
			var grayscale = pix[i  ] * .3 + pix[i+1] * .59 + pix[i+2] * .11;
			pix[i++] = grayscale;   // red
			pix[i++] = grayscale;   // green
			pix[i++] = grayscale;   // blue
			i++;
		}

	}
	context.putImageData(imgd, 0, 0);
}

function invert() {
	var imgd = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
	var pix = imgd.data;

	for (var i = 0, n = pix.length; i < n; i += 4) {
		var grayscale = 
		pix[i  ] = 255 - pix[i  ];   // red
		pix[i+1] = 255 - pix[i+1];   // green
		pix[i+2] = 255 - pix[i+2];   // blue
		// alpha
	}
	context.putImageData(imgd, 0, 0);
}


function clear() {
	var imgd = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
	var pix = imgd.data;

	for (var i = 0, n = pix.length; i < n; i += 4) {
		pix[i  ] = 255;   // red
		pix[i+1] = 255;   // green
		pix[i+2] = 255;   // blue
		// alpha
	}
	context.putImageData(imgd, 0, 0);
}

function blank() {
	var imgd = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
	var pix = imgd.data;

	for (var i = 0, n = pix.length; i < n; i += 4) {
		pix[i  ] = 0;   // red
		pix[i+1] = 0;   // green
		pix[i+2] = 0;   // blue
		// alpha
	}
	context.putImageData(imgd, 0, 0);
}

function reload() {
	canvas = document.getElementById("area");
	context = canvas.getContext("2d");

	clear();
	canvas.width = imageWidth();
	canvas.height = imageHeight();
	setTimeout("context.drawImage(image, 0, 0);", 100);
}

function show_image(image_uri) {

	image = new Image();
	image.onload = reload;
	image.src = image_uri;
}

window.onload = function() {

	document.body.addEventListener('touchmove',function(event){
		event.preventDefault();
		},false);

		image = new Image();
		image.onload = reload;
		image.src = getPage('/app/Picture/imguri');

	};

