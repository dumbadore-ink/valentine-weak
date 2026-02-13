// Interactive stars that follow mouse movement
const interactiveStars = document.getElementById('interactive-stars');
const maxStars = 50;
let mouseX = 0;
let mouseY = 0;
let stars = [];

// Create heart trail effect
function createTrailStar(x, y) {
    const star = document.createElement('div');
    star.className = 'trail-star';
    star.style.left = x + 'px';
    star.style.top = y + 'px';
    
    // Add random offset for natural effect
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;
    star.style.left = (x + offsetX) + 'px';
    star.style.top = (y + offsetY) + 'px';
    
    // Random rotation for variety
    star.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    interactiveStars.appendChild(star);
    
    // Remove heart after animation
    setTimeout(() => {
        if (star.parentNode) {
            star.parentNode.removeChild(star);
        }
    }, 2000);
}

// Create burst of hearts on click
function createStarBurst(x, y) {
    const starCount = 12;
    for (let i = 0; i < starCount; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.className = 'star-particle';
            star.style.left = x + 'px';
            star.style.top = y + 'px';
            
            // Create circular burst effect
            const angle = (i / starCount) * Math.PI * 2;
            const distance = 30 + Math.random() * 50;
            const endX = x + Math.cos(angle) * distance;
            const endY = y + Math.sin(angle) * distance;
            
            // Random heart emoji for variety
            const hearts = ['❤️', '💕', '💖', '💗', '💝'];
            const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];
            star.innerHTML = `<span style="font-size: ${10 + Math.random() * 8}px;">${randomHeart}</span>`;
            
            // Animate heart position with rotation
            star.animate([
                { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
                { transform: `translate(${endX - x}px, ${endY - y}px) scale(0.2) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration: 1000 + Math.random() * 500,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => {
                if (star.parentNode) {
                    star.parentNode.removeChild(star);
                }
            };
            
            interactiveStars.appendChild(star);
        }, i * 30);
    }
}

// Mouse movement tracking with throttling
let lastTrailTime = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Create trail stars with aggressive throttling
    const now = Date.now();
    if (now - lastTrailTime > 100 && Math.random() > 0.8) {
        createTrailStar(mouseX, mouseY);
        lastTrailTime = now;
    }
});

// Click effect
document.addEventListener('click', (e) => {
    // Don't create stars if clicking on the button
    if (e.target.id !== 'back-btn') {
        createStarBurst(e.clientX, e.clientY);
    }
});

// Back button interaction
document.getElementById('back-btn').addEventListener('click', function(e) {
    // Add a subtle animation feedback
    this.style.transform = 'scale(0.95)';
    
    // Create star burst at button
    const rect = this.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    createStarBurst(centerX, centerY);
    
    setTimeout(() => {
        this.style.transform = '';
        window.location.href = 'index.html';
    }, 100);
});

// Add parallax effect to background stars
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) / 50;
    const moveY = (e.clientY - window.innerHeight / 2) / 50;
    
    const starsBackground = document.querySelector('.stars-background');
    starsBackground.style.transform = `translate(${moveX}px, ${moveY}px)`;
});


function createHeartBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = '1rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        
        document.body.appendChild(heart);
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = 60;
        
        heart.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 800,
            easing: 'ease-out'
        }).onfinish = () => {
            heart.remove();
        };
    }
}

// Add GIF loading animation
document.addEventListener('DOMContentLoaded', function() {
    const gif = document.querySelector('.love-gif');
    const container = document.querySelector('.gif-container');
    
    // Initialize reveal card
    initializeRevealCard();
    
    // Add loading animation
    container.style.opacity = '0';
    container.style.transform = 'scale(0.9)';
    
    gif.addEventListener('load', function() {
        container.style.transition = 'all 0.8s ease';
        container.style.opacity = '1';
        container.style.transform = 'scale(1)';
    });
    
    // If already loaded, animate immediately
    if (gif.complete) {
        setTimeout(() => {
            container.style.transition = 'all 0.8s ease';
            container.style.opacity = '1';
            container.style.transform = 'scale(1)';
        }, 100);
    }
});