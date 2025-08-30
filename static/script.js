/* Basic JS for smooth scrolling & future enhancements */
document.addEventListener("DOMContentLoaded", () => {
  // Smooth-scroll internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Mobile menu toggle functionality
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Testimonial slider functionality
  const cards = document.querySelectorAll(".testimonial-card");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  let currentIndex = 0;

  function updateCards(index) {
    cards.forEach((card, i) => {
      card.classList.remove("active");
      if (i === index) {
        card.classList.add("active");
      }
    });
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % cards.length;
      updateCards(currentIndex);
    });

    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      updateCards(currentIndex);
    });
  }

  // Auto-scrolling gallery on homepage
  const homeGallerySlider = document.getElementById('home-gallery-slider');
  if (homeGallerySlider) {
    let galleryScrollDir = 1;
    setInterval(() => {
      homeGallerySlider.scrollBy({ left: galleryScrollDir * 340, behavior: 'smooth' });
      if (homeGallerySlider.scrollLeft + homeGallerySlider.clientWidth >= homeGallerySlider.scrollWidth || homeGallerySlider.scrollLeft === 0) {
        galleryScrollDir *= -1;
      }
    }, 4000);
  }

  // New function to show the custom pop-up
  function showPopup(message) {
    const popup = document.getElementById('status-popup');
    const popupMessage = document.getElementById('popup-message');
    if (popup && popupMessage) {
      popupMessage.textContent = message;
      popup.classList.add('show');
      // Hide the pop-up after 3 seconds
      setTimeout(() => {
        popup.classList.remove('show');
      }, 3000);
    }
  }

  // --- Backend Form Submission Logic ---

  // Handle contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault(); 
      
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch('/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.success) {
          showPopup(result.message);
          contactForm.reset();
        } else {
          showPopup("Error: " + result.message);
        }
      } catch (error) {
        console.error('Error:', error);
        showPopup("An error occurred. Please try again later.");
      }
    });
  }
  
  // Handle newsletter form submission
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(newsletterForm);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch('/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.success) {
          showPopup(result.message);
          newsletterForm.reset();
        } else {
          showPopup("Error: " + result.message);
        }
      } catch (error) {
        console.error('Error:', error);
        showPopup("An error occurred. Please try again later.");
      }
    });
  }
  
  // Handle tournament registration forms
  const tourForm = document.getElementById("tourForm");
  if (tourForm) {
    tourForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const formData = new FormData(tourForm);
      const data = Object.fromEntries(formData.entries());
      
      try {
        const response = await fetch('/register-tournament', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.success) {
          showPopup(result.message);
          tourForm.reset();
        } else {
          showPopup("Error: " + result.message);
        }
      } catch (error) {
        console.error('Error:', error);
        showPopup("An error occurred. Please try again later.");
      }
    });
  }
  
  // Handle academy registration forms
  const regForm = document.getElementById("regForm");
  if (regForm) {
    regForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(regForm);
      const data = Object.fromEntries(formData.entries());
      
      try {
        const response = await fetch('/register-academy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.success) {
          showPopup(result.message);
          regForm.reset();
        } else {
          showPopup("Error: " + result.message);
        }
      } catch (error) {
        console.error('Error:', error);
        showPopup("An error occurred. Please try again later.");
      }
    });
  }
});