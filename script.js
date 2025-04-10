// === TYPEWRITER EFFECT FOR NAME ===
const nameTypewriter = document.getElementById('nameTypewriter');
const names = ['Deeraj Patgar', 'Dhiraj Patgar'];
let nameIndex = 0;
let charIndex = 0;
let isDeletingName = false;

function typeName() {
    const currentName = names[nameIndex];
    if (isDeletingName) {
        nameTypewriter.textContent = currentName.substring(0, charIndex - 1);
        charIndex--;
    } else {
        nameTypewriter.textContent = currentName.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeletingName && charIndex === currentName.length) {
        isDeletingName = true;
        setTimeout(typeName, 2000);
    } else if (isDeletingName && charIndex === 0) {
        isDeletingName = false;
        nameIndex = (nameIndex + 1) % names.length;
        setTimeout(typeName, 500);
    } else {
        setTimeout(typeName, isDeletingName ? 50 : 150);
    }
}

// === TYPEWRITER EFFECT FOR TITLES ===
const typewriter = document.querySelector('.typewriter');
const professions = ['Problem Solver', 'Computer Engineer', 'Developer'];
let i = 0;
let j = 0;
let isDeleting = false;

function typeEffect() {
    const current = professions[i];
    if (isDeleting) {
        typewriter.textContent = current.substring(0, j - 1);
        j--;
    } else {
        typewriter.textContent = current.substring(0, j + 1);
        j++;
    }

    if (!isDeleting && j === current.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1000);
    } else if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % professions.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}

// === CERTIFICATE CAROUSEL ===
function initCertifications() {
    const certs = [
        { file: 'microsoft-certificate.jpg', title: 'Cloud Computing', issuer: 'Microsoft' },
        { file: 'google-sheets-app-certificate.pdf', title: 'App Development', issuer: 'Coursera' },
        { file: 'codesoft-internship.pdf', title: 'Data Science Internship', issuer: 'CodeSoft' },
        { file: 'internshala-isp.jpg', title: 'ISP Program', issuer: 'Internshala' },
        { file: 'jpmorgan-chase-certificate.pdf', title: 'Software Engineering', issuer: 'JPMorgan' },
        { file: 'sql-certificate.pdf', title: 'SQL Certification', issuer: 'Udemy' },
        { file: 'walmart-certificate.pdf', title: 'Software Engineering', issuer: 'Walmart' }
    ];

    const slidesContainer = document.querySelector('.cert-slides');
    const indicatorsContainer = document.querySelector('.cert-indicators');
    let currentSlide = 0;

    slidesContainer.innerHTML = '';
    indicatorsContainer.innerHTML = '';

    certs.forEach((cert, index) => {
        const slide = document.createElement('div');
        slide.className = 'cert-slide';
        const isPDF = cert.file.endsWith('.pdf');
        slide.innerHTML = `
            ${isPDF ? `<embed src="${cert.file}#toolbar=0&navpanes=0" type="application/pdf">` : `<img src="${cert.file}" alt="${cert.title}">`}
            <div class="cert-details">
                <h3>${cert.title}</h3>
                <p>${cert.issuer}</p>
            </div>
        `;
        slidesContainer.appendChild(slide);

        const indicator = document.createElement('span');
        indicator.className = 'cert-indicator';
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    const slides = document.querySelectorAll('.cert-slide');
    const indicators = document.querySelectorAll('.cert-indicator');

    function updateCarousel() {
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        indicators.forEach((ind, i) => ind.classList.toggle('active', i === currentSlide));
    }

    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    document.getElementById('next-cert').addEventListener('click', nextSlide);
    document.getElementById('prev-cert').addEventListener('click', prevSlide);

    let slideInterval = setInterval(nextSlide, 3000);

    document.querySelector('.cert-carousel').addEventListener('mouseenter', () => clearInterval(slideInterval));
    document.querySelector('.cert-carousel').addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 3000));

    updateCarousel();
}

// === INIT ALL ===
document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
    typeName();
    initCertifications();
});
