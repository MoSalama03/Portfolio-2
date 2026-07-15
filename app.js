// Select the fixed navbar element used for scroll-triggered visibility.
const navbar = document.querySelector('.portfolio__navbar');
const themeToggle = document.getElementById('theme-toggle');
const bodyElement = document.body;
const STORAGE_KEY = 'portfolio-theme';

// Distance in pixels to scroll before the navbar appears.
const NAV_SHOW_OFFSET = 250;

/**
 * Toggle the visible navbar state based on current vertical scroll position.
 * When the page is scrolled past NAV_SHOW_OFFSET, the navbar becomes visible.
 * When the page is scrolled back near the top, the navbar hides again.
 */
const updateNavbarVisibility = () => {
    if (!navbar) return;

    if (window.scrollY > NAV_SHOW_OFFSET) {
        navbar.classList.add('portfolio__navbar--visible');
    } else {
        navbar.classList.remove('portfolio__navbar--visible');
    }
};

// Listen for scroll events and update the navbar visibility accordingly.
window.addEventListener('scroll', updateNavbarVisibility);

// Ensure the navbar state is correct when the page loads.
window.addEventListener('load', updateNavbarVisibility);
updateNavbarVisibility();


// ==================== Dark Mode Toggle ====================


/**
 * Apply the theme to the page and update the toggle button icon
 */
const applyTheme = (isDarkMode) => {
    if (isDarkMode) {
        bodyElement.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
        localStorage.setItem(STORAGE_KEY, 'dark');
    } else {
        bodyElement.classList.remove('dark-mode');
        themeToggle.textContent = '🌙';
        localStorage.setItem(STORAGE_KEY, 'light');
    }
};

/**
 * Initialize theme based on user preference or system setting
 */
const initializeTheme = () => {
    localStorage.setItem(STORAGE_KEY, 'dark');
    applyTheme(true);
};

// Initialize theme on page load
initializeTheme();