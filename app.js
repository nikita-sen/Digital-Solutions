// Service data
const serviceData = {
  "cyber-security": {
    name: "Cyber Security Services",
    icon: "🔒",
    description: "Protect your business with comprehensive cyber security solutions",
    offerings: [
      "Cyber Security Training Sessions",
      "Security Consultation Calls", 
      "Cyber Awareness Sessions",
      "Security Risk Assessment",
      "Employee Training Programs"
    ],
    shortDesc: "Keep your business safe from cyber threats with expert training and consultations"
  },
  "web-design": {
    name: "Web Designing",
    icon: "🌐",
    description: "Create stunning, user-friendly websites that convert visitors into customers",
    offerings: [
      "Simple & UI Friendly Websites",
      "Static Business Websites",
      "Business Page Development",
      "Landing Page Design",
      "Website Maintenance"
    ],
    shortDesc: "Beautiful, functional websites that make your business shine online"
  },
  "graphic-design": {
    name: "Graphic Design", 
    icon: "🎨",
    description: "Eye-catching designs that make your brand stand out from the crowd",
    offerings: [
      "Professional Logo Design",
      "Social Media Post Design",
      "Business Card Design",
      "Brochure Design",
      "Brand Identity Design"
    ],
    shortDesc: "Creative designs that capture your brand essence and attract customers"
  },
  "content-writing": {
    name: "Content Writing",
    icon: "✍️",
    description: "Engaging content that speaks to your audience and drives results",
    offerings: [
      "Blog Writing",
      "Reel Scripts",
      "Website Content",
      "Product Descriptions",
      "Social Media Captions"
    ],
    shortDesc: "Words that connect, engage, and convert your audience into loyal customers"
  },
  "social-media": {
    name: "Social Media Management",
    icon: "📱",
    description: "Professional social media management that grows your online presence",
    offerings: [
      "Account Management",
      "Content Posting Schedule",
      "Engagement Management",
      "Social Media Strategy",
      "Performance Analytics"
    ],
    shortDesc: "Let us manage your social presence while you focus on your business"
  },
  "invitation-cards": {
    name: "Invitation Cards",
    icon: "💌",
    description: "Beautiful custom invitation cards for your special moments",
    offerings: [
      "Wedding Invitations",
      "Birthday Cards",
      "Anniversary Cards", 
      "Surprise Cards",
      "Custom Event Cards"
    ],
    shortDesc: "Stunning invitations that make your special occasions even more memorable"
  },
  "review-services": {
    name: "Review & Feedback Services",
    icon: "⭐",
    description: "Boost your online reputation with authentic reviews and feedback",
    offerings: [
      "Google Map Reviews",
      "Website Review Integration",
      "Social Media Reviews",
      "Feedback Collection Systems",
      "Reputation Management"
    ],
    shortDesc: "Build trust and credibility with authentic reviews and feedback systems"
  }
};

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const mainContent = document.getElementById('main-content');
const servicesGrid = document.getElementById('services-grid');
const contactModal = document.getElementById('contact-modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const successMessage = document.getElementById('success-message');
const requestQuoteBtn = document.getElementById('request-quote-btn');
const backBtn = document.getElementById('back-btn');
const exploreServicesBtn = document.getElementById('explore-services');

// Current state
let currentPage = 'home';
let currentService = null;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
  setupEventListeners();
  renderServices();
  animateCounters();
  setActiveNavLink('home');
});

// Initialize application
function initializeApp() {
  showPage('home');
}

// Setup event listeners
function setupEventListeners() {
  // Mobile menu toggle
  hamburger.addEventListener('click', toggleMobileMenu);
  
  // Navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', handleNavClick);
  });
  
  // Service navigation
  document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', handleServiceNavClick);
  });
  
  // Modal controls
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);
  
  // Form submissions
  const contactForm = document.getElementById('contact-form');
  const modalContactForm = document.getElementById('modal-contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
  
  if (modalContactForm) {
    modalContactForm.addEventListener('submit', handleModalFormSubmit);
  }
  
  // Request quote button
  if (requestQuoteBtn) {
    requestQuoteBtn.addEventListener('click', openModal);
  }
  
  // Back button
  if (backBtn) {
    backBtn.addEventListener('click', () => showPage('home'));
  }
  
  // Explore services button
  if (exploreServicesBtn) {
    exploreServicesBtn.addEventListener('click', scrollToServices);
  }
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !contactModal.classList.contains('hidden')) {
      closeModal();
    }
  });
  
  // Close success message after 5 seconds
  setTimeout(() => {
    if (successMessage && !successMessage.classList.contains('hidden')) {
      successMessage.classList.add('hidden');
    }
  }, 5000);
}

