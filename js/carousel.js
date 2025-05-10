class Carousel {
    constructor(elementId, options = {}) {
        this.carousel = document.getElementById(elementId);
        if (!this.carousel) return;

        this.items = Array.from(this.carousel.children);
        this.visibleItems = options.visibleItems || 3;
        this.transitionDuration = options.transitionDuration || 600;
        this.autoPlayInterval = options.autoPlayInterval || 3000;
        this.index = 0;
        this.allowTransition = true;
        this.autoPlayTimer = null;
        this.touchStartX = 0;
        this.touchEndX = 0;

        this.init();
    }

    init() {
        if (this.items.length === 0) return;

        // Clone items for infinite scroll
        for (let i = 0; i < this.visibleItems; i++) {
            const clone = this.items[i].cloneNode(true);
            clone.classList.add('clone');
            clone.setAttribute('aria-hidden', 'true');
            this.carousel.appendChild(clone);
        }

        this.allItems = Array.from(this.carousel.children);
        this.setupEventListeners();
        this.setActiveClass();
        this.moveCarousel();
        this.startAutoPlay();

        // Store instance reference
        this.carousel.carouselInstance = this;
    }

    setupEventListeners() {
        // Touch events for mobile
        this.carousel.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
            this.stopAutoPlay();
        }, { passive: true });

        this.carousel.addEventListener('touchmove', (e) => {
            this.touchEndX = e.touches[0].clientX;
        }, { passive: true });

        this.carousel.addEventListener('touchend', () => {
            const diff = this.touchStartX - this.touchEndX;
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) this.nextSlide();
                else this.previousSlide();
            }
            this.startAutoPlay();
        });

        // Mouse events
        this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());

        // Keyboard navigation
        this.carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }

    setActiveClass() {
        this.allItems.forEach(item => {
            item.classList.remove('active');
            item.setAttribute('aria-hidden', 'true');
        });
        
        const activeIndex = this.index + Math.floor(this.visibleItems / 2);
        if (this.allItems[activeIndex]) {
            this.allItems[activeIndex].classList.add('active');
            this.allItems[activeIndex].setAttribute('aria-hidden', 'false');
        }
    }

    moveCarousel() {
        if (!this.carousel) return;

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

        if (this.index === this.items.length) {
            setTimeout(() => {
                this.allowTransition = false;
                this.index = 0;
                this.moveCarousel();
            }, this.transitionDuration);
        }
    }

    previousSlide() {
        if (this.index === 0) {
            this.index = this.items.length;
            this.allowTransition = false;
            this.moveCarousel();
            
            setTimeout(() => {
                this.allowTransition = true;
                this.index--;
                this.moveCarousel();
            }, 50);
        } else {
            this.index--;
            this.allowTransition = true;
            this.moveCarousel();
        }
    }

    startAutoPlay() {
        if (this.autoPlayTimer) this.stopAutoPlay();
        this.autoPlayTimer = setInterval(() => this.nextSlide(), this.autoPlayInterval);
    }

    stopAutoPlay() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
    }

    resetCarousel() {
        this.stopAutoPlay();
        this.carousel.innerHTML = '';
        this.items.forEach(item => this.carousel.appendChild(item.cloneNode(true)));
        this.index = 0;
        this.init();
    }
}

// Initialize carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        new Carousel(carousel.id, {
            visibleItems: window.innerWidth <= 480 ? 1 : 
                         window.innerWidth <= 768 ? 2 : 3,
            transitionDuration: 600,
            autoPlayInterval: 3000
        });
    });
});