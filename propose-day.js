document.addEventListener('DOMContentLoaded', function() {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const successMessage = document.getElementById('success-message');
    const questionCard = document.querySelector('.question-card');
    const retryBtn = document.getElementById('retry-btn');
    let yesBtnScale = 1;
    let noButtonEscapes = 0;
    
    retryBtn.addEventListener('click', function() {
        location.reload();
    });
    
    // Yes button click handler
    yesBtn.addEventListener('click', function() {
        showSuccessMessage();
    });
    
    // No button hover/click escape mechanism
    noBtn.addEventListener('mouseenter', function(e) {
        moveNoButton();
    });
    
    noBtn.addEventListener('click', function(e) {
        e.preventDefault();
        handleNoClick();
    });
    
    // Touch events for mobile
    noBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        moveNoButton();
    });
    
    // Mouse move detection for slow movement
    let mouseNearNo = false;
    document.addEventListener('mousemove', function(e) {
        const noRect = noBtn.getBoundingClientRect();
        const distance = Math.sqrt(
            Math.pow(e.clientX - (noRect.left + noRect.width / 2), 2) +
            Math.pow(e.clientY - (noRect.top + noRect.height / 2), 2)
        );
        
        // If mouse is getting close to No button, move it slowly
        if (distance < 100 && !mouseNearNo) {
            mouseNearNo = true;
            setTimeout(() => {
                moveNoButtonSlowly();
                mouseNearNo = false;
            }, 500); // Slow movement
        }
    });
    
    // Move no button away from cursor (fast movement)
    function moveNoButton() {
        const container = document.querySelector('.buttons-container');
        const containerRect = container.getBoundingClientRect();
        
        // Add escaping class for smooth animation
        noBtn.classList.add('escaping');
        
        // Generate random position within container
        const maxX = containerRect.width - 100;
        const maxY = containerRect.height - 50;
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        // Apply new position
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        
        // Remove escaping class after animation
        setTimeout(() => {
            noBtn.classList.remove('escaping');
        }, 800);
        
        noButtonEscapes++;
    }
    
    // Move no button slowly (for proximity detection)
    function moveNoButtonSlowly() {
        const container = document.querySelector('.buttons-container');
        const containerRect = container.getBoundingClientRect();
        
        // Generate random position within container (further away)
        const maxX = containerRect.width - 120;
        const maxY = containerRect.height - 60;
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        // Apply new position with slower transition
        noBtn.style.transition = 'all 2s ease-in-out';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        
        // Reset transition
        setTimeout(() => {
            noBtn.style.transition = 'all 0.5s ease';
        }, 2000);
    }
    
    // Handle when no button is somehow clicked
    function handleNoClick() {
        // Increase size of YES button
        yesBtnScale *= 1.1;
        yesBtn.style.transform = `scale(${yesBtnScale})`;
        yesBtn.style.fontSize = `${1.1 * yesBtnScale}rem`;
        yesBtn.style.padding = `${1 * yesBtnScale}rem ${2 * yesBtnScale}rem`;
        yesBtn.style.boxShadow = `0 ${4 * yesBtnScale}px ${20 * yesBtnScale}px rgba(255, 107, 107, ${0.3 * yesBtnScale})`;
        
        createHeartBurst(yesBtn);
        
        // Reposition NO button to avoid being behind YES button
        repositionNoButton();
    }
    
