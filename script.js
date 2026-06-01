const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const menuLinks = document.querySelectorAll('.menu-link');

menuToggle.addEventListener('click', () => {
sidebar.classList.toggle('active');
menuToggle.classList.toggle('active');
});

menuLinks.forEach(link => {
link.addEventListener('click', () => {
sidebar.classList.remove('active');
menuToggle.classList.remove('active');
});
});

document.addEventListener('click', (e) => {
if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
sidebar.classList.remove('active');
menuToggle.classList.remove('active');
}
});
