console.log("Welcome to my website!");

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const tabButtons = document.querySelectorAll('.tab-button');
const contentBoxes = document.querySelectorAll('.content-box');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        contentBoxes.forEach(box => {
            if (box.id === button.dataset.tab) {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        });
    });
});
