const DELAY = 5000;
var carousels = document.getElementsByClassName('carousel');
/*var slideIndex = 0;*/

console.log("coucou");

if (carousels != null) {
	for (var i=0; i<carousels.length; i++) {
		carousels[i].getElementsByClassName('img-fader')[0].style.display = "block";
	}
	setInterval(changeImg, DELAY, carousels);
} else {
	console.log("no carousel");
}

function changeImg(elem) {
	for ( let j=0; j<elem.length; j++ ){
		setTimeout( carouselFading, j*DELAY/4, elem[j] );
	}	
}

function carouselFading(element) {
	let slideIndex = element.attributes["data-index"].value;
	let slides = element.getElementsByClassName('img-fader');
	slideIndex ++;
	if ( slideIndex >= slides.length ) slideIndex = 0;

	for ( let i=0; i<slides.length; i++ ) {
		slides[i].style.display = "none";
	}

	slides[slideIndex].style.display = "block";
	element.attributes["data-index"].value = slideIndex;
}