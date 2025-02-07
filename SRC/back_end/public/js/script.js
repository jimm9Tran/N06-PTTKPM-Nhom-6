// Show Alert

const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = document.querySelector("[close-alert]");
    
    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time);
    
    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    });
}

// End Show Alert

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const scrollThreshold = 50;

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled-header');
        } else {
            header.classList.remove('scrolled-header');
        }
    });
});


function scrollCarousel(direction) {
    const carousel = document.getElementById('carousel');
    const scrollAmount = 400; // Adjust the scroll amount as needed
    carousel.scrollBy({
        left: direction * scrollAmount, // Scroll left or right based on direction
        behavior: 'smooth' // Smooth scrolling
    });
}