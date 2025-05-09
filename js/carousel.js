class Carousel {
    constructor(elementId, options = {}) {
        this.carousel = document.getElementById(elementId);
        this.items = Array.from(this.carousel.children);
        this.visibleItems = options.visibleItems || 3;
        this.transitionDuration = options.transitionDuration || 600;
        this.autoPlayInterval = options.autoPlayInterval || 3000;
        this.index = 0;
        this.allowTransition = true;
        this.autoPlayTimer = null;
        this.init();
    }

    init() {
        // Clone first 'visibleItems' for seamless looping
        for (let i = 0; i < this.visibleItems; i++) {
            const clone = this.items[i].cloneNode(true);
            clone.classList.add('clone');
            this.carousel.appendChild(clone);
        }

        this.allItems = Array.from(this.carousel.children);
        this.setActiveClass();
        this.moveCarousel();

        // Start autoplay
        this.startAutoPlay();

        // Handle window resize for responsiveness
        window.addEventListener('resize', () => this.handleResize());
    }

    setActiveClass() {
        this.allItems.forEach(item => item.classList.remove('active'));
        const activeIndex = this.index + Math.floor(this.visibleItems / 2);
        if (this.allItems[activeIndex]) {
            this.allItems[activeIndex].classList.add('active');
        }
    }

    moveCarousel() {
        this.carousel.style.transition = this.allowTransition ? 
            `transform ${this.transitionDuration}ms ease` : 'none';
        const offset = this.index * (100 / this.visibleItems);
        this.carousel.style.transform = `translateX(-${offset}%)`;
        this.setActiveClass();
    }

    nextSlide() {
        this.index++;
        this.allowTransition = true;
        this.moveCarousel();

        // Reset to beginning after reaching cloned slides
        if (this.index === this.items.length) {
            setTimeout(() => {
                this.allowTransition = false;
                this.index = 0;
                this.moveCarousel();
            }, this.transitionDuration);
        }
    }

    startAutoPlay() {
        this.autoPlayTimer = setInterval(() => this.nextSlide(), this.autoPlayInterval);
    }

    handleResize() {
        // Adjust visibleItems based on viewport width
        const width = window.innerWidth;
        if (width <= 480) {
            this.visibleItems = 1;
        } else if (width <= 768) {
            this.visibleItems = 2;
        } else {
            this.visibleItems = 3;
        }
        // Reinitialize carousel with new settings
        this.resetCarousel();
    }

    resetCarousel() {
        clearInterval(this.autoPlayTimer);
        this.carousel.innerHTML = '';
        this.items.forEach(item => this.carousel.appendChild(item));
        this.index = 0;
        this.init();
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Carousel('carousel', {
        visibleItems: 3,
        transitionDuration: 600,
        autoPlayInterval: 3000
    });
});
