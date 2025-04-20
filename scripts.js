/**
 * SEES Global ISO Certification - Main JavaScript
 * 
 * This file contains all the interactive functionality for the website.
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in the footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Initialize mobile menu
  initMobileMenu();
  
  // Initialize theme toggle
  initThemeToggle();
  
  // Initialize trust badge carousel
  initBadgeCarousel();
  
  // Initialize testimonial carousel
  initTestimonialCarousel();
  
  // Initialize contact form
  initContactForm();
  
  // Initialize success modal
  initModal();
});

/**
 * Mobile Menu Functionality
 */
function initMobileMenu() {
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const servicesDropdown = document.getElementById('services-dropdown');
  const mobileServices = document.getElementById('mobile-services');
  
  // Toggle mobile menu
  mobileMenuToggle.addEventListener('click', function() {
    mobileMenu.classList.toggle('open');
    
    // Change icon based on menu state
    const icon = mobileMenuToggle.querySelector('i');
    if (mobileMenu.classList.contains('open')) {
      icon.className = 'fas fa-times';
    } else {
      icon.className = 'fas fa-bars';
    }
  });
  
  // Toggle services dropdown in mobile menu
  if (servicesDropdown) {
    servicesDropdown.addEventListener('click', function() {
      mobileServices.classList.toggle('open');
      
      // Rotate the chevron icon
      const icon = servicesDropdown.querySelector('i');
      if (mobileServices.classList.contains('open')) {
        icon.style.transform = 'rotate(180deg)';
      } else {
        icon.style.transform = 'rotate(0)';
      }
    });
  }
}

/**
 * Theme Toggle Functionality
 */
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  
  // Check for saved theme preference or use device preference
  const savedTheme = localStorage.getItem('theme') || 'light';
  
  // Apply the saved theme
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Toggle theme when button is clicked
  themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Update the theme
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Save the preference
    localStorage.setItem('theme', newTheme);
  });
}

/**
 * Trust Badge Carousel Functionality
 */
function initBadgeCarousel() {
  const badgesWrapper = document.querySelector('.badges-wrapper');
  const prevButton = document.getElementById('prev-badge');
  const nextButton = document.getElementById('next-badge');
  
  if (!badgesWrapper || !prevButton || !nextButton) {
    return;
  }
  
  const badges = badgesWrapper.querySelectorAll('img');
  let currentPosition = 0;
  let visibleBadges = getVisibleBadges();
  
  // Update visible badges based on screen size
  window.addEventListener('resize', function() {
    visibleBadges = getVisibleBadges();
    updateCarousel();
  });
  
  // Move to previous badge
  prevButton.addEventListener('click', function() {
    currentPosition = (currentPosition - 1 + badges.length) % badges.length;
    updateCarousel();
  });
  
  // Move to next badge
  nextButton.addEventListener('click', function() {
    currentPosition = (currentPosition + 1) % badges.length;
    updateCarousel();
  });
  
  // Auto rotation
  let autoRotate = setInterval(function() {
    currentPosition = (currentPosition + 1) % badges.length;
    updateCarousel();
  }, 4000);
  
  // Pause rotation on hover
  badgesWrapper.addEventListener('mouseenter', function() {
    clearInterval(autoRotate);
  });
  
  badgesWrapper.addEventListener('mouseleave', function() {
    autoRotate = setInterval(function() {
      currentPosition = (currentPosition + 1) % badges.length;
      updateCarousel();
    }, 4000);
  });
  
  // Determine how many badges to show based on screen width
  function getVisibleBadges() {
    if (window.innerWidth < 640) {
      return 1;
    } else if (window.innerWidth < 1024) {
      return 2;
    } else {
      return badges.length;
    }
  }
  
  // Update carousel display
  function updateCarousel() {
    if (visibleBadges >= badges.length) {
      // Show all badges if enough space
      badgesWrapper.style.transform = 'translateX(0)';
    } else {
      // Create circular array of badges
      let displayBadges = [];
      for (let i = 0; i < visibleBadges; i++) {
        displayBadges.push((currentPosition + i) % badges.length);
      }
      
      // Hide all badges
      badges.forEach((badge, index) => {
        badge.style.display = 'none';
      });
      
      // Show only visible badges
      displayBadges.forEach((index, position) => {
        badges[index].style.display = 'block';
        badges[index].style.order = position;
      });
    }
  }
  
  // Initialize carousel
  updateCarousel();
}

/**
 * Testimonial Carousel Functionality
 */
function initTestimonialCarousel() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  const prevButton = document.getElementById('prev-testimonial');
  const nextButton = document.getElementById('next-testimonial');
  
  if (!slides.length || !dots.length || !prevButton || !nextButton) {
    return;
  }
  
  let currentSlide = 0;
  
  // Set active slide and dot
  function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    // Remove active state from all dots
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show current slide and activate dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
  }
  
  // Move to previous slide
  prevButton.addEventListener('click', function() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });
  
  // Move to next slide
  nextButton.addEventListener('click', function() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });
  
  // Click on dots to navigate to slides
  dots.forEach(dot => {
    dot.addEventListener('click', function() {
      currentSlide = parseInt(this.getAttribute('data-index'));
      showSlide(currentSlide);
    });
  });
  
  // Auto rotation
  let autoRotate = setInterval(function() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);
  
  // Pause rotation on hover
  const testimonialCarousel = document.querySelector('.testimonial-carousel');
  
  testimonialCarousel.addEventListener('mouseenter', function() {
    clearInterval(autoRotate);
  });
  
  testimonialCarousel.addEventListener('mouseleave', function() {
    autoRotate = setInterval(function() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 5000);
  });
}

/**
 * Contact Form Functionality
 */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (!contactForm) {
    return;
  }
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic form validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // In a real implementation, you would send the form data to a server here
    // For this example, we'll just show the success modal
    
    // Clear the form
    contactForm.reset();
    
    // Show success modal
    const successModal = document.getElementById('success-modal');
    successModal.classList.add('open');
  });
}

/**
 * Modal Functionality
 */
function initModal() {
  const modal = document.getElementById('success-modal');
  const closeButton = modal.querySelector('.modal-close');
  const actionButton = modal.querySelector('.modal-btn');
  
  if (!modal || !closeButton || !actionButton) {
    return;
  }
  
  // Close modal when close button is clicked
  closeButton.addEventListener('click', function() {
    modal.classList.remove('open');
  });
  
  // Close modal when action button is clicked
  actionButton.addEventListener('click', function() {
    modal.classList.remove('open');
  });
  
  // Close modal when clicking outside of modal content
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.classList.remove('open');
    }
  });
  
  // Close modal when ESC key is pressed
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      modal.classList.remove('open');
    }
  });
}