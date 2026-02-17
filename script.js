// ==================== NAVIGATION ====================
const navbar = document.getElementById('navbar');
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
});

// ==================== ACTIVE NAVIGATION ====================
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== BACK TO TOP BUTTON ====================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const roomType = document.getElementById('roomType').value;
    const message = document.getElementById('message').value;
    
    // Get submit button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Prepare form data
    const formData = {
        name,
        phone,
        email,
        roomType,
        message
    };
    
    try {
        // Send data to backend API
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Show success notification
            showNotification('Thank you! Your enquiry has been received. We will contact you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Optional: Also open WhatsApp for immediate contact
            const whatsappMessage = `*New PG Enquiry*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A${email ? `*Email:* ${email}%0A` : ''}${roomType ? `*Room Type:* ${roomType}%0A` : ''}${message ? `*Message:* ${message}%0A` : ''}`;
            const whatsappNumber = '918530301810';
            
            // Ask user if they want to chat on WhatsApp
            setTimeout(() => {
                if (confirm('Would you like to chat with us on WhatsApp now?')) {
                    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
                }
            }, 1500);
            
        } else {
            throw new Error(result.message || 'Failed to submit enquiry');
        }
        
    } catch (error) {
        console.error('Error submitting form:', error);
        
        // Show error notification
        showNotification('Error submitting enquiry. Please try WhatsApp or call us directly.', 'error');
        
        // Fallback to WhatsApp
        const whatsappMessage = `*New PG Enquiry*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A${email ? `*Email:* ${email}%0A` : ''}${roomType ? `*Room Type:* ${roomType}%0A` : ''}${message ? `*Message:* ${message}%0A` : ''}`;
        const whatsappNumber = '918530301810';
        window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
        
    } finally {
        // Reset button state
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
});

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.room-card, .facility-card, .testimonial-card, .gallery-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== GALLERY LIGHTBOX ====================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const imgSrc = img.getAttribute('src');
        
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        `;
        
        const lightboxImg = document.createElement('img');
        lightboxImg.src = imgSrc;
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
            box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
        `;
        
        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);
        
        // Close lightbox on click
        lightbox.addEventListener('click', () => {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(lightbox);
            }, 300);
        });
    });
});

// ==================== ROOM CARD INTERACTIONS ====================
const roomCards = document.querySelectorAll('.room-card');

roomCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.borderColor = 'var(--primary-color)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.borderColor = 'transparent';
    });
});

// ==================== COUNTER ANIMATION ====================
const badgeNumber = document.querySelector('.badge-number');

if (badgeNumber) {
    const observerCounter = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
                observerCounter.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observerCounter.observe(badgeNumber);
}

function animateCounter() {
    const target = parseInt(badgeNumber.innerText);
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            badgeNumber.innerText = target + '+';
            clearInterval(timer);
        } else {
            badgeNumber.innerText = Math.floor(current) + '+';
        }
    }, stepTime);
}

// ==================== PHONE NUMBER VALIDATION ====================
const phoneInput = document.getElementById('phone');

if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        // Remove non-numeric characters
        e.target.value = e.target.value.replace(/[^0-9+\-\s()]/g, '');
    });
}

// ==================== LOADING ANIMATION ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==================== UTILITY FUNCTIONS ====================

// Format phone number for display
function formatPhoneNumber(number) {
    return number.replace(/(\d{2})(\d{5})(\d{5})/, '+$1 $2 $3');
}

// Validate email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 20px 30px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ==================== PREVENT FORM SPAM ====================
let lastSubmitTime = 0;
const submitCooldown = 5000; // 5 seconds

contactForm.addEventListener('submit', (e) => {
    const currentTime = Date.now();
    if (currentTime - lastSubmitTime < submitCooldown) {
        e.preventDefault();
        showNotification('Please wait a few seconds before submitting again.', 'error');
        return;
    }
    lastSubmitTime = currentTime;
}, true);

// ==================== HERO PARALLAX EFFECT ====================
const hero = document.querySelector('.hero');

if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        hero.style.backgroundPositionY = `${parallax}px`;
    });
}

// ==================== ADD CSS ANIMATIONS ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== CONSOLE MESSAGE ====================
console.log('%cDream Living PG Website', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ for students', 'color: #10b981; font-size: 14px;');

// ==================== PERFORMANCE OPTIMIZATION ====================
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}