// Reposition NO button when YES gets too big
    function repositionNoButton() {
        const container = document.querySelector('.buttons-container');
        const containerRect = container.getBoundingClientRect();
        const yesRect = yesBtn.getBoundingClientRect();
        
        // Always ensure container has enough space
        ensurePlaygroundSize();
        
        // If YES button is getting large, move NO to a safe position
        if (yesBtnScale >= 1.2) {
            // Force NO button to be absolute positioned
            noBtn.style.position = 'absolute';
            
            // Calculate safe position within container bounds
            const buttonWidth = 100;
            const buttonHeight = 50;
            
            // Get fresh container rect after size changes
            const freshContainerRect = container.getBoundingClientRect();
            
            // Find opposite side from YES button
            const isYesOnRight = (yesRect.left - freshContainerRect.left) > freshContainerRect.width / 2;
            const safeX = isYesOnRight 
                ? 20 // Left side
                : Math.max(20, freshContainerRect.width - buttonWidth - 20); // Right side
            
            // Position NO button in a safe corner
            const safeY = Math.max(20, freshContainerRect.height - buttonHeight - 20); // Bottom area
            
            // Apply positioning
            noBtn.style.left = safeX + 'px';
            noBtn.style.top = safeY + 'px';
            noBtn.style.zIndex = '3'; // Same level as YES (3)
            
            // Ensure it's visible
            noBtn.style.opacity = '0.8';
            noBtn.style.pointerEvents = 'auto';
        } else {
            // Keep normal flex layout
            noBtn.style.position = 'relative';
            noBtn.style.left = '';
            noBtn.style.top = '';
            noBtn.style.zIndex = '3';
        }
    }
    
    // Ensure playground has enough space for both buttons
    function ensurePlaygroundSize() {
        if (yesBtnScale >= 1.5) {
            const container = document.querySelector('.buttons-container');
            const containerRect = container.getBoundingClientRect();
            
            // Expand playground height to ensure NO button stays visible
            const neededHeight = Math.max(60, 100 + (yesBtnScale * 20));
            
            if (neededHeight > containerRect.height) {
                container.style.minHeight = neededHeight + 'px';
            }
            
            // Ensure container width is adequate
            const neededWidth = Math.max(400, 300 + (yesBtnScale * 50));
            if (neededWidth > containerRect.width) {
                container.style.maxWidth = neededWidth + 'px';
            }
        }
    }

    // Ensure NO button doesn't overlap with YES button
    function ensureNoOverlap() {
        if (yesBtnScale >= 1.5) {
            const container = document.querySelector('.buttons-container');
            const containerRect = container.getBoundingClientRect();
            
            // Expand container height to accommodate NO button above YES
            const currentHeight = containerRect.height;
            const neededHeight = 120 + (yesBtnScale * 20);
            
            if (neededHeight > currentHeight) {
                container.style.minHeight = neededHeight + 'px';
                
                // Position NO button above YES if YES is large
                noBtn.style.top = '10px';
                yesBtn.style.marginTop = '80px';
            }
        }
    }
    
    // Show success message
    function showSuccessMessage() {
        // Hide buttons and show success
        const buttonsContainer = document.querySelector('.buttons-container');
        buttonsContainer.style.display = 'none';
        
        // Show success message
        successMessage.style.display = 'block';
        
        // Create celebration
        createCelebration();
        
        // Add confetti
        launchConfetti();
    }
    
    // Make yes button fill screen when too large
    function makeYesButtonFillScreen() {
        yesBtn.style.position = 'fixed';
        yesBtn.style.top = '50%';
        yesBtn.style.left = '50%';
        yesBtn.style.transform = 'translate(-50%, -50%) scale(10)';
        yesBtn.style.width = '100vw';
        yesBtn.style.height = '100vh';
        yesBtn.style.fontSize = '3rem';
        yesBtn.style.zIndex = '9999';
        yesBtn.style.borderRadius = '0';
        
        // Force click after delay
        setTimeout(() => {
            yesBtn.click();
        }, 1000);
    }
    
    // Create heart burst effect
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
    
    // Create celebration effect
    function createCelebration() {
        const hearts = ['❤️', '💕', '💖', '💗', '💝', '🌹', '💐'];
        const container = successMessage;
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.position = 'fixed';
                heart.style.left = Math.random() * 100 + '%';
                heart.style.top = '-50px';
                heart.style.fontSize = (1 + Math.random() * 2) + 'rem';
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '1001';
                
                document.body.appendChild(heart);
                
                heart.animate([
                    {
                        transform: 'translateY(0) rotate(0deg)',
                        opacity: 1
                    },
                    {
                        transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 720}deg)`,
                        opacity: 0
                    }
                ], {
                    duration: 3000 + Math.random() * 2000,
                    easing: 'linear'
                }).onfinish = () => {
                    heart.remove();
                };
            }, i * 100);
        }
    }
    
    // Launch confetti
    function launchConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffd93d', '#ff6b9d'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1000';
            
            document.body.appendChild(confetti);
            
            const angle = Math.random() * 360;
            const velocity = 2 + Math.random() * 3;
            const horizontalVelocity = Math.cos(angle) * velocity;
            
            confetti.animate([
                {
                    transform: 'translate(0, 0) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: `translate(${horizontalVelocity * 100}px, ${window.innerHeight + 20}px) rotate(${Math.random() * 720}deg)`,
                    opacity: 0
                }
            ], {
                duration: 3000 + Math.random() * 2000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => {
                confetti.remove();
            };
        }
    }
    
    // Add subtle background animation
    function animateBackground() {
    }

});