// Toggle mobile menu
function toggleMobileMenu() {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
}

// Handle navigation clicks
function handleNavClick(e) {
  e.preventDefault();
  const page = e.target.getAttribute('data-page');
  
  if (page) {
    showPage(page);
    setActiveNavLink(page);
    
    // Close mobile menu
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  }
}

// Handle service navigation clicks
function handleServiceNavClick(e) {
  e.preventDefault();
  const serviceId = e.target.getAttribute('data-service');
  
  if (serviceId) {
    showServicePage(serviceId);
    setActiveNavLink('services');
    
    // Close mobile menu
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  }
}

// Show specific page
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  // Show requested page
  const targetPage = document.getElementById(`${pageId}-page`);
  if (targetPage) {
    targetPage.classList.add('active');
    currentPage = pageId;
  }
  
  // Scroll to top
  window.scrollTo(0, 0);
}

// Show service page
function showServicePage(serviceId) {
  const service = serviceData[serviceId];
  if (!service) return;
  
  currentService = serviceId;
  
  // Update service page content
  document.getElementById('service-icon').textContent = service.icon;
  document.getElementById('service-title').textContent = service.name;
  document.getElementById('service-description').textContent = service.description;
  
  // Update offerings list
  const offeringsList = document.getElementById('service-offerings-list');
  offeringsList.innerHTML = '';
  service.offerings.forEach(offering => {
    const li = document.createElement('li');
    li.textContent = offering;
    offeringsList.appendChild(li);
  });
  
  // Update modal service field
  const modalServiceField = document.getElementById('modal-service');
  if (modalServiceField) {
    modalServiceField.value = service.name;
  }
  
  // Show service page
  showPage('service');
}

// Set active navigation link
function setActiveNavLink(page) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-page') === page) {
      link.classList.add('active');
    }
  });
}

// Render services on homepage
function renderServices() {
  if (!servicesGrid) return;
  
  servicesGrid.innerHTML = '';
  
  Object.entries(serviceData).forEach(([serviceId, service]) => {
    const serviceCard = document.createElement('div');
    serviceCard.className = 'service-card loading';
    serviceCard.innerHTML = `
      <span class="service-card-icon">${service.icon}</span>
      <h3>${service.name}</h3>
      <p>${service.shortDesc}</p>
      <button class="btn btn--primary" onclick="showServicePage('${serviceId}')">
        Learn More
      </button>
    `;
    
    servicesGrid.appendChild(serviceCard);
  });
}

// Animate counters
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  const observerOptions = {
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-count'));
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
          if (current < target) {
            current += increment;
            counter.textContent = Math.ceil(current) + '+';
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target + '+';
          }
        };
        
        updateCounter();
        observer.unobserve(counter);
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => {
    observer.observe(counter);
  });
}

