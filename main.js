document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered delays to children with animation classes
                const animates = entry.target.querySelectorAll('.animate-in, .animate-scale');
                animates.forEach((el, index) => {
                    el.style.animationDelay = `${index * 0.15}s`;
                });
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Mockup UI Interactivity
    const mockupBtn = document.querySelector('.mockup-btn');
    if (mockupBtn) {
        mockupBtn.addEventListener('click', () => {
            const isActive = mockupBtn.classList.contains('active');
            if (isActive) {
                mockupBtn.classList.remove('active');
                mockupBtn.textContent = 'Start Clicker';
            } else {
                mockupBtn.classList.add('active');
                mockupBtn.textContent = 'Stop Clicker';
            }
        });
    }

    // Dynamic Header Background
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(3, 7, 18, 0.95)';
            header.style.borderBottom = '1px solid rgba(59, 130, 246, 0.2)';
        } else {
            header.style.background = 'rgba(3, 7, 18, 0.8)';
            header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        }
    });
});
