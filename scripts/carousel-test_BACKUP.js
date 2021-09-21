const DELAY = 3000;
var carousels = document.getElementsByClassName('carousel');

if (carousels != null) {
	var timeFuncs = [];
	var startFuncs = [];
	for (let j=0; j<carousels.length; j++) {
		let newtime = setTimeout( function(){ 
			timeFuncs.push(setInterval(carouselFading, DELAY, carousels[j], undefined, j))
		}, j*DELAY/4) ;
		startFuncs.push({id:newtime, started:false});
	}

	//clearTimeout(startFuncs[2].id);
}

function carouselFading(element, slideIndex, elemIndex) {
	if (slideIndex === undefined) slideIndex = 1 + parseInt(element.attributes["data-index"].value);
	let slides = element.getElementsByClassName('img-fader');
	if ( slideIndex >= slides.length ) slideIndex = 0;

	if (elemIndex !== undefined) {
		if (!startFuncs[elemIndex].started) {
			clearTimeout(startFuncs[elemIndex].id);
			startFuncs[elemIndex].started = true;
		}
	}


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

	if ( startFuncs[i].started ) clearInterval(timeFuncs[i]);
	else {
		clearTimeout(startFuncs[i].id);
		startFuncs[i].started = true;
	}
	
	carouselFading(carousels[i], index);
	timeFuncs[i] = setInterval(carouselFading, DELAY, carousels[i]);
}