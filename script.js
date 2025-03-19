// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    const mainContent = document.querySelector('.main-content');
    const lines = document.querySelectorAll('.terminal-content .line');
    
    // Animate each line sequentially
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
        }, index * 500);
    });

    // Hide preloader and show main content after all lines are shown
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        document.body.style.overflow = 'visible';
        mainContent.style.opacity = '1';
        mainContent.style.visibility = 'visible';
        
        // Initialize AOS after content is visible
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }, (lines.length * 500) + 1000);
});

// Matrix Effect
const canvas = document.getElementById('matrix');
if (canvas) {
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペ';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    let columns = canvas.width / fontSize;
    let rainDrops = Array(Math.floor(columns)).fill(1);

    function updateRainDrops() {
        columns = canvas.width / fontSize;
        rainDrops = Array(Math.floor(columns)).fill(1);
    }

    const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };

    let animationFrame;
    function animate() {
        draw();
        animationFrame = requestAnimationFrame(animate);
    }
    animate();

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();
            updateRainDrops();
        }, 250);
    });
}

// Typed.js for hero section
const typedElement = document.querySelector('.typed-text');
if (typedElement) {
    const typed = new Typed('.typed-text', {
        strings: [
            'DevOps Engineer',
            'Cloud Automation Specialist',
            'Linux Administrator',
            'Offensive Security Expert',
            'Cybersecurity Student'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        autoInsertCss: true
    });
}

// Hero section parallax effect
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        
        if (scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Optimize hero animations on mobile
function optimizeForMobile() {
    if (window.innerWidth <= 768) {
        if (canvas) {
            canvas.style.opacity = '0.1';
        }
    } else {
        if (canvas) {
            canvas.style.opacity = '0.15';
        }
    }
}

optimizeForMobile();
window.addEventListener('resize', optimizeForMobile);

// Terminal-style Command Execution
document.querySelectorAll('.terminal-text').forEach(terminal => {
    terminal.addEventListener('click', () => {
        const command = terminal.querySelector('.command').textContent;
        executeCommand(command);
    });
});

function executeCommand(command) {
    const terminal = document.createElement('div');
    terminal.className = 'terminal-response';
    terminal.innerHTML = `
        <div class="prompt">$</div>
        <div class="command">${command}</div>
        <div class="response">Executing command...</div>
    `;
    
    document.querySelector('.terminal-content').appendChild(terminal);
    
    setTimeout(() => {
        terminal.querySelector('.response').textContent = 'Command executed successfully.';
    }, 1000);
}

// Mobile Menu Functionality
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navOverlay = document.createElement('div');
navOverlay.classList.add('nav-overlay');
document.body.appendChild(navOverlay);

function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    mobileMenu.setAttribute('aria-expanded', navLinks.classList.contains('active'));
}

function closeMobileMenu() {
    navLinks.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    mobileMenu.setAttribute('aria-expanded', 'false');
}

// Handle mobile menu click
mobileMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMobileMenu();
});

// Handle overlay click
navOverlay.addEventListener('click', closeMobileMenu);

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenu.contains(e.target) && navLinks.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Handle mobile menu links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            
            closeMobileMenu();
            
            // Wait for menu close animation
            setTimeout(() => {
                if (target) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 300);
        }
    });
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
        
        // Update mobile height fix
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        // Update matrix canvas size
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }, 250);
});

// Handle scroll for navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scrolled');
        navbar.style.transform = 'translateY(0)';
        return;
    }
    
    if (currentScroll > lastScroll && !navLinks.classList.contains('active')) {
        // Scrolling down & menu closed
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up or menu open
        navbar.style.transform = 'translateY(0)';
        navbar.classList.add('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Fix for iOS Safari 100vh issue
function fixMobileHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

fixMobileHeight();
window.addEventListener('resize', fixMobileHeight);

// Improve scroll performance
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

// Improve scroll performance
const debouncedScroll = debounce(() => {
    requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        
        // Update navbar
        if (scrolled > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update animations
        document.querySelectorAll('[data-aos]').forEach(element => {
            if (element.getBoundingClientRect().top < window.innerHeight * 0.75) {
                element.classList.add('aos-animate');
            }
        });
    });
}, 15);

window.addEventListener('scroll', debouncedScroll);

// Project filtering with terminal animation
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const terminal = document.createElement('div');
        terminal.className = 'terminal-response';
        terminal.innerHTML = `
            <div class="prompt">$</div>
            <div class="command">filter ${button.getAttribute('data-filter')}</div>
            <div class="response">Filtering projects...</div>
        `;
        
        document.querySelector('.terminal-content').appendChild(terminal);
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');
        projectItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        
        setTimeout(() => {
            terminal.querySelector('.response').textContent = 'Filter applied successfully.';
        }, 500);
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const terminal = document.createElement('div');
        terminal.className = 'terminal-response';
        terminal.innerHTML = `
            <div class="prompt">$</div>
            <div class="command">send_message</div>
            <div class="response">Sending message...</div>
        `;
        
        document.querySelector('.terminal-content').appendChild(terminal);
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            terminal.querySelector('.response').textContent = 'Message sent successfully.';
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Skill bars animation with terminal feedback
const skillBars = document.querySelectorAll('.skill-progress');
const skillsSection = document.querySelector('.skills-container');

const animateSkillBars = () => {
    const terminal = document.createElement('div');
    terminal.className = 'terminal-response';
    terminal.innerHTML = `
        <div class="prompt">$</div>
        <div class="command">load_skills</div>
        <div class="response">Loading skill metrics...</div>
    `;
    
    document.querySelector('.terminal-content').appendChild(terminal);
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
    
    setTimeout(() => {
        terminal.querySelector('.response').textContent = 'Skill metrics loaded successfully.';
    }, 1000);
};

// Intersection Observer for skill bars
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Add hover effect to project cards with terminal feedback
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const terminal = document.createElement('div');
        terminal.className = 'terminal-response';
        terminal.innerHTML = `
            <div class="prompt">$</div>
            <div class="command">hover_project</div>
            <div class="response">Loading project details...</div>
        `;
        
        document.querySelector('.terminal-content').appendChild(terminal);
        
        card.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            terminal.querySelector('.response').textContent = 'Project details loaded.';
        }, 500);
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});