// Rose Day JavaScript - Full of Love and Micro-interactions!

document.addEventListener('DOMContentLoaded', function() {
    // Launch confetti on page load
    launchConfetti();
    
    // Create floating roses
    createFloatingRoses();
    
    // Initialize interactions
    initializeTypingEffect();
    initializeRoseCards();
    initializeEnvelope();
    initializeSendButton();
    initializeLoveNotes();
});

// Confetti Animation with Hearts and Roses
function launchConfetti() {
    const container = document.querySelector('.confetti-container');
    const confettiItems = ['🌹', '🌸', '❤️', '💕', '💖', '🌷'];
    const colors = ['#ff6b9d', '#ff8fa3', '#ffb3c1', '#ffc0cb', '#ffd6e3'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDuration = (2 + Math.random() * 3) + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            
            // Randomly choose between emoji and colored pieces
            if (Math.random() > 0.5) {
                confetti.textContent = confettiItems[Math.floor(Math.random() * confettiItems.length)];
                confetti.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
                confetti.style.background = 'transparent';
                confetti.style.width = 'auto';
                confetti.style.height = 'auto';
            } else {
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            }
            
            container.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 100);
    }
}

// Create Floating Roses
function createFloatingRoses() {
    const container = document.querySelector('.floating-roses');
    const roses = ['🌹', '🌸', '🌷', '🌺'];
    
    for (let i = 0; i < 8; i++) {
        const rose = document.createElement('div');
        rose.className = 'floating-rose';
        rose.textContent = roses[Math.floor(Math.random() * roses.length)];
        rose.style.left = Math.random() * 100 + '%';
        rose.style.animationDelay = Math.random() * 15 + 's';
        rose.style.animationDuration = (15 + Math.random() * 10) + 's';
        rose.style.fontSize = (1.5 + Math.random() * 2) + 'rem';
        
        container.appendChild(rose);
    }
}

// Typing Effect for Love Message
function initializeTypingEffect() {
    const message = "Every rose has its thorn, but our love is pure and unconditional. You bring color to my world like the most beautiful cherry blossom.";
    const messageElement = document.getElementById('love-message');
    let charIndex = 0;
    
    function typeChar() {
        if (charIndex < message.length) {
            messageElement.textContent += message[charIndex];
            
            // Show rose icon on first keystroke
            
            
            charIndex++;
            setTimeout(typeChar, 50);
        }
    }
    
    // Start typing after a delay
    setTimeout(typeChar, 1000);
}

// Rose Cards Interaction
function initializeRoseCards() {
    const cards = document.querySelectorAll('.rose-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove previous selection
            cards.forEach(c => c.classList.remove('selected'));
            
            // Add selection to clicked card
            this.classList.add('selected');
            
            // Create falling petals
            createFallingPetals(this);
            
            // Add gentle bloom animation
            const roseImage = this.querySelector('.rose-image');
            roseImage.style.transform = 'scale(1.2)';
            setTimeout(() => {
                roseImage.style.transform = 'scale(1.1)';
            }, 300);
        });
        
        // Hover effects
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('selected')) {
                this.querySelector('.rose-image').style.transform = 'scale(1.05) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.querySelector('.rose-image').style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Create Falling Petals Effect
function createFallingPetals(card) {
    const rect = card.getBoundingClientRect();
    const colors = ['#ff6b9d', '#ff8fa3', '#ffb3c1'];
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.style.position = 'fixed';
            petal.style.left = rect.left + rect.width / 2 + 'px';
            petal.style.top = rect.top + rect.height / 2 + 'px';
            petal.style.width = '15px';
            petal.style.height = '15px';
            petal.style.background = colors[Math.floor(Math.random() * colors.length)];
            petal.style.borderRadius = '0 100% 0 100%';
            petal.style.pointerEvents = 'none';
            petal.style.zIndex = '1000';
            
            document.body.appendChild(petal);
            
            // Animate petal falling
            const angle = (Math.random() - 0.5) * 60;
            const distance = 100 + Math.random() * 100;
            
            petal.animate([
                {
                    transform: 'translate(0, 0) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: `translate(${angle * 2}px, ${distance}px) rotate(${Math.random() * 360}deg)`,
                    opacity: 0.8
                },
                {
                    transform: `translate(${angle * 3}px, ${distance * 2}px) rotate(${Math.random() * 720}deg)`,
                    opacity: 0
                }
            ], {
                duration: 2000 + Math.random() * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => {
                petal.remove();
            };
        }, i * 100);
    }
}

