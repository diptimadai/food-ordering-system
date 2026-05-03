document.addEventListener('DOMContentLoaded', () => {
            
    // 1. Header Shrink on Scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const mobileCTA = document.querySelector('.d-mobile-only');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isExpanded = navLinks.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
        if(window.innerWidth <= 850) {
            mobileCTA.style.display = isExpanded ? 'flex' : 'none';
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            mobileCTA.style.display = 'none';
        });
    });

    // 3. Scroll Reveal Animations (Intersection Observer)
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Reveal only once for better performance
                observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Scroll Spy (Highlight active nav link)
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // 5. Form Submission Simulation (Location Finder)
    const locationForm = document.getElementById('location-form');
    locationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const zipValue = document.getElementById('zip-input').value;
        if(zipValue.trim() !== '') {
            alert(`Finding locations near ${zipValue}... Redirecting to our app!`);
            document.getElementById('zip-input').value = '';
        }
    });
});
window.addEventListener('scroll', () => {
    const mobileBtn = document.querySelector('.mobile-sticky-cta');
    const heroSection = document.querySelector('.hero');
    
    // Only show the sticky button after user leaves the Hero section
    if (window.innerWidth < 850) {
        if (window.scrollY > heroSection.offsetHeight - 100) {
            mobileBtn.style.display = 'block';
            mobileBtn.style.animation = 'fadeInUp 0.3s ease-out';
        } else {
            mobileBtn.style.display = 'none';
        }
    }
});