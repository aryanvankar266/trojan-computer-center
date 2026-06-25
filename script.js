// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Loading Screen ---
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            // Initialize AOS after loader disappears
            AOS.init({
                duration: 1000,
                once: true,
                offset: 50
            });
        }, 1500);
    });

    // Fallback if window.load has already fired
    if (document.readyState === 'complete') {
        setTimeout(() => {
            if(loader) {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
                AOS.init({
                    duration: 1000,
                    once: true,
                    offset: 50
                });
            }
        }, 1500);
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Back to Top Button ---
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Typing Effect ---
    const texts = ["Basic Computer", "Tally Prime", "C Programming", "Govt Exam Prep"];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';
    const typingElement = document.getElementById('typed-text');
    let isDeleting = false;

    function type() {
        if (!typingElement) return;
        
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];

        if (isDeleting) {
            letter = currentText.slice(0, --index);
        } else {
            letter = currentText.slice(0, ++index);
        }

        typingElement.textContent = letter;

        let typeSpeed = 100;

        if (isDeleting) {
            typeSpeed /= 2;
        }

        if (!isDeleting && letter.length === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && letter.length === 0) {
            isDeleting = false;
            count++;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing effect
    if(typingElement) {
        setTimeout(type, 2000);
    }

    // --- Animated Counters ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    // Use Intersection Observer to trigger counter animation when in view
    const statsSection = document.querySelector('.stats-section');
    if (statsSection && counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        });
        observer.observe(statsSection);
    }

    // --- GSAP Animations (Mouse Parallax) ---
    // Only apply on desktop
    if (window.innerWidth > 992 && typeof gsap !== 'undefined') {
        document.addEventListener("mousemove", (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            gsap.to(".shape-1", {
                x: x * 50,
                y: y * 50,
                ease: "power1.out"
            });
            gsap.to(".shape-2", {
                x: -x * 40,
                y: -y * 40,
                ease: "power1.out"
            });
            gsap.to(".shape-3", {
                x: x * 30,
                y: -y * 30,
                ease: "power1.out"
            });
        });
    }
    
    // Enable Bootstrap tooltips
    if(typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    }
});