// Envelope Interaction
function initializeEnvelope() {
    const envelope = document.getElementById('envelope');
    const previewText = document.getElementById('preview-text');
    const messages = [
        "I turn to you for light for my happiness 🌹",
        "You make my cherry blossom 🌸",
        "Every moment with you is a treasure 💮",
        "You are the garden where my soul finds peace 💐",
        "You're the sunflower, I think your love would be too much 🌻",
        "You are my forever and always 🌷",
        "You ligth up my world like nobody else 🌼",
        "You feel like light warm day just after rain 🌺"
    ];
    
    envelope.addEventListener('click', function() {
        if (!this.classList.contains('open')) {
            this.classList.add('open');
            
            // Heartbeat animation
            const heartSeal = this.querySelector('.heart-seal');
            heartSeal.style.animation = 'heartbeat 1s ease-in-out 3';
            
            // Change preview text
            previewText.textContent = messages[Math.floor(Math.random() * messages.length)];
            previewText.style.animation = 'fadeIn 0.5s ease';
            
            // Remove heartbeat animation after completion
            setTimeout(() => {
                heartSeal.style.animation = '';
            }, 3000);
        } else {
            this.classList.remove('open');
        }
    });
}

// Add heartbeat keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes heartbeat {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        25% { transform: translate(-50%, -50%) scale(1.3); }
        50% { transform: translate(-50%, -50%) scale(1); }
        75% { transform: translate(-50%, -50%) scale(1.2); }
    }
`;
document.head.appendChild(style);

// Send Button Interaction
function initializeSendButton() {
    const sendButton = document.getElementById('send-rose');
    const successMessage = document.getElementById('success-message');
    
    sendButton.addEventListener('click', function() {
        // Create petal explosion
        createPetalExplosion(this);
        
        // Show success message
        setTimeout(() => {
            successMessage.style.display = 'block';
            this.style.display = 'none';
            
            // Create celebration confetti
            launchMiniConfetti();
        }, 500);
    });
}

// Petal Explosion Effect
function createPetalExplosion(button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const colors = ['#ff6b9d', '#ff8fa3', '#ffb3c1', '#ffc0cb'];
    
    for (let i = 0; i < 20; i++) {
        const petal = document.createElement('div');
        petal.style.position = 'fixed';
        petal.style.left = centerX + 'px';
        petal.style.top = centerY + 'px';
        petal.style.width = '12px';
        petal.style.height = '12px';
        petal.style.background = colors[Math.floor(Math.random() * colors.length)];
        petal.style.borderRadius = '0 100% 0 100%';
        petal.style.pointerEvents = 'none';
        petal.style.zIndex = '1001';
        
        document.body.appendChild(petal);
        
        const angle = (i / 20) * Math.PI * 2;
        const distance = 150 + Math.random() * 100;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        petal.animate([
            {
                transform: 'translate(0, 0) scale(1) rotate(0deg)',
                opacity: 1
            },
            {
                transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0.5) rotate(${Math.random() * 720}deg)`,
                opacity: 0
            }
        ], {
            duration: 1500 + Math.random() * 500,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => {
            petal.remove();
        };
    }
}

// Mini Confetti Celebration
function launchMiniConfetti() {
    const container = document.querySelector('.confetti-container');
    const celebrationItems = ['🌹', '❤️', '💕', '✨', '🌟'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.textContent = celebrationItems[Math.floor(Math.random() * celebrationItems.length)];
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-50px';
            confetti.style.fontSize = (1 + Math.random()) + 'rem';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1002';
            
            document.body.appendChild(confetti);
            
            confetti.animate([
                {
                    transform: 'translateY(0) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 720}deg)`,
                    opacity: 0
                }
            ], {
                duration: 2000 + Math.random() * 1000,
                easing: 'linear'
            }).onfinish = () => {
                confetti.remove();
            };
        }, i * 50);
    }
}

// Love Notes Animation
function initializeLoveNotes() {
    const notes = document.querySelectorAll('.note');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    });
    
    notes.forEach(note => {
        // Initially pause animations
        note.style.animationPlayState = 'paused';
        observer.observe(note);
        
        // Add hover effect
        note.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        });
        
        note.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// Start Journey Button
document.getElementById('start-journey')?.addEventListener('click', function() {
    // Smooth scroll to message section
    document.querySelector('.message-section').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    
    // Create small heart burst
    createHeartBurst(this);
});

function createHeartBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 6; i++) {
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = '1rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        
        document.body.appendChild(heart);
        
        const angle = (i / 6) * Math.PI * 2;
        const distance = 50;
        
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