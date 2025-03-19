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

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペ';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const rainDrops = [];

    for (let i = 0; i < columns; i++) {
        rainDrops[i] = 1;
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

    setInterval(draw, 30);

    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
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
        loop: true
    });
}

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

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.2)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.boxShadow = 'none';
        }
    });
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
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
}

mobileMenu.addEventListener('click', toggleMobileMenu);
navOverlay.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});

// Close mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        toggleMobileMenu();
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768 && navLinks) {
                navLinks.style.display = 'none';
            }
        }
    });
});

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