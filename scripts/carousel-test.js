const DELAY = 3000;
var carousels = document.getElementsByClassName('carousel');

if (carousels != null) {
	var timeFuncs = [];
	var startFuncs = [];
	for (let j=0; j<carousels.length; j++) {
		timeFuncs.push( {timer:setTimeout( function(){
			timeFuncs[j].timer = setInterval(carouselFading, DELAY, carousels[j]);
			timeFuncs[j].started = true;
			}, j*DELAY/4), started: false} );
	}
}

function carouselFading(element, slideIndex) {
	if (slideIndex === undefined) slideIndex = 1 + parseInt(element.attributes["data-index"].value);
	let slides = element.getElementsByClassName('img-fader');
	if ( slideIndex >= slides.length ) slideIndex = 0;

	for ( let i=0; i<slides.length; i++ ) {
		slides[i].style.transform = "translate3d(0, " + (-slideIndex) * 100 + "%, 0)"
	}

	element.attributes["data-index"].value = slideIndex;

	let dots = element.parentNode.getElementsByClassName("dot");
	for ( let i=0; i<dots.length; i++ ) {
		if ( i==slideIndex ) dots[i].classList.add("active");
		else dots[i].classList.remove('active');
	}
}

function dotClick(index, elem) {
	/* Je comprends même pas cette ligne lol (merci StackOverflow) */
	let nodes = Array.prototype.slice.call( carousels );
	let i = nodes.indexOf(elem.parentNode.parentNode);

	if ( timeFuncs[i].started ) clearInterval(timeFuncs[i].timer);
	else {
		clearTimeout(timeFuncs[i].timer);
		timeFuncs[i].started = true;
	}
	
	carouselFading(carousels[i], index);
	timeFuncs[i].timer = setInterval(carouselFading, DELAY, carousels[i]);
}