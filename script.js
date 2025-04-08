// Typewriter Effect
const typewriterElement = document.querySelector('.typewriter');
const professions = ['Computer Engineer', 'Android Developer', 'ML Enthusiast', 'Problem Solver'];
let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    const currentProfession = professions[professionIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentProfession.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typewriterElement.textContent = currentProfession.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentProfession.length) {
        isDeleting = true;
        typingSpeed = 1500; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        professionIndex = (professionIndex + 1) % professions.length;
        typingSpeed = 500; // Pause before typing next
    }
    
    setTimeout(typeWriter, typingSpeed);
}

// Start the typewriter effect
setTimeout(typeWriter, 1000);
function createCertSlides() {
    const certs = [
        {
            file: 'microsoft-certificate.jpg',
            title: 'Cloud Computing',
            issuer: 'Microsoft'
        },
        {
            file: 'google-sheets-app-certificate.pdf',
            title: 'App Development with Google Sheets',
            issuer: 'Coursera'
        },
        // Add all other certificates in this format
    ];

    const slidesContainer = document.querySelector('.cert-slides');
    slidesContainer.innerHTML = '';

    certs.forEach(cert => {
        const slide = document.createElement('div');
        slide.className = 'cert-slide';
        
        const isPDF = cert.file.endsWith('.pdf');
        const mediaElement = isPDF 
            ? `<embed src="${cert.file}" type="application/pdf">`
            : `<img src="${cert.file}" alt="${cert.title}">`;
        
        slide.innerHTML = `
            ${mediaElement}
            <div class="cert-details">
                <h3>${cert.title}</h3>
                <p>${cert.issuer}</p>
            </div>
        `;
        
        slidesContainer.appendChild(slide);
    });
}

// Call this function when page loads
document.addEventListener('DOMContentLoaded', createCertSlides);
// Certifications Carousel
const certSlides = document.querySelector('.cert-slides');
const certIndicators = document.querySelectorAll('.cert-indicator');
const prevBtn = document.getElementById('prev-cert');
const nextBtn = document.getElementById('next-cert');
let currentSlide = 0;
let slideInterval;
const slideCount = document.querySelectorAll('.cert-slide').length;

function goToSlide(index) {
    certSlides.style.transform = `translateX(-${index * 100}%)`;
    certIndicators.forEach(indicator => indicator.classList.remove('active'));
    certIndicators[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    goToSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    goToSlide(currentSlide);
}

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 3000);
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

nextBtn.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    setTimeout(startAutoSlide, 10000); // Restart after 10 seconds of inactivity
});

prevBtn.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    setTimeout(startAutoSlide, 10000); // Restart after 10 seconds of inactivity
});

certIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        stopAutoSlide();
        goToSlide(index);
        setTimeout(startAutoSlide, 10000); // Restart after 10 seconds of inactivity
    });
});

// Pause auto-slide when hovering over carousel
document.querySelector('.cert-carousel').addEventListener('mouseenter', stopAutoSlide);
document.querySelector('.cert-carousel').addEventListener('mouseleave', startAutoSlide);

// Start auto-slide initially
startAutoSlide();

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Your message has been sent! I will respond as soon as possible.');
    this.reset();
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .about-content, .skills-category, .certifications h2, .certifications p, .contact h2, .contact p, .contact-form').forEach(el => {
    observer.observe(el);
});

// Project card click handlers
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        const link = this.querySelector('a');
        if (link) {
            window.open(link.href, '_blank');
        }
    });
});
