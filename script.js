function toggleMenu() {
   const navbar = document.querySelector('.navbar');
   const mobileNavLinks = document.querySelector('.mobile-nav-links');
   mobileNavLinks.classList.toggle('active');
   navbar.classList.toggle('active');
}

let currentIndex = 0;
let startX = 0;
let currentX = 0;
let isDragging = false;

const carouselInner = document.querySelector('.carousel-inner');
const carousel = document.getElementById('carousel');

function enableCarousel() {
    carousel.addEventListener('mousedown', startDrag);
    carousel.addEventListener('mousemove', duringDrag);
    carousel.addEventListener('mouseup', endDrag);
    carousel.addEventListener('mouseleave', endDrag);
    carousel.addEventListener('touchstart', startDrag);
    carousel.addEventListener('touchmove', duringDrag);
    carousel.addEventListener('touchend', endDrag);
}

function disableCarousel() {
    carousel.removeEventListener('mousedown', startDrag);
    carousel.removeEventListener('mousemove', duringDrag);
    carousel.removeEventListener('mouseup', endDrag);
    carousel.removeEventListener('mouseleave', endDrag);
    carousel.removeEventListener('touchstart', startDrag);
    carousel.removeEventListener('touchmove', duringDrag);
    carousel.removeEventListener('touchend', endDrag);
}

function startDrag(event) {
    isDragging = true;
    startX = event.pageX || event.touches[0].pageX;
    carouselInner.style.transition = 'none';
}

function duringDrag(event) {
    if (!isDragging) return;
    currentX = event.pageX || event.touches[0].pageX;
    const deltaX = currentX - startX;
    const offset = -currentIndex * 100 + (deltaX / carousel.offsetWidth) * 100;
    carouselInner.style.transform = `translateX(${offset}%)`;
}

function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    const deltaX = currentX - startX;
    if (deltaX > 50) {
        prevSlide();
    } else if (deltaX < -50) {
        nextSlide();
    } else {
        showSlide(currentIndex);
    }
    carouselInner.style.transition = 'transform 0.5s ease-in-out';
}

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    if (index >= slides.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = slides.length - 1;
    } else {
        currentIndex = index;
    }
    const offset = -currentIndex * 100;
    carouselInner.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

// Check screen width and enable/disable carousel
function checkScreenWidth() {
    if (window.innerWidth < 768) {
        enableCarousel();
    } else {
        disableCarousel();
    }
}

// Initial check
checkScreenWidth();

// Add event listener to check screen width on resize
window.addEventListener('resize', checkScreenWidth);

// ---------------------------- for work section
let workCurrentIndex = 0;
const workCarouselInner = document.querySelector('.work-carousel-inner');
const carouselItems = document.querySelectorAll('.work-carousel-item');
const categories = document.querySelectorAll('.category');

function filterWorks(category) {
    carouselItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    // Reset to the first slide after filtering
    workCurrentIndex = 0;
    showSlide(workCurrentIndex);
}

categories.forEach(category => {
    category.addEventListener('click', (event) => {
        categories.forEach(cat => cat.classList.remove('active'));
        event.target.classList.add('active');
        const selectedCategory = event.target.getAttribute('data-category');
        filterWorks(selectedCategory);
    });
});

// Initial setup
filterWorks('all');

// ---------------------------------- FOR FADE IN FROM BELOW
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animation-zoom'); 
        return;
      }
      entry.target.classList.remove('animation-zoom'); 
    });
  });

  const squares = document.querySelectorAll('.zoom');

  squares.forEach((element) => observer.observe(element));

//---------------------------------- FOR BOUNCE ANIMATION FROM LEFT
const bounceAnimation = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('bounce-left');
        return;
      }
      entry.target.classList.remove('bounce-left');
    });
  });

  const bounce = document.querySelectorAll('.bounce');

  bounce.forEach((element) => bounceAnimation.observe(element));

//---------------------------------- FOR SCALE UP FROM CENTER
const observer1 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scale-up'); 
        return;
      }
      entry.target.classList.remove('scale-up'); 
    });
  });

  const squares1 = document.querySelectorAll('.scale');

  squares1.forEach((element) => observer1.observe(element));

//
const backToTopButton = document.querySelector('.back-to-top');

// Function to show/hide the button based on scroll position
function toggleButton() {
  if (window.pageYOffset > 200) { // Show the button when scrolled down more than 200px
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
}

// Add an event listener to call the toggleButton function on scroll
window.addEventListener('scroll', toggleButton);

// Add an event listener to scroll to the top when the button is clicked
backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Smooth scrolling
  });
});