// Scroll to services section
function scrollToServices() {
  const servicesSection = document.querySelector('.services-overview');
  if (servicesSection) {
    servicesSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Modal functions
function openModal() {
  contactModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  
  // Focus on first input
  setTimeout(() => {
    const firstInput = document.getElementById('modal-name');
    if (firstInput) {
      firstInput.focus();
    }
  }, 100);
}

function closeModal() {
  contactModal.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// Form submission handlers
function handleFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  // Simulate form submission
  submitForm(data, e.target);
}

function handleModalFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  // Simulate form submission
  submitForm(data, e.target);
}

function submitForm(data, form) {
  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  // Simulate API call
  setTimeout(() => {
    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    
    // Close modal if it was from modal
    if (form.id === 'modal-contact-form') {
      closeModal();
    }
    
    // Show success message
    showSuccessMessage();
    
    // Send to WhatsApp
    sendToWhatsApp(data);
    
    // Reset form
    form.reset();
  }, 1500);
}

function showSuccessMessage() {
  successMessage.classList.remove('hidden');
  
  // Auto hide after 5 seconds
  setTimeout(() => {
    successMessage.classList.add('hidden');
  }, 5000);
}

function sendToWhatsApp(data) {
  const whatsappNumber = '919993826289';
  let message = `*New Inquiry from Website*\n\n`;
  message += `*Name:* ${data.name}\n`;
  message += `*Email:* ${data.email}\n`;
  message += `*Phone:* ${data.phone}\n`;
  
  if (data.service) {
    message += `*Service:* ${data.service}\n`;
  }
  
  if (data.message) {
    message += `*Message:* ${data.message}\n`;
  }
  
  message += `\n*Sent via Nikita Sen Digital Website* ✨`;
  
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  
  // Open WhatsApp in new tab after a short delay
  setTimeout(() => {
    window.open(whatsappURL, '_blank');
  }, 2000);
}

// Smooth scrolling for internal links
document.addEventListener('click', function(e) {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(252, 252, 249, 0.98)';
    navbar.style.boxShadow = 'var(--shadow-sm)';
  } else {
    navbar.style.background = 'rgba(252, 252, 249, 0.95)';
    navbar.style.boxShadow = 'none';
  }
});

// Dark mode navbar adjustment
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(31, 33, 33, 0.98)';
      navbar.style.boxShadow = 'var(--shadow-sm)';
    } else {
      navbar.style.background = 'rgba(31, 33, 33, 0.95)';
      navbar.style.boxShadow = 'none';
    }
  });
}

// Add loading animation to service cards
window.addEventListener('load', function() {
  setTimeout(() => {
    document.querySelectorAll('.loading').forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }, 500);
});

// Handle page refresh and direct links
window.addEventListener('load', function() {
  const hash = window.location.hash.substring(1);
  if (hash && serviceData[hash]) {
    showServicePage(hash);
  } else if (hash === 'contact') {
    showPage('contact');
    setActiveNavLink('contact');
  } else if (hash === 'home' || !hash) {
    showPage('home');
    setActiveNavLink('home');
  }
});

// Update URL hash when navigating
function updateHash(pageId, serviceId = null) {
  if (serviceId) {
    window.history.pushState(null, null, `#${serviceId}`);
  } else {
    window.history.pushState(null, null, `#${pageId}`);
  }
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function() {
  const hash = window.location.hash.substring(1) || 'home';
  
  if (serviceData[hash]) {
    showServicePage(hash);
  } else if (hash === 'contact') {
    showPage('contact');
    setActiveNavLink('contact');
  } else {
    showPage('home');
    setActiveNavLink('home');
  }
});

// Enhanced service card interactions
document.addEventListener('mouseover', function(e) {
  if (e.target.closest('.service-card')) {
    const card = e.target.closest('.service-card');
    card.style.transform = 'translateY(-8px) scale(1.02)';
  }
});

document.addEventListener('mouseout', function(e) {
  if (e.target.closest('.service-card')) {
    const card = e.target.closest('.service-card');
    card.style.transform = 'translateY(0) scale(1)';
  }
});

// Add ripple effect to buttons
document.addEventListener('click', function(e) {
  if (e.target.matches('.btn')) {
    const button = e.target;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      pointer-events: none;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Lazy loading for images (if added later)
const observerOptions = {
  rootMargin: '50px'
};

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    }
  });
}, observerOptions);

// Observe any images with data-src attribute
document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll handler
const debouncedScrollHandler = debounce(function() {
  const navbar = document.querySelector('.navbar');
  const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (window.scrollY > 100) {
    navbar.style.background = isDark ? 'rgba(31, 33, 33, 0.98)' : 'rgba(252, 252, 249, 0.98)';
    navbar.style.boxShadow = 'var(--shadow-sm)';
  } else {
    navbar.style.background = isDark ? 'rgba(31, 33, 33, 0.95)' : 'rgba(252, 252, 249, 0.95)';
    navbar.style.boxShadow = 'none';
  }
}, 10);

window.removeEventListener('scroll', window.scrollHandler);
window.addEventListener('scroll', debouncedScrollHandler);