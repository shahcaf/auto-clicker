// Discord Auth Logic
const params = new URLSearchParams(window.location.hash.slice(1));
const token = params.get('access_token');

if (token) {
    console.log('Access token detected, fetching user data...');
    // Fetch user data from Discord
    fetch('https://discord.com/api/users/@me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(user => {
        console.log('User data fetched:', user.username);
        localStorage.setItem('discord_logged_in', 'true');
        localStorage.setItem('discord_user', JSON.stringify({
            name: user.username,
            avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
        }));
        window.location.hash = ''; // Clear token from URL
        window.location.reload();
    })
    .catch(err => {
        console.error('Discord Auth Error:', err);
        alert('Discord Login Failed. Please check console for errors.');
    });
}

const isLoggedIn = localStorage.getItem('discord_logged_in') === 'true';
const isLoginPage = window.location.pathname.includes('login.html');
const userData = JSON.parse(localStorage.getItem('discord_user') || '{}');

console.log('Login Status:', { isLoggedIn, isLoginPage, hasToken: !!token });

// 1. If we have a token, the fetch logic above will handle it. We do nothing else.
if (token) {
    // Fetch logic is already running...
} 
// 2. If logged in and on login page, go to dashboard
else if (isLoggedIn && isLoginPage) {
    console.log('Already logged in, redirecting to dashboard...');
    window.location.href = 'index.html';
} 
// 3. If NOT logged in and NOT on login page, force login
else if (!isLoggedIn && !isLoginPage) {
    console.log('Not logged in, forcing redirect to login page...');
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', () => {
    // Populate User Profile
    if (isLoggedIn && userData) {
        const usernameEl = document.querySelector('.username');
        const avatarEl = document.querySelector('.avatar');
        if (usernameEl) usernameEl.textContent = userData.name || 'Discord User';
        if (avatarEl && userData.avatar) avatarEl.src = userData.avatar;
    }

    // Initialize Lucide icons
    lucide.createIcons();

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered delays to children with animation classes
                const animates = entry.target.querySelectorAll('.animate-in, .animate-scale');
                animates.forEach((el, index) => {
                    el.style.animationDelay = `${index * 0.15}s`;
                });
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Mockup UI Interactivity
    const mockupBtn = document.querySelector('.mockup-btn');
    if (mockupBtn) {
        mockupBtn.addEventListener('click', () => {
            const isActive = mockupBtn.classList.contains('active');
            if (isActive) {
                mockupBtn.classList.remove('active');
                mockupBtn.textContent = 'Start Clicker';
            } else {
                mockupBtn.classList.add('active');
                mockupBtn.textContent = 'Stop Clicker';
            }
        });
    }

    // Logout logic
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('discord_logged_in');
            localStorage.removeItem('discord_user');
            window.location.reload();
        });
    }

    // Dynamic Header Background
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(3, 7, 18, 0.95)';
            header.style.borderBottom = '1px solid rgba(59, 130, 246, 0.2)';
        } else {
            header.style.background = 'rgba(3, 7, 18, 0.8)';
            header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        }
    });
});
