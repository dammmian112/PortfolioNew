// ===== NAVIGATION =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navLogo = document.querySelector('.logo-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Logo click - scroll to top
if (navLogo) {
    navLogo.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        
        // Don't prevent default for external links (like indexANG.html or index.html)
        if (targetId && (targetId.includes('.html') || targetId.startsWith('http'))) {
            return; // Allow default behavior for external links
        }
        
      e.preventDefault();
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
      });
    }
  });
});

// ===== TYPING EFFECT =====
const typingText = document.getElementById('typing-text');
const texts = typingText ? (document.documentElement.lang === 'en' 
    ? ['Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'Software Engineer']
    : ['Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'Programista']) : [];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeText, 2000);
            return;
        }
    }
    
    setTimeout(typeText, isDeleting ? 50 : 100);
}

// Start typing effect
setTimeout(typeText, 1000);

// ===== PROJECT FILTERING =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== PROJECT MODAL =====
const modal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');
const projectDetailsButtons = document.querySelectorAll('.project-details-btn');

// Detect language
const isEnglish = document.documentElement.lang === 'en';

const projectData = {
    nexuora: {
        title: isEnglish ? 'Social Network Portal - Nexuora' : 'Portal Społecznościowy - Nexuora',
        description: isEnglish 
            ? 'The social network portal was designed so that users can freely share relationships, add posts, and build a network of friends. The system enables easy registration and login, while ensuring data security.'
            : 'Portal społecznościowy został zaprojektowany tak, aby użytkownicy mogli swobodnie dzielić się relacjami, dodawać posty oraz budować sieć znajomych. System umożliwia łatwą rejestrację i logowanie, gwarantując przy tym bezpieczeństwo danych.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'JSON'],
        images: [
            '/img/nexuoraLandingPage.png',
            '/img/nexuora1.png',
            '/img/nexuora2.png'
        ],
        github: 'https://github.com/dammmian112/Nexuora'
    },
    portfolio: {
        title: 'Portfolio',
        description: isEnglish 
            ? 'The Portfolio project was designed to showcase my implementations and achievements. It includes interactive galleries, detailed descriptions, and a responsive interface that reflects my commitment, attention to detail, and creative approach.'
            : 'Projekt Portfolio został zaprojektowany, aby prezentować moje realizacje i osiągnięcia. Zawiera interaktywne galerie, szczegółowe opisy oraz responsywny interfejs, który odzwierciedla moje zaangażowanie, dbałość o detale i kreatywne podejście.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'JSON'],
        images: [
            '/img/portolio1.png',
            '/img/portfolio2.png',
            '/img/portfolio3.png'
        ],
        github: 'https://github.com/dammmian112/Portfolio-Damian-Walczak'
    },
    kalkulator: {
        title: isEnglish ? 'Online Calculator' : 'Kalkulator Online',
        description: isEnglish 
            ? 'Online Calculator was created with users who value speed and precision in mind. The application allows choosing from various calculators, including inflation, credit, leasing, and BMI, providing comprehensive support for daily calculations.'
            : 'Kalkulator Online został stworzony z myślą o użytkownikach ceniących szybkość i precyzję. Aplikacja umożliwia wybór spośród różnych kalkulatorów, w tym inflacji, kredytowego, leasingowego i BMI, zapewniając kompleksowe wsparcie przy codziennych obliczeniach.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'JSON'],
        images: [
            '/img/kalk1.png',
            '/img/kalk2.png'
        ],
        github: 'https://github.com/dammmian112/KalkulatorOnline'
    },
    pixelbay: {
        title: 'Pixel Bay',
        description: isEnglish 
            ? 'Pixel Bay is a project created for retro game lovers. The player can choose from three 2D mini games named: Nostalgic Jump, Star Siege, and Eel, which is based on the classic snake game. Everything was created from scratch, without using ready-made textures or music.'
            : 'Pixel Bay to projekt, który powstał z myślą o miłośnikach gier retro. Gracz ma do wyboru trzy mini gry 2D o nazwach: Nostalgic Jump, Star Siege oraz Węgorz, który bazuje na starej dobrej grze snake. Wszystko zostało stworzone od zera, bez korzystania z gotowych tekstur ani oprawy muzycznej.',
        technologies: ['GDScript', 'C++', 'C#', 'Python'],
        images: [
            '/img/pixelbay1.png',
            '/img/pixelbay2.png'
        ],
        github: 'https://github.com/dammmian112/Pixel-Bay'
    }
};

projectDetailsButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project');
        const project = projectData[projectId];
        
        if (project) {
            showProjectModal(project);
        }
    });
  });

function showProjectModal(project) {
    const modalBody = document.getElementById('modal-body');
    const isEnglish = document.documentElement.lang === 'en';
    
    modalBody.innerHTML = `
        <h2 style="margin-bottom: 1rem; color: var(--text-primary);">${project.title}</h2>
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.8;">${project.description}</p>
        
        <h3 style="color: var(--primary); margin-bottom: 1rem; font-size: 1.25rem;">${isEnglish ? 'Technologies' : 'Technologie'}</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
            ${project.technologies.map(tech => `
                <span style="padding: 0.5rem 1rem; background: rgba(99, 102, 241, 0.1); border: 1px solid var(--primary); border-radius: 5px; color: var(--primary); font-family: 'JetBrains Mono', monospace;">
                    ${tech}
                </span>
            `).join('')}
        </div>
        
        <h3 style="color: var(--primary); margin-bottom: 1rem; font-size: 1.25rem;">${isEnglish ? 'Images' : 'Zdjęcia'}</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
            ${project.images.map(img => `
                <img src="${img}" alt="${project.title}" style="width: 100%; border-radius: 8px; cursor: pointer; transition: transform 0.3s ease;" 
                     onclick="this.style.transform = this.style.transform === 'scale(1.5)' ? 'scale(1)' : 'scale(1.5)'; this.style.zIndex = this.style.zIndex === '10' ? '1' : '10';">
            `).join('')}
        </div>
        
        <a href="${project.github}" target="_blank" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none;">
            <i class="fab fa-github"></i>
            <span>${isEnglish ? 'View on GitHub' : 'Zobacz na GitHub'}</span>
        </a>
    `;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

modalClose.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Since we want it to work without backend, we'll use mailto as fallback
    const mailtoLink = `mailto:damian.walczak1212@gmail.com?subject=Kontakt z Portfolio&body=Imię: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AWiadomość:%0D%0A${formData.message}`;
    
    // Try to open mailto link
    window.location.href = mailtoLink;
    
    // Show success message
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    const isEnglish = document.documentElement.lang === 'en';
    submitButton.innerHTML = `<i class="fas fa-check"></i> <span>${isEnglish ? 'Sent!' : 'Wysłano!'}</span>`;
    submitButton.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    
    setTimeout(() => {
        submitButton.innerHTML = originalText;
        submitButton.style.background = '';
        contactForm.reset();
    }, 3000);
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ===== SCROLL TO TOP =====
const scrollToTop = document.querySelector('.scroll-to-top');

scrollToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTop.style.opacity = '1';
        scrollToTop.style.pointerEvents = 'auto';
    } else {
        scrollToTop.style.opacity = '0';
        scrollToTop.style.pointerEvents = 'none';
    }
});

// Initialize scroll to top button
scrollToTop.style.opacity = '0';
scrollToTop.style.pointerEvents = 'none';
scrollToTop.style.transition = 'opacity 0.3s ease';

// ===== ACTIVE NAVIGATION LINK =====
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--text-primary);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    // Set initial project card styles for animation
    projectCards.forEach((card, index) => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
    
    // Initialize active nav link
    updateActiveNavLink();
});