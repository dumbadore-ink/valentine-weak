document.addEventListener('DOMContentLoaded', function() {
    const chocolateCards = document.querySelectorAll('.chocolate-card');
    const tasteButton = document.getElementById('taste-button');
    const messageModal = document.getElementById('message-modal');
    const personalizedMessage = document.getElementById('personalized-message');
    const personalizedTitle = document.getElementById('personalized-title');
    const closeModal = document.getElementById('close-modal');
    const floatingChips = document.querySelector('.floating-chips');
    
    let selectedChocolate = null;
    
    // Personalized messages for each chocolate type
    const messages = {
        dark: "Your sweetness comes from your class, your elegant nature. You're rich by heart. You're the perfect blend of sweet and sophisticated that makes my heart melt!",
        milk: "You are creamy, smooth, and comforting. You bring such warmth and sweetness, making every moment feel like a gentle hug!",
        nutty: "The spiciest chocolate which make me think from my second brain. Your quirky sweetness is out of the world!",
        truffle: "You are so luxurious, so decadent, indulgent, and absolutely divine. You deserve all the finest things in life, especially my endless love!"
    };

    const titles = {
        dark: "My short dark and handsome",
        milk: "My milky baby",
        nutty: "Who doesn't love a nut on their face",
        truffle: "My deviine lady"
    };

    
    // Create floating chocolate chips
    function createChocolateChip() {
        const chip = document.createElement('div');
        chip.className = 'chip';
        chip.style.left = Math.random() * 100 + '%';
        chip.style.animationDuration = (Math.random() * 3 + 2) + 's';
        chip.style.animationDelay = Math.random() * 2 + 's';
        floatingChips.appendChild(chip);
        
        setTimeout(() => {
            chip.remove();
        }, 5000);
    }
    
    // Generate chocolate chips periodically
    setInterval(createChocolateChip, 300);
    
    // Handle chocolate card selection
    chocolateCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove previous selection
            chocolateCards.forEach(c => c.classList.remove('selected'));
            
            // Add selection to clicked card
            this.classList.add('selected');
            selectedChocolate = this.dataset.chocolate;
            
            // Enable taste button
            tasteButton.disabled = false;
            
            // Add burst effect
            createBurstEffect(this);
        });
        
        // Add melt effect on hover
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = '';
            }
        });
    });
    
    // Create burst effect for chocolate selection
    function createBurstEffect(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'burst-particle';
            particle.style.position = 'fixed';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.background = '#ffeaa7';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            
            document.body.appendChild(particle);
            
            const angle = (i / 8) * Math.PI * 2;
            const distance = 50 + Math.random() * 30;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`, opacity: 0 }
            ], {
                duration: 600,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => particle.remove();
        }
    }
    
    // Handle taste button click
    tasteButton.addEventListener('click', function(e) {
        if (!selectedChocolate) return;
        
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        
        // Show message modal with delay for dramatic effect
        setTimeout(() => {
            showMessage();
        }, 300);
    });
    
    // Show personalized message
    function showMessage() {
        personalizedMessage.textContent = messages[selectedChocolate];
        personalizedTitle.textContent = titles[selectedChocolate];
        messageModal.classList.add('show');
        
        // Create celebration effects
        createCelebrationEffects();
    }
    
    // Create floating hearts and chocolates
    function createCelebrationEffects() {
        const celebrationContainer = document.querySelector('.celebration-container');
        const hearts = ['❤️', '💕', '💖', '💗', '💝'];
        const chocolates = ['🍫', '🍩', '🧁', '🍮'];
        
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'floating-heart';
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.left = Math.random() * 80 + 10 + '%';
                heart.style.bottom = '0';
                celebrationContainer.appendChild(heart);
                
                setTimeout(() => heart.remove(), 3000);
            }, i * 200);
        }
        
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                const chocolate = document.createElement('div');
                chocolate.className = 'floating-chocolate-piece';
                chocolate.textContent = chocolates[Math.floor(Math.random() * chocolates.length)];
                chocolate.style.left = Math.random() * 80 + 10 + '%';
                chocolate.style.bottom = '0';
                celebrationContainer.appendChild(chocolate);
                
                setTimeout(() => chocolate.remove(), 3000);
            }, i * 300 + 100);
        }
    }
    
    // Close modal
    closeModal.addEventListener('click', function() {
        messageModal.classList.remove('show');
        
        // Reset selection
        chocolateCards.forEach(card => card.classList.remove('selected'));
        selectedChocolate = null;
        tasteButton.disabled = true;
    });
    
    // Close modal on background click
    messageModal.addEventListener('click', function(e) {
        if (e.target === messageModal) {
            messageModal.classList.remove('show');
            
            // Reset selection
            chocolateCards.forEach(card => card.classList.remove('selected'));
            selectedChocolate = null;
            tasteButton.disabled = true;
        }
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && messageModal.classList.contains('show')) {
            messageModal.classList.remove('show');
            chocolateCards.forEach(card => card.classList.remove('selected'));
            selectedChocolate = null;
            tasteButton.disabled = true;
        }
    });
});