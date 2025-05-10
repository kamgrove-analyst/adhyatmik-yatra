document.addEventListener('DOMContentLoaded', () => {
    const accordionItems = document.querySelectorAll('.accordion-item');

    if (!accordionItems.length) {
        console.log("No accordion items found.");
        return;
    }

    accordionItems.forEach(item => {
        const trigger = item.querySelector('.accordion-trigger');
        const panel = item.querySelector('.accordion-panel');

        if (!trigger || !panel) {
            console.warn("Accordion item missing trigger or panel:", item);
            return;
        }

        // Set initial ARIA attributes based on whether panel should be open initially
        const isOpen = trigger.classList.contains('active');
        trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        panel.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
        // No need to set max-height here, CSS handles initial state based on 'active' class

        // Ensure trigger controls the panel
        const panelId = panel.getAttribute('id');
        if (panelId) {
            trigger.setAttribute('aria-controls', panelId);
        } else {
            console.warn("Accordion panel missing ID:", panel);
        }


        trigger.addEventListener('click', function() {
            const currentlyOpen = this.classList.contains('active');

            // --- START: Close all other accordions ---
            accordionItems.forEach(otherItem => {
                const otherTrigger = otherItem.querySelector('.accordion-trigger');
                const otherPanel = otherItem.querySelector('.accordion-panel');
                if (otherTrigger !== this && otherTrigger.classList.contains('active')) {
                    otherTrigger.classList.remove('active');
                    otherTrigger.setAttribute('aria-expanded', 'false');
                    otherPanel.classList.remove('active');
                    otherPanel.setAttribute('aria-hidden', 'true');
                    // No need to set max-height to null, CSS handles it
                }
            });
            // --- END: Close all other accordions ---

            // Toggle the clicked accordion's state by adding/removing the 'active' class
            const makeActive = !currentlyOpen;
            this.classList.toggle('active', makeActive);
            this.setAttribute('aria-expanded', makeActive);
            panel.classList.toggle('active', makeActive);
            panel.setAttribute('aria-hidden', !makeActive);

            // Max-height is now handled purely by CSS transitions based on the 'active' class
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const hash = window.location.hash;
  
    // If there’s a hash in URL, simulate a click and scroll to it
    if (hash) {
      const trigger = document.querySelector(hash);
      if (trigger && trigger.classList.contains("accordion-trigger")) {
        trigger.click();
        setTimeout(() => {
          trigger.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 400);
      }
    }
  
    // Add event listener to all accordion triggers to update URL on click
    const triggers = document.querySelectorAll(".accordion-trigger");
    triggers.forEach(trigger => {
      trigger.addEventListener("click", function () {
        const id = this.id;
        if (id) {
          history.replaceState(null, null, `#${id}`);
        }
      });
    });
  });
