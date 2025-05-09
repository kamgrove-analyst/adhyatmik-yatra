// Main Application Module
const Adhyatmikyatra = {
    init() {
        this.bindEvents();
        this.initializeNavigation();
    },

    initializeNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        
        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }

        // Highlight current page in navigation
        const currentPage = window.location.pathname.split('/').pop();
        const navItems = document.querySelectorAll('.nav-links a');
        
        navItems.forEach(item => {
            if (item.getAttribute('href') === currentPage) {
                item.setAttribute('aria-current', 'page');
                item.parentElement.classList.add('active');
            }
        });
    },

    // Only request notifications when needed (e.g., for events)
    requestNotificationPermission() {
        if (window.Notification && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
            return Notification.requestPermission();
        }
        return Promise.resolve(Notification.permission);
    },

    bindEvents() {
        document.addEventListener('DOMContentLoaded', () => {
            this.handlePageLoad();
        });

        // Initialize forms if they exist
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', this.handleFormSubmission.bind(this));
        });
    },

    handlePageLoad() {
        // Handle page-specific initialization
        const page = document.body.dataset.page;
        if (page) {
            switch(page) {
                case 'events':
                    this.initializeEvents();
                    break;
                case 'community':
                    this.initializeCommunity();
                    break;
            }
        }
    },

    handleFormSubmission(e) {
        e.preventDefault();
        const form = e.target;
        const submitBtn = form.querySelector('[type="submit"]');
        
        try {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            
            // Show success message
            const successMessage = document.getElementById('successMessage');
            if (successMessage) {
                successMessage.style.display = 'block';
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 3000);
            }

            form.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            this.showNotification('An error occurred. Please try again.', 'error');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Submit';
            }
        }
    },

    showNotification(message, type = 'info') {
        // This is an in-page notification, not a browser notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <p>${message}</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 100);
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

// Your other JavaScript functionality can go here
document.addEventListener('DOMContentLoaded', function() {
    // Success message handling
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('success')) {
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.style.display = 'block';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        }
    }
});

