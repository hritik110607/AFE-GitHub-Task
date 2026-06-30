document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. PAGE LOADER CLOSURE
    // ==========================================
    const loader = document.getElementById("loader");
    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
        }, 300); // Clean artificial grace period
    });

    // ==========================================
    // 2. MOBILE HAMBURGER MENU CONTROL
    // ==========================================
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    const toggleMenu = () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    };

    hamburger.addEventListener("click", toggleMenu);
    navLinks.forEach(link => link.addEventListener("click", () => {
        if (navMenu.classList.contains("active")) toggleMenu();
    }));

    // ==========================================
    // 3. STICKY NAVBAR & BACK-TO-TOP BUTTON VISIBILITY
    // ==========================================
    const navbar = document.querySelector(".navbar");
    const topBtn = document.getElementById("scrollToTopBtn");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
        }

        if (window.scrollY > 500) {
            topBtn.classList.add("show");
        } else {
            topBtn.classList.remove("show");
        }
    });

    topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // ==========================================
    // 4. ANIMATED TYPING PARSER EFFECT
    // ==========================================
    const typeElement = document.querySelector(".typing-text");
    if (typeElement) {
        const words = JSON.parse(typeElement.getAttribute("data-words"));
        let wordIdx = 0;
        let charIdx = 0;
        let isDeleting = false;

        const handleType = () => {
            const currentWord = words[wordIdx];
            if (isDeleting) {
                typeElement.textContent = currentWord.substring(0, charIdx - 1);
                charIdx--;
            } else {
                typeElement.textContent = currentWord.substring(0, charIdx + 1);
                charIdx++;
            }

            let typeSpeed = isDeleting ? 40 : 80;

            if (!isDeleting && charIdx === currentWord.length) {
                typeSpeed = 2000; // Standstill on completion
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                wordIdx = (wordIdx + 1) % words.length;
                typeSpeed = 400; // Switch delay
            }

            setTimeout(handleType, typeSpeed);
        };
        setTimeout(handleType, 1000);
    }

    // ==========================================
    // 5. INTERSECTION OBSERVER FOR INTERACTIONS
    // ==========================================
    
    // Core Layout Reveal Blocks
    const revealBlocks = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealBlocks.forEach(block => revealObserver.observe(block));

    // Skill Bar Fill Initialization
    const skillBars = document.querySelectorAll(".skill-progress");
    const skillsSection = document.getElementById("skills");

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    bar.style.width = bar.getAttribute("data-width");
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    if (skillsSection) skillObserver.observe(skillsSection);

    // Numeric Ticking Counter Logic
    const counters = document.querySelectorAll(".counter-number");
    const aboutSection = document.getElementById("about");

    const runCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute("data-target");
            const increment = target / 40; // Split speed profile
            
            const updateCount = () => {
                const current = +counter.innerText;
                if (current < target) {
                    counter.innerText = Math.ceil(current + increment);
                    setTimeout(updateCount, 25);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    if (aboutSection) counterObserver.observe(aboutSection);

    // ==========================================
    // 6. SCROLL NAVIGATION HIGH LIGHT SYNCHRONIZER
    // ==========================================
    const sections = document.querySelectorAll("section");
    
    window.addEventListener("scroll", () => {
        let currentActiveSectionId = "";
        sections.forEach(sec => {
            const sectionTop = sec.offsetTop;
            const sectionHeight = sec.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                currentActiveSectionId = sec.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentActiveSectionId}`) {
                link.classList.add("active");
            }
        });
    });
});
