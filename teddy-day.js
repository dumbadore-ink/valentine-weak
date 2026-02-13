// Teddy Day Interactive Script

// State
const state = {
    size: 'medium',
    color: '#D4A373',
    accessories: [],
    message: ''
};

// DOM Elements
const teddyBear = document.getElementById('teddy-bear');
const hugBtn = document.getElementById('hug-btn');
const sizeButtons = document.querySelectorAll('.size-btn');
const colorButtons = document.querySelectorAll('.color-btn');
const accessoryButtons = document.querySelectorAll('.accessory-btn');
const teddyAccessories = document.getElementById('teddy-accessories');

// Initialize
function init() {
    createCottonClouds();
    createSparkles();
    setupEventListeners();
    startIdleAnimation();
}

// Create floating cotton clouds
function createCottonClouds() {
    const container = document.querySelector('.cotton-clouds');
    for (let i = 0; i < 8; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        const size = Math.random() * 80 + 40;
        cloud.style.width = size + 'px';
        cloud.style.height = size + 'px';
        cloud.style.left = Math.random() * 100 + '%';
        cloud.style.top = Math.random() * 100 + '%';
        cloud.style.animationDelay = Math.random() * 5 + 's';
        cloud.style.animationDuration = (Math.random() * 10 + 15) + 's';
        container.appendChild(cloud);
    }
}

// Create sparkles
function createSparkles() {
    const container = document.querySelector('.sparkles-container');
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 1 + 's';
        container.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 3000);
    }, 500);
}

// Setup event listeners
function setupEventListeners() {
    // Hug button
    hugBtn.addEventListener('click', handleHug);
    
    // Size buttons
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', () => handleSizeChange(btn));
    });
    
    // Color buttons
    colorButtons.forEach(btn => {
        btn.addEventListener('click', () => handleColorChange(btn));
    });
    
    // Accessory buttons
    accessoryButtons.forEach(btn => {
        btn.addEventListener('click', () => handleAccessoryToggle(btn));
    });
    
    // Teddy hover
    teddyBear.addEventListener('mouseenter', handleTeddyHover);
    teddyBear.addEventListener('click', handleTeddyClick);
}

// Handle hug
function handleHug() {
    teddyBear.classList.remove('idle', 'wiggling');
    teddyBear.classList.add('hugging');
    
    // Create heart particles
    createHeartParticles();
    
    // Haptic feedback
    if (navigator.vibrate) {
        navigator.vibrate([50, 30, 50]);
    }
    
    setTimeout(() => {
        teddyBear.classList.remove('hugging');
        teddyBear.classList.add('idle');
    }, 1000);
}

// Handle teddy hover
function handleTeddyHover() {
    // Teddy looks at cursor - handled by CSS
}

// Handle teddy click
function handleTeddyClick() {
    teddyBear.classList.remove('idle');
    teddyBear.classList.add('wiggling');
    
    setTimeout(() => {
        teddyBear.classList.remove('wiggling');
        teddyBear.classList.add('idle');
    }, 1500);
}

// Handle size change
function handleSizeChange(btn) {
    sizeButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const size = btn.dataset.size;
    state.size = size;
    
    // Scale teddy
    let scale = 1;
    if (size === 'small') scale = 0.8;
    if (size === 'large') scale = 1.2;
    
    teddyBear.style.transform = `scale(${scale})`;
    
    // Bounce effect
    teddyBear.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
}

// Handle color change
function handleColorChange(btn) {
    colorButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const color = btn.dataset.color;
    state.color = color;
    
    // Update teddy color with gradient
    const teddyParts = teddyBear.querySelectorAll('.teddy-part');
    const gradient = createColorGradient(color);
    
    teddyParts.forEach(part => {
        part.setAttribute('fill', gradient);
    });
    
    // Update gradient definition
    updateTeddyGradient(color);
}

// Create color gradient
function createColorGradient(baseColor) {
    return `url(#teddyGradient)`;
}

// Update teddy gradient
function updateTeddyGradient(baseColor) {
    const gradient = teddyBear.querySelector('#teddyGradient');
    if (!gradient) return;
    
    // Calculate lighter shade
    const lighter = lightenColor(baseColor, 20);
    
    const stops = gradient.querySelectorAll('stop');
    stops[0].style.stopColor = lighter;
    stops[1].style.stopColor = baseColor;
}

