// Select the fixed navbar element used for scroll-triggered visibility.
const navbar = document.querySelector('.portfolio__navbar');
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
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
        htmlElement.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
        localStorage.setItem(STORAGE_KEY, 'dark');
    } else {
        htmlElement.classList.remove('dark-mode');
        themeToggle.textContent = '🌙';
        localStorage.setItem(STORAGE_KEY, 'light');
    }
};

/**
 * Initialize theme based on user preference or system setting
 */
const initializeTheme = () => {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    let isDarkMode;

    if (savedTheme) {
        // Use saved preference
        isDarkMode = savedTheme === 'dark';
        console.log('✓ Using saved theme preference:', savedTheme);
    } else {
        // Check system preference
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        isDarkMode = systemPrefersDark;
        console.log(systemPrefersDark ? '✓ System prefers dark mode' : '✓ System prefers light mode');
    }

    applyTheme(isDarkMode);
};

/**
 * Listen for system theme preference changes
 */
const listenToSystemThemeChanges = () => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    darkModeQuery.addEventListener('change', (e) => {
        const savedTheme = localStorage.getItem(STORAGE_KEY);
        
        // Only apply system change if user hasn't manually set a preference
        if (!savedTheme) {
            console.log('System theme changed to:', e.matches ? 'dark' : 'light');
            applyTheme(e.matches);
        }
    });
};

/**
 * Toggle dark mode when the button is clicked
 */
const toggleTheme = () => {
    const isDarkMode = htmlElement.classList.contains('dark-mode');
    applyTheme(!isDarkMode);
};

// Initialize theme on page load
initializeTheme();

// Listen for system preference changes
listenToSystemThemeChanges();

// Add click listener to toggle button
themeToggle.addEventListener('click', toggleTheme);