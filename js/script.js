console.log("Welcome to my website!");

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;
    const body = document.body;
    let isLight = body.classList.contains('light-mode');

    function setTheme(light) {
        if (light) {
            body.classList.add('light-mode');
            toggleBtn.textContent = '🌑';
            toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
        } else {
            body.classList.remove('light-mode');
            toggleBtn.textContent = '🌙';
            toggleBtn.setAttribute('aria-label', 'Switch to light mode');
        }
    }

    toggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        isLight = !isLight;
        setTheme(isLight);
    });

    // Tab switching logic
    const tabButtons = document.querySelectorAll('.tab-button');
    const contentBoxes = document.querySelectorAll('.content-box');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            tabButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            contentBoxes.forEach(box => box.classList.remove('active'));
            if (this.dataset.tab === 'education') {
                document.getElementById('education').classList.add('active');
            } else if (this.dataset.tab === 'work') {
                document.getElementById('work-experience').classList.add('active');
            }
        });
    });
});
