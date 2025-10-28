//updatae ofline vs online
function updateStatus() {
  const statusIndicator = document.getElementById('status-indicator');

  if (navigator.onLine) {
    statusIndicator.classList.remove('offline');
    statusIndicator.classList.add('online');
  } else {
    statusIndicator.classList.remove('online');
    statusIndicator.classList.add('offline');
  }
}

updateStatus();

window.addEventListener('online', updateStatus);
window.addEventListener('offline', updateStatus);

///burger menu

const burger = document.getElementById('burger');
const burgerIcon = document.getElementById('burgerIcon');

const staticMenu = document.getElementById('menuWindow');
const popupMenu = staticMenu.cloneNode(true);
popupMenu.classList.add('popup');
document.body.appendChild(popupMenu);

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  popupMenu.classList.toggle('active');

  if (burger.classList.contains('active')) {
    burgerIcon.src = "assets/images/ui/close.png";
  } else {
    burgerIcon.src = "assets/images/ui/burger-menu.png";
  }
});


//more services

document.querySelectorAll('.service-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    this.parentElement.classList.toggle('active');
  });
});


//towns-slider
const track = document.querySelector('.quiz-town-connetn');
const prev = document.querySelector('.arrow-left');
const next = document.querySelector('.quiz-arrow-right');

const totalItems = track.children.length;
const visibleItems = 8; 
const itemsPerRow = 4;
let currentIndex = 0;

function updateSlider() {

  const rowsToMove = Math.floor(currentIndex / itemsPerRow);
  const itemHeight = track.children[0].offsetHeight + 10; 
  const rowOffset = rowsToMove * itemHeight;
  track.style.transform = `translateY(-${rowOffset}px)`;
}

prev.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex -= itemsPerRow; 
    if (currentIndex < 0) currentIndex = 0;
    updateSlider();
  }
});

next.addEventListener('click', () => {
  if (currentIndex < totalItems - visibleItems) {
    currentIndex += itemsPerRow; 
    updateSlider();
  }
});


