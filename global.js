// Smooth scroll for header nav links and active underline

// Animate elements on load and scroll
function animateOnScroll() {
    const observer = new window.IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    animateOnScroll();
    // Smooth scroll for nav links
    document.querySelectorAll('.main-nav a').forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    // Remove active from all
                    document.querySelectorAll('.main-nav a').forEach(a => a.classList.remove('active-nav'));
                    // Add active to this
                    link.classList.add('active-nav');
                    // Smooth scroll
                    window.scrollTo({
                        top: target.getBoundingClientRect().top + window.scrollY - 40, // adjust offset if needed
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Set active on scroll
    const sections = Array.from(document.querySelectorAll('section[id]'));
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollY = window.scrollY;
        for (const section of sections) {
            if (section.offsetTop - 60 <= scrollY) {
                current = section.id;
            }
        }
        document.querySelectorAll('.main-nav a').forEach(a => {
            a.classList.remove('active-nav');
            if (a.getAttribute('href') === '#' + current) {
                a.classList.add('active-nav');
            }
        });
    });

    // Add floating animation to hero images and icons
    document.querySelectorAll('.hero-decorations .deco-img, .hero-decorations .stat-card').forEach((el, i) => {
        el.classList.add('floating-anim');
        el.style.setProperty('--float-delay', (i * 0.3) + 's');
    });
});