// Lighten color helper
function lightenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (
        0x1000000 +
        (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)
    ).toString(16).slice(1);
}

// Handle accessory toggle
function handleAccessoryToggle(btn) {
    const accessory = btn.dataset.accessory;
    
    if (state.accessories.includes(accessory)) {
        // Remove accessory
        state.accessories = state.accessories.filter(a => a !== accessory);
        btn.classList.remove('selected');
        removeAccessory(accessory);
    } else {
        // Add accessory
        state.accessories.push(accessory);
        btn.classList.add('selected');
        addAccessory(accessory);
    }
    
    // Bounce effect
    btn.style.transform = 'scale(1.1)';
    setTimeout(() => {
        btn.style.transform = '';
    }, 200);
}

// Add accessory to teddy
function addAccessory(type) {
    const accessoryGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    accessoryGroup.setAttribute('class', `accessory accessory-${type}`);
    
    switch(type) {
        case 'bowtie':
            accessoryGroup.innerHTML = `
                <ellipse cx="150" cy="170" rx="15" ry="8" fill="#FF69B4" />
                <ellipse cx="120" cy="170" rx="20" ry="15" fill="#FF1493" />
                <ellipse cx="180" cy="170" rx="20" ry="15" fill="#FF1493" />
            `;
            break;
        case 'heart':
            accessoryGroup.innerHTML = `
                <path d="M 150 200 L 160 190 Q 165 185 165 180 Q 165 175 160 175 Q 155 175 150 180 Q 145 175 140 175 Q 135 175 135 180 Q 135 185 140 190 Z" fill="#FF0040" />
            `;
            break;
        case 'ribbon':
            accessoryGroup.innerHTML = `
                <rect x="140" y="65" width="20" height="4" fill="#FFD700" />
                <path d="M 135 69 L 140 80 L 145 69 Z" fill="#FFD700" />
                <path d="M 155 69 L 160 80 L 165 69 Z" fill="#FFD700" />
            `;
            break;
        case 'glasses':
            accessoryGroup.innerHTML = `
                <ellipse cx="125" cy="95" rx="18" ry="15" fill="none" stroke="#333" stroke-width="2" />
                <ellipse cx="175" cy="95" rx="18" ry="15" fill="none" stroke="#333" stroke-width="2" />
                <line x1="143" y1="95" x2="157" y2="95" stroke="#333" stroke-width="2" />
            `;
            break;
        case 'hat':
            accessoryGroup.innerHTML = `
                <ellipse cx="150" cy="35" rx="35" ry="8" fill="#1a1a1a" />
                <rect x="130" y="25" width="40" height="20" fill="#2C2C2C" rx="5" />
                <rect x="110" y="45" width="80" height="5" fill="#1a1a1a" rx="2" />
            `;
            break;
    }
    
    // Add animation
    accessoryGroup.style.opacity = '0';
    accessoryGroup.style.transform = 'scale(0)';
    teddyAccessories.appendChild(accessoryGroup);
    
    // Animate in
    setTimeout(() => {
        accessoryGroup.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        accessoryGroup.style.opacity = '1';
        accessoryGroup.style.transform = 'scale(1)';
    }, 10);
}

// Remove accessory from teddy
function removeAccessory(type) {
    const accessory = teddyAccessories.querySelector(`.accessory-${type}`);
    if (accessory) {
        accessory.style.transition = 'all 0.3s ease';
        accessory.style.opacity = '0';
        accessory.style.transform = 'scale(0)';
        setTimeout(() => accessory.remove(), 300);
    }
}

// Create heart particles
function createHeartParticles() {
    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.style.position = 'fixed';
        heart.style.fontSize = '20px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        
        const rect = teddyBear.getBoundingClientRect();
        heart.style.left = rect.left + rect.width / 2 + 'px';
        heart.style.top = rect.top + rect.height / 2 + 'px';
        
        document.body.appendChild(heart);
        
        const angle = (Math.PI * 2 / 12) * i;
        const distance = 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance - 50;
        
        heart.animate([
            { transform: 'translate(0, 0) scale(0)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(1)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => heart.remove();
    }
}

// Start idle animation
function startIdleAnimation() {
    teddyBear.classList.add('idle');
}

// Initialize on load
window.addEventListener('DOMContentLoaded', init);