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
