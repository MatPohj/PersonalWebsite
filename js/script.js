console.log("Welcome to my website!");

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Theme toggle functionality
function initThemeToggle() {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply the saved theme
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }
    
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.textContent = document.body.classList.contains('light-mode') ? 'DARK' : 'LIGHT';
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    document.body.appendChild(themeToggle);
    
    // Add click event listener
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        
        // Update button text
        this.textContent = isLight ? 'DARK' : 'LIGHT';
        
        // Save preference
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme toggle
    initThemeToggle();
    
    // Tab switching logic
    function initTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const contentBoxes = document.querySelectorAll('.content-box');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                // Hide all content boxes
                contentBoxes.forEach(box => box.classList.remove('active'));
                
                // Show the selected content box
                const tabId = button.getAttribute('data-tab');
                const content = document.getElementById(tabId);
                if (content) {
                    content.classList.add('active');
                }
            });
        });
    }

    // Initialize tabs
    initTabs();

    // Tab switching logic
    const tabButtons = document.querySelectorAll('.tab-button');
    const contentBoxes = document.querySelectorAll('.content-box');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            tabButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            contentBoxes.forEach(box => box.classList.remove('active'));
            const targetId = this.dataset.tab;
            document.getElementById(targetId).classList.add('active');
        });
    });
});
