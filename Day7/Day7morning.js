var n_button = document.getElementById("name-btn");
var i_button = document.getElementById("image-btn");
var c_button = document.getElementById("color-btn");
var change_color = document.getElementById("color-div");
var lightbox = document.getElementById("lightbox");
var firstname = document.getElementById("first");
var lastname = document.getElementById("last");


function getFormValues() {
	console.log( firstname.value + " " + lastname.value );
}

n_button.onclick = function() {
	getFormValues();
};

function changeColor() {
	change_color.classList.add('changeColor');
}

c_button.onclick = function() {
	changeColor();
};

function toggleImage() {
	document.getElementById("lightbox").classList.add("isVisible");
	document.getElementById("lightbox").classList.add("lightbox-bg");
}

i_button.onclick = function() {
	toggleImage();
};

lightbox.onclick = function() {
	document.getElementById("lightbox").classList.remove("isVisible");
	document.getElementById("lightbox").classList.remove("lightbox-bg");
};