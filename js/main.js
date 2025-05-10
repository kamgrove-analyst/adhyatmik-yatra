// Main Application Module
const Adhyatmikyatra = {
    init() {
        this.bindEvents();
        this.initializeNavigation();
        this.initializeAccordions();
        this.initializeCarousels();
    },

    initializeNavigation() {
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        const icon = hamburger?.querySelector('.icon');
        
        if (hamburger && mobileMenu) {
            hamburger.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
                
                if (icon) {
                    icon.innerHTML = hamburger.classList.contains('active') ? 
                        '<i class="fas fa-times"></i>' : 
                        '<i class="fas fa-bars"></i>';
                }
            });

            // Close menu on outside click
            document.addEventListener('click', (e) => {
                if (mobileMenu.classList.contains('active') && 
                    !mobileMenu.contains(e.target) && 
                    !hamburger.contains(e.target)) {
                    mobileMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    if (icon) {
                        icon.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            });

            // Close menu on ESC key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    if (icon) {
                        icon.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            });
        }

        // Highlight current page in navigation
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-links a').forEach(item => {
            if (item.getAttribute('href') === currentPage) {
                item.setAttribute('aria-current', 'page');
                item.parentElement?.classList.add('active');
            }
        });
    },

    initializeAccordions() {
        const accordionItems = document.querySelectorAll('.accordion-item');
        
        accordionItems.forEach(item => {
            const trigger = item.querySelector('.accordion-trigger');
            const panel = item.querySelector('.accordion-panel');
            
            if (!trigger || !panel) return;

            const isOpen = trigger.classList.contains('active');
            trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            panel.setAttribute('aria-hidden', isOpen ? 'false' : 'true');

            trigger.addEventListener('click', () => {
                const makeActive = !trigger.classList.contains('active');
                
                // Close other panels
                accordionItems.forEach(otherItem => {
                    const otherTrigger = otherItem.querySelector('.accordion-trigger');
                    const otherPanel = otherItem.querySelector('.accordion-panel');
                    if (otherTrigger && otherTrigger !== trigger) {
                        otherTrigger.classList.remove('active');
                        otherTrigger.setAttribute('aria-expanded', 'false');
                        otherPanel?.classList.remove('active');
                        otherPanel?.setAttribute('aria-hidden', 'true');
                    }
                });

                // Toggle current panel
                trigger.classList.toggle('active', makeActive);
                trigger.setAttribute('aria-expanded', makeActive);
                panel.classList.toggle('active', makeActive);
                panel.setAttribute('aria-hidden', !makeActive);
            });
        });
    },

    initializeCarousels() {
        const carousels = document.querySelectorAll('.carousel');
        carousels.forEach(carousel => {
            new Carousel(carousel.id, {
                visibleItems: window.innerWidth <= 480 ? 1 : 
                             window.innerWidth <= 768 ? 2 : 3,
                transitionDuration: 600,
                autoPlayInterval: 3000
            });
        });
    },

    bindEvents() {
        document.addEventListener('DOMContentLoaded', () => {
            this.handlePageLoad();
            this.initializeForms();
        });

        window.addEventListener('resize', this.handleResize.bind(this));
    },

    handleResize() {
        // Update carousel visible items based on screen size
        const carousels = document.querySelectorAll('.carousel');
        carousels.forEach(carousel => {
            const instance = carousel.carouselInstance;
            if (instance) {
                instance.visibleItems = window.innerWidth <= 480 ? 1 : 
                                      window.innerWidth <= 768 ? 2 : 3;
                instance.resetCarousel();
            }
        });
    },

    initializeForms() {
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', this.handleFormSubmission.bind(this));
        });
    },

    handleFormSubmission(e) {
        e.preventDefault();
        const form = e.target;
        const submitBtn = form.querySelector('[type="submit"]');
        
        if (!submitBtn) return;

        try {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            
            // Show success message
            this.showNotification('Form submitted successfully!', 'success');
            form.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            this.showNotification('An error occurred. Please try again.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Submit';
        }
    },

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.setAttribute('role', 'alert');
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}" 
                   aria-hidden="true"></i>
                <p>${message}</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        requestAnimationFrame(() => notification.classList.add('show'));

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    Adhyatmikyatra.init();
});