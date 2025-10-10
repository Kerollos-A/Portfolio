// script.js

// --- Data Models ---


const skillsData = {
    backend: [
        { name: 'Node.js (Express.js)', level: '90%' },
        { name: 'MySQL / PostgreSQL', level: '85%' },
        { name: 'RESTful API Development', level: '90%' },
        { name: 'Authentication & CRUD', level: '80%' },
    ],
    data: [
        { name: 'SQL (Optimization & Procedures)', level: '90%' },
        { name: 'Python (Data Preprocessing/Automation)', level: '85%' },
        { name: 'Data Modeling & ETL Pipelines', level: '75%' },
        { name: 'Machine Learning Basics (RF, LR)', level: '65%' },
    ],
    cloud: [
        { name: 'AWS Cloud (Foundations)', level: '70%' },
        { name: 'Git & Version Control', level: '85%' },
        { name: 'Docker (Basic)', level: '50%' },
    ]
};

const projectsData = [
    {
        title: "API Development with Node.js",
        description: "Designing RESTful APIs for user and product management. Implemented CRUD operations and integrated with a MySQL database.",
        tech: ["Node.js", "Express.js", "MySQL", "REST"],
        github: "#" // Replace with actual GitHub link
    },
    {
        title: "Eligibility Prediction for Loan",
        description: "Developed a predictive model using Random Forest Classifier. Included preprocessing, hyperparameter tuning, and ROC curve evaluation.",
        tech: ["Python", "Random Forest", "Scikit-learn", "Data Preprocessing"],
        github: "#" // Replace with actual GitHub link
    },
    {
        title: "Insurance Upgrades Data Prep",
        description: "Cleaned and corrected customer data for a U.S.-based travel provider. Prepared datasets for a targeted insurance promotion campaign.",
        tech: ["Python", "Data Cleaning", "Data Preprocessing", "ETL"],
        github: "#" // Replace with actual GitHub link
    },
    {
        title: "Database for Tech Company",
        description: "Created a comprehensive Relational Database Model for a technology company, containing all critical user and product information.",
        tech: ["SQL", "Data Modeling", "PostgreSQL/MySQL"],
        github: "#" // Replace with actual GitHub link
    },
];

// --- Theme Toggle Logic ---

/**
 * Applies the correct theme to the <body> element.
 * @param {string} theme - 'dark' or 'light'.
 */
function applyTheme(theme) {
    const isLight = theme === 'light';
    document.body.classList.toggle('light', isLight);
    
    // Toggle icons
    const sunIcons = document.querySelectorAll('#sun-icon, #sun-icon-mobile');
    const moonIcons = document.querySelectorAll('#moon-icon, #moon-icon-mobile');

    sunIcons.forEach(icon => icon.classList.toggle('hidden', !isLight));
    moonIcons.forEach(icon => icon.classList.toggle('hidden', isLight));
    
    // Save preference to localStorage
    localStorage.setItem('theme', theme);
}

/**
 * Initializes the theme based on user's saved preference or system preference.
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

    let initialTheme = 'dark'; // Default to dark mode
    if (savedTheme) {
        initialTheme = savedTheme;
    } else if (prefersLight) {
        initialTheme = 'light';
    }

    applyTheme(initialTheme);
}

/**
 * Toggles the theme between dark and light.
 */
function toggleTheme() {
    const currentTheme = document.body.classList.contains('light') ? 'light' : 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}

// --- Utility Functions ---

/**
 * Renders the skill bar HTML for a given set of skills.
 */
// script.js (Modified renderSkills function only)

// ... (Data Models remain the same) ...

// --- Utility Functions ---

/**
 * Renders the skill bar HTML for a given set of skills, removing explicit percentages.
 */
function renderSkills(containerId, skills) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // We now render a simple list item instead of a bar structure
    container.innerHTML = skills.map(skill => `
        <div class="skill-item p-2 bg-primary-dark/50 rounded-lg transition-colors duration-500 hover:bg-primary-dark/80">
            <p class="text-md text-text-light flex justify-between">
                <span class="font-medium">${skill.name}</span>
            </p>
        </div>
    `).join('');
}

// ... (The rest of script.js remains the same) ...

/**
 * Renders the project cards into the projects container.
 */
function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    container.innerHTML = projectsData.map(project => `
        <div class="project-card bg-secondary-dark p-6 rounded-xl shadow-xl flex flex-col justify-between transition-colors duration-500">
            <div class="space-y-4">
                <h3 class="text-2xl font-bold text-white transition-colors duration-500">${project.title}</h3>
                <p class="text-text-muted">${project.description}</p>
            </div>
            <div>
                <div class="flex flex-wrap gap-2 my-4">
                    ${project.tech.map(t => `<span class="text-xs font-medium bg-primary-dark text-accent-blue px-3 py-1 rounded-full transition-colors duration-500">${t}</span>`).join('')}
                </div>
                <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-accent-blue hover:text-white transition duration-300 font-semibold mt-3">
                    View Code
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right ml-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
            </div>
        </div>
    `).join('');
}

/**
 * Animates the skill bars when the skills section is visible.
 */
function animateSkills(entries, observer) {
    // Skills are now rendered as a simple list, so no animation is needed.
    // We stop observing immediately.
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);
        }
    });
}

/**
 * Toggles the visibility of the mobile navigation menu.
 */
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

/**
 * Closes the mobile menu (used after a link is clicked).
 */
function closeMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (!menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
    }
}


// --- Initialization on Document Load ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Initialization (MUST be first)
    initTheme();

    // 2. Initial Data Rendering
    renderSkills('backend-skills', skillsData.backend);
    renderSkills('data-skills', skillsData.data);
    renderSkills('cloud-skills', skillsData.cloud);
    renderProjects();
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // 3. Mobile Menu Setup
    const mobileButton = document.getElementById('mobile-menu-button');
    if (mobileButton) {
        mobileButton.addEventListener('click', toggleMobileMenu);
    }
    window.closeMobileMenu = closeMobileMenu; // Expose to HTML inline onclick

    // 4. Theme Toggle Button Setup
    const desktopToggle = document.getElementById('theme-toggle');
    const mobileToggle = document.getElementById('theme-toggle-mobile');
    if (desktopToggle) desktopToggle.addEventListener('click', toggleTheme);
    if (mobileToggle) mobileToggle.addEventListener('click', toggleTheme);

    // 5. Skill Bar Animation using Intersection Observer
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observerOptions = {
            root: null, // relative to the viewport
            rootMargin: '0px',
            threshold: 0.2 // Trigger when 20% of the section is visible
        };
        const skillsObserver = new IntersectionObserver(animateSkills, observerOptions);
        skillsObserver.observe(skillsSection);
    }
    
    // 6. Initialize Lucide Icons (Must be called after all HTML is rendered)
    lucide.createIcons();

    // 7. Scroll-based NavBar Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-2xl');
        } else {
            navbar.classList.remove('shadow-2xl');
        }
    });
});