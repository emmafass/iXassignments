var header = document.querySelectorAll('header')[0];
var button = document.getElementById("toggle");
var shadow = document.querySelectorAll(".shadow")[0];

button.onclick = function() {
  header.classList.add('is-visible');
  shadow.classList.add('is-visible');
};

var closeMenu = function() {
  header.classList.remove('is-visible');
  shadow.classList.remove('is-visible');
};

shadow.onclick = function() {
  closeMenu();
};

document.body.onkeydown = function(event) {
  if(event.keyCode === 27) {
    closeMenu();
  }
};
