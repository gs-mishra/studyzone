/**
 * theme.js
 * Handles Dark Mode toggle and persistence
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check saved theme
    const savedTheme = localStorage.getItem('gtu_theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateIcon(savedTheme);
    }

    // Create Toggle Button in Nav
    const nav = document.querySelector('.nav-links');
    if (nav) {
        const li = document.createElement('li');
        li.innerHTML = `
            <button id="theme-toggle" class="btn btn-outline" style="border:none; padding: 5px; font-size: 1.2rem;">
                <ion-icon name="moon-outline"></ion-icon>
            </button>
        `;
        nav.appendChild(li);

        // Event Listener
        const btn = document.getElementById('theme-toggle');
        btn.addEventListener('click', toggleTheme);
    }
});

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('gtu_theme', newTheme);

    updateIcon(newTheme);
}

function updateIcon(theme) {
    const icon = document.querySelector('#theme-toggle ion-icon');
    if (icon) {
        icon.setAttribute('name', theme === 'dark' ? 'sunny-outline' : 'moon-outline');
    }
}
