document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
        observer.observe(el);
    });

    // Country selection functionality
    const ukBtn = document.getElementById('uk-btn');
    const irelandBtn = document.getElementById('ireland-btn');
    const ukMap = document.getElementById('uk-map');
    const irelandMap = document.getElementById('ireland-map');
    const ukInfo = document.getElementById('uk-info');
    const irelandInfo = document.getElementById('ireland-info');
    const countryInfo = document.getElementById('country-info');

    function selectCountry(country) {
        // Reset all states
        if (ukBtn) ukBtn.classList.remove('active-country', 'bg-blue-600', 'text-white');
        if (irelandBtn) irelandBtn.classList.remove('active-country', 'bg-green-600', 'text-white');
        if (ukMap) ukMap.classList.remove('active', 'country-inactive');
        if (irelandMap) irelandMap.classList.remove('active', 'country-inactive');

        if (country === 'uk' && ukBtn && irelandBtn && ukMap && irelandMap && ukInfo && irelandInfo && countryInfo) {
            // Activate UK
            ukBtn.classList.add('active-country', 'bg-blue-600', 'text-white');
            ukBtn.classList.remove('bg-gray-200', 'text-gray-700');
            irelandBtn.classList.add('bg-gray-200', 'text-gray-700');
            irelandBtn.classList.remove('bg-green-600', 'text-white');

            ukMap.classList.add('active');
            irelandMap.classList.add('country-inactive');

            // Update info panel
            countryInfo.className = 'mt-8 p-6 bg-blue-50 rounded-xl';
            ukInfo.classList.remove('hidden');
            irelandInfo.classList.add('hidden');

            // Update UK map colors to blue
            ukMap.querySelectorAll('.country-path').forEach(path => {
                path.setAttribute('fill', '#3B82F6');
                path.setAttribute('stroke', '#1E40AF');
            });
        } else if (country === 'ireland' && ukBtn && irelandBtn && ukMap && irelandMap && ukInfo && irelandInfo && countryInfo) {
            // Activate Ireland
            irelandBtn.classList.add('active-country', 'bg-green-600', 'text-white');
            irelandBtn.classList.remove('bg-gray-200', 'text-gray-700');
            ukBtn.classList.add('bg-gray-200', 'text-gray-700');
            ukBtn.classList.remove('bg-blue-600', 'text-white');

            irelandMap.classList.add('active');
            ukMap.classList.add('country-inactive');

            // Update info panel
            countryInfo.className = 'mt-8 p-6 bg-green-50 rounded-xl';
            irelandInfo.classList.remove('hidden');
            ukInfo.classList.add('hidden');

            // Update Ireland map colors to green
            irelandMap.querySelectorAll('.country-path').forEach(path => {
                path.setAttribute('fill', '#10B981');
                path.setAttribute('stroke', '#059669');
            });
        }
    }

    // Button event listeners
    if (ukBtn) ukBtn.addEventListener('click', () => selectCountry('uk'));
    if (irelandBtn) irelandBtn.addEventListener('click', () => selectCountry('ireland'));

    // Map click event listeners
    if (ukMap) ukMap.addEventListener('click', () => selectCountry('uk'));
    if (irelandMap) irelandMap.addEventListener('click', () => selectCountry('ireland'));

    // Initialize with UK selected
    if (ukBtn) selectCountry('uk');

    // Form submission handler
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const name = this.querySelector('input[type="text"]')?.value;

            if (name && name.trim()) {
                // Show success message
                const button = this.querySelector('button[type="submit"]');
                if (button) {
                    const originalText = button.textContent;
                    button.textContent = 'Thank you! We\'ll contact you soon.';
                    button.style.backgroundColor = '#10B981';

                    // Reset after 3 seconds
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.style.backgroundColor = '';
                        this.reset();
                    }, 3000);
                }
            }
        });
    }

    // Add navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('nav');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            } else {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            }
        }
    });

    // Counter animation for stats
    function animateCounter(element, target) {
        if (!element) return;

        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) +
                (element.textContent.includes('+') ? '+' : '') +
                (element.textContent.includes('%') ? '%' : '');
        }, 20);
    }

    // Animate counters when they come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/\D/g, '')) || 0;
                animateCounter(entry.target, number);
                statsObserver.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.text-4xl.font-bold.text-blue-600').forEach(el => {
        if (el) statsObserver.observe(el);
    });
});
