// Kiss Counter Challenge - Main JavaScript Game Logic

class KissCounterGame {
    constructor() {
        // Game State
        this.gameState = {
            kisses: 0,
            totalClicks: 0,
            sessionStartTime: Date.now(),
            lastClickTime: 0,
            currentCombo: 1,
            comboActive: false,
            comboTimer: null,
            highestCombo: 1,
            achievements: [],
            unlockedFacts: [],
            stats: {
                totalTimeMs: 0,
                highestKPS: 0,
                currentKPS: 0,
                lastPlayDate: null
            },
            settings: {
                soundEnabled: true,
                particlesEnabled: true
            }
        };

        // Milestones for progression
        this.milestones = [1, 10, 25, 50, 75, 100, 250, 500, 750, 1000];
        
        // Initialize the game
        this.init();
    }

    init() {
        this.loadProgress();
        this.setupEventListeners();
        this.initializeAchievements();
        this.initializeFacts();
        this.updateUI();
        this.startGameLoop();
    }

    // Achievement Definitions
    initializeAchievements() {
        this.achievements = [
            // Quantity Achievements
            { id: 'first_kiss', name: 'First Kiss', description: 'Send your first virtual kiss', icon: '💋', condition: () => this.gameState.kisses >= 1 },
            { id: 'kiss_novice', name: 'Kiss Novice', description: 'Send 10 kisses', icon: '💕', condition: () => this.gameState.kisses >= 10 },
            { id: 'kiss_enthusiast', name: 'Kiss Enthusiast', description: 'Send 25 kisses', icon: '💖', condition: () => this.gameState.kisses >= 25 },
            { id: 'kiss_expert', name: 'Kiss Expert', description: 'Send 50 kisses', icon: '💗', condition: () => this.gameState.kisses >= 50 },
            { id: 'kiss_master', name: 'Kiss Master', description: 'Send 75 kisses', icon: '💓', condition: () => this.gameState.kisses >= 75 },
            { id: 'kiss_legend', name: 'Kiss Legend', description: 'Send 100 kisses', icon: '💞', condition: () => this.gameState.kisses >= 100 },
            { id: 'kiss_inferno', name: 'Kiss Inferno', description: 'Send 500 kisses', icon: '🔥', condition: () => this.gameState.kisses >= 500 },
            { id: 'kiss_royalty', name: 'Kiss Royalty', description: 'Send 1000 kisses', icon: '👑', condition: () => this.gameState.kisses >= 1000 },
            
            // Speed Achievements
            { id: 'speed_kisser', name: 'Speed Kisser', description: 'Send 10 kisses in 5 seconds', icon: '⚡', condition: () => this.checkSpeedAchievement(10, 5) },
            { id: 'rapid_fire', name: 'Rapid Fire', description: 'Send 25 kisses in 10 seconds', icon: '🚀', condition: () => this.checkSpeedAchievement(25, 10) },
            { id: 'lightning_lover', name: 'Lightning Lover', description: 'Send 50 kisses in 15 seconds', icon: '💨', condition: () => this.checkSpeedAchievement(50, 15) },
            { id: 'kiss_storm', name: 'Kiss Storm', description: 'Send 100 kisses in 30 seconds', icon: '🌪️', condition: () => this.checkSpeedAchievement(100, 30) },
            
            // Combo Achievements
            { id: 'combo_starter', name: 'Combo Starter', description: 'Reach 2x multiplier', icon: '🎯', condition: () => this.gameState.highestCombo >= 2 },
            { id: 'combo_king', name: 'Combo King', description: 'Reach 5x multiplier', icon: '🎪', condition: () => this.gameState.highestCombo >= 5 },
            { id: 'chain_master', name: 'Chain Master', description: 'Maintain 5x for 10 seconds', icon: '🔗', condition: () => this.checkComboDuration(5, 10) },
            { id: 'unstoppable', name: 'Unstoppable', description: 'Maintain combo for 30 seconds', icon: '⚔️', condition: () => this.checkComboDuration(3, 30) },
            
            // Special Achievements
            { id: 'midnight_kisser', name: 'Midnight Kisser', description: 'Play between 11pm-1am', icon: '🌙', condition: () => this.checkTimeAchievement(23, 1) },
            { id: 'party_animal', name: 'Party Animal', description: 'Send 100 kisses on our Kiss Day', icon: '🎉', condition: () => this.checkKissDayAchievement() },
            { id: 'perfectionist', name: 'Perfectionist', description: 'Reach exactly 1,000 kisses', icon: '💯', condition: () => this.gameState.kisses === 1000 },
            { id: 'completionist', name: 'Completionist', description: 'Unlock all achievements', icon: '🏆', condition: () => this.gameState.achievements.length >= this.achievements.length - 1 }
        ];

        this.renderAchievements();
    }

    // Romantic Facts Database
    initializeFacts() {
        this.facts = [
            // Kissing Science (10 facts)
            { emoji: '🔬', text: "Kissing me burns approximately 2-3 calories per minute!", category: 'science' },
            { emoji: '💊', text: "Kissing me releases oxytocin, known as the 'love hormone'", category: 'science' },
            { emoji: '⏰', text: "We will spend 336+ hours kissing each other in our lifetime", category: 'science' },
            { emoji: '👆', text: "Your lips are 100x more sensitive than your fingertips", category: 'science' },
            { emoji: '👥', text: "Two-thirds of people tilt their head right when kissing", category: 'science' },
            { emoji: '💪', text: "Our passionate kiss uses 34 facial muscles", category: 'science' },
            { emoji: '🛡️', text: "Kissing me can boost your immune system!", category: 'science' },
            { emoji: '🏆', text: "The longest kiss ever recorded lasted 58 hours, 35 minutes", category: 'science' },
            { emoji: '🩸', text: "Your lips get their pink/red color from visible blood vessels", category: 'science' },
            { emoji: '😌', text: "Kissing you reduces stress hormone cortisol levels", category: 'science' },
            
            // Kissing History (10 facts)
            { emoji: '🎬', text: "The first on-screen kiss was in 1896 in 'The Kiss' film", category: 'history' },
            { emoji: '🏛️', text: "Ancient Rome had 3 kiss types: Osculum, Basium, and Saviolum", category: 'history' },
            { emoji: '⚔️', text: "In medieval times, knights kissed before tournaments for luck", category: 'history' },
            { emoji: '🌿', text: "Kissing under mistletoe dates back to Norse mythology", category: 'history' },
            { emoji: '📖', text: "The word 'kiss' comes from Old English 'cyssan'", category: 'history' },
            { emoji: '👑', text: "In 1439, King Henry VI banned kissing in England to stop disease", category: 'history' },
            { emoji: '❌', text: "The X became a kiss symbol in medieval times", category: 'history' },
            { emoji: '📜', text: "Ancient India's Kama Sutra describes 30 types of kisses", category: 'history' },
            { emoji: '✉️', text: "Victorian era lovers used kiss codes in letters", category: 'history' },
            { emoji: '😘', text: "The kissy face emoji 😘 was added to Unicode in 2010", category: 'history' },
            
            // Kissing Culture (10 facts)
            { emoji: '🔒', text: "In Paris, couples lock 'love locks' on bridges after kissing", category: 'culture' },
            { emoji: '👃', text: "Some cultures greet with nose rubs instead of kisses", category: 'culture' },
            { emoji: '🇯🇵', text: "In Japan, public kissing was taboo until recently", category: 'culture' },
            { emoji: '🇮🇹', text: "Italians kiss twice on alternating cheeks as greeting", category: 'culture' },
            { emoji: '🇫🇷', text: "The French kiss is called 'English kiss' in France", category: 'culture' },
            { emoji: '🚫', text: "In some countries, kissing in public is illegal", category: 'culture' },
            { emoji: '❄️', text: "Eskimo kisses (nose rubbing) are actually called 'kunik'", category: 'culture' },
            { emoji: '🤝', text: "In medieval Europe, contracts were sealed with a kiss", category: 'culture' },
            { emoji: '🏕️', text: "Some Native American tribes didn't kiss before European contact", category: 'culture' },
            { emoji: '🇹🇭', text: "In Thailand, the traditional kiss is a sniff", category: 'culture' },
            
            // Fun Kiss Facts (10 facts)
            { emoji: '👀', text: "More than half of people close their eyes when kissing", category: 'fun' },
            { emoji: '❤️', text: "Couples who kiss regularly live 5 years longer on average", category: 'fun' },
            { emoji: '🌶️', text: "Your lips are more sensitive after eating spicy food", category: 'fun' },
            { emoji: '🔬', text: "Scientists study kissing in a field called 'philematology'", category: 'fun' },
            { emoji: '🤝', text: "Kissing someone is more hygienic than shaking hands", category: 'fun' },
            { emoji: '🌍', text: "The act of kissing is found in 90% of cultures worldwide", category: 'fun' },
            { emoji: '👄', text: "Lips are made of the same skin as other intimate areas", category: 'fun' },
            { emoji: '💓', text: "Passionate kissing can increase your heart rate to 150 bpm", category: 'fun' },
            { emoji: '😷', text: "Bad breath is the #1 kissing dealbreaker", category: 'fun' },
            { emoji: '👃', text: "Kissing helps you choose compatible partners via pheromones", category: 'fun' }
        ];

        this.renderFacts();
    }

    // Event Listeners
    setupEventListeners() {
        const kissButton = document.getElementById('kiss-button');
        const settingsBtn = document.getElementById('settings-btn');
        const soundToggle = document.getElementById('sound-toggle');
        const resetBtn = document.getElementById('reset-btn');
        const resetConfirm = document.getElementById('reset-confirm');
        const resetCancel = document.getElementById('reset-cancel');

        // Main click handler
        kissButton.addEventListener('click', (e) => this.handleKissClick(e));
        
        // Settings menu toggle
        settingsBtn.addEventListener('click', () => this.toggleSettingsMenu());
        
        // Sound toggle
        soundToggle.addEventListener('click', () => this.toggleSound());
        
        // Reset game
        resetBtn.addEventListener('click', () => this.showResetModal());
        resetConfirm.addEventListener('click', () => this.resetGame());
        resetCancel.addEventListener('click', () => this.hideResetModal());

        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.handleKissClick();
            }
            if (e.code === 'Escape') {
                this.hideResetModal();
            }
        });

        // Close settings menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.settings')) {
                document.getElementById('settings-menu').classList.remove('show');
            }
        });
    }

    // Main Game Logic
    handleKissClick(e) {
        const timestamp = Date.now();
        const timeSinceLastClick = timestamp - this.gameState.lastClickTime;
        
        // Determine if combo should activate
        let multiplier = 1;
        if (timeSinceLastClick < 500 && this.gameState.currentCombo < 5) {
            this.gameState.currentCombo++;
            multiplier = this.gameState.currentCombo;
            this.gameState.comboActive = true;
        } else {
            this.gameState.currentCombo = 1;
            this.gameState.comboActive = false;
        }
        
        // Update highest combo
        if (this.gameState.currentCombo > this.gameState.highestCombo) {
            this.gameState.highestCombo = this.gameState.currentCombo;
        }
        
        // Increment kisses
        this.incrementKisses(multiplier);
        
        // Create visual effects
        if (e) {
            const rect = e.target.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            this.createParticleBurst(x, y);
        }
        
        // Play sound
        this.playKissSound();
        
        // Update combo
        this.updateCombo(multiplier);
        
        // Update stats
        this.gameState.totalClicks++;
        this.gameState.lastClickTime = timestamp;
        
        // Check for achievements and milestones
        this.checkMilestones();
        this.checkAchievements();
    
        
        // Update UI
        this.updateUI();
        
        // Save progress
        this.saveProgress();
    }

    incrementKisses(amount) {
        const targetKisses = this.gameState.kisses + amount;
        this.animateNumber(this.gameState.kisses, targetKisses, 200);
        this.gameState.kisses = targetKisses;
    }

    updateCombo(multiplier) {
        const comboElement = document.getElementById('combo-multiplier');
        const comboValue = document.getElementById('combo-value');
        
        if (multiplier > 1) {
            comboValue.textContent = `${multiplier}x`;
            comboElement.classList.add('active');
            
            // Clear existing timer
            if (this.gameState.comboTimer) {
                clearTimeout(this.gameState.comboTimer);
            }
            
            // Set new timer to reset combo
            this.gameState.comboTimer = setTimeout(() => {
                this.resetCombo();
            }, 1000);
        } else {
            this.resetCombo();
        }
    }

    resetCombo() {
        const comboElement = document.getElementById('combo-multiplier');
        comboElement.classList.remove('active');
        this.gameState.currentCombo = 1;
        this.gameState.comboActive = false;
        
        if (this.gameState.comboTimer) {
            clearTimeout(this.gameState.comboTimer);
            this.gameState.comboTimer = null;
        }
    }

    checkMilestones() {
        // Calculate how many facts should be unlocked at current kiss count
        const factsToUnlock = this.calculateFactsToUnlock(this.gameState.kisses);
        
        // Unlock any new facts
        factsToUnlock.forEach(factIndex => {
            if (!this.gameState.unlockedFacts.includes(factIndex)) {
                this.unlockFact(factIndex);
            }
        });
        
        // Check for milestone celebration
        const currentMilestone = this.milestones.find(milestone => this.gameState.kisses >= milestone);
        const previousMilestone = this.milestones.filter(m => this.gameState.kisses < m).length;
        if (currentMilestone && previousMilestone !== this.milestones.filter(m => this.gameState.kisses >= m).length) {
            this.triggerMilestoneCelebration(currentMilestone);
        }
        
        this.updateProgressBar();
    }

    getNextMilestone() {
        return this.milestones.find(milestone => this.gameState.kisses < milestone);
    }

    updateProgressBar() {
        const nextMilestone = this.getNextMilestone();
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        
        if (nextMilestone) {
            const previousMilestone = this.milestones[this.milestones.indexOf(nextMilestone) - 1] || 0;
            const progress = ((this.gameState.kisses - previousMilestone) / (nextMilestone - previousMilestone)) * 100;
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `${this.gameState.kisses} / ${nextMilestone}`;
        } else {
            progressFill.style.width = '100%';
            progressText.textContent = `${this.formatNumber(this.gameState.kisses)} - MAX LEVEL!`;
        }
    }

calculateFactsToUnlock(kisses) {
        const factsToUnlock = [];
        
        // Calculate facts based on kiss count - all 40 facts by 1000 kisses
        if (kisses >= 1) factsToUnlock.push(0);  // 1 kiss = 1st fact
        if (kisses >= 10) factsToUnlock.push(1); // 10 kisses = 2nd fact
        if (kisses >= 25) factsToUnlock.push(2); // 25 kisses = 3rd fact
        if (kisses >= 50) factsToUnlock.push(3); // 50 kisses = 4th fact
        if (kisses >= 75) factsToUnlock.push(4); // 75 kisses = 5th fact
        if (kisses >= 100) {
            // 100 kisses = unlock facts 5-9 (5 more facts)
            for (let i = 5; i < 10; i++) factsToUnlock.push(i);
        }
        if (kisses >= 250) {
            // 250 kisses = unlock facts 10-19 (10 more facts)
            for (let i = 10; i < 20; i++) factsToUnlock.push(i);
        }
        if (kisses >= 500) {
            // 500 kisses = unlock facts 20-29 (10 more facts)
            for (let i = 20; i < 30; i++) factsToUnlock.push(i);
        }
        if (kisses >= 750) {
            // 750 kisses = unlock facts 30-35 (6 more facts)
            for (let i = 30; i < 36; i++) factsToUnlock.push(i);
        }
        if (kisses >= 1000) {
            // 1000 kisses = unlock remaining facts 36-39 (4 more facts)
            for (let i = 36; i < 40; i++) factsToUnlock.push(i);
        }
        
        return factsToUnlock;
    }

    updateNextFactIndicator() {
        const nextFactCount = document.getElementById('next-fact-count');
        const nextFactFill = document.getElementById('next-fact-fill');
        const nextFactIndicator = document.querySelector('.next-fact-indicator');
        
        // Calculate current and next fact milestones
        const currentFactsCount = this.calculateFactsToUnlock(this.gameState.kisses).length;
        const nextFactIndex = this.gameState.unlockedFacts.length;
        
        if (nextFactIndex < 40) {
            // Find the next milestone that unlocks new facts
            const nextMilestone = this.getNextFactMilestone();
            
            if (nextMilestone) {
                const kissesNeeded = nextMilestone.kisses - this.gameState.kisses;
                const previousMilestone = nextMilestone.previous || 0;
                const progress = ((this.gameState.kisses - previousMilestone) / (nextMilestone.kisses - previousMilestone)) * 100;
                
                nextFactCount.textContent = `${kissesNeeded} kisses`;
                nextFactFill.style.width = `${progress}%`;
                nextFactIndicator.classList.remove('maxed');
            } else {
                nextFactCount.textContent = 'All facts!';
                nextFactFill.style.width = '100%';
                nextFactIndicator.classList.add('maxed');
            }
        } else {
            // All facts unlocked
            nextFactCount.textContent = 'All facts!';
            nextFactFill.style.width = '100%';
            nextFactIndicator.classList.add('maxed');
        }
    }

    getNextFactMilestone() {
        const milestones = [
            { kisses: 1, previous: 0 },
            { kisses: 10, previous: 1 },
            { kisses: 25, previous: 10 },
            { kisses: 50, previous: 25 },
            { kisses: 75, previous: 50 },
            { kisses: 100, previous: 75 },
            { kisses: 250, previous: 100 },
            { kisses: 500, previous: 250 },
            { kisses: 750, previous: 500 },
            { kisses: 1000, previous: 750 }
        ];
        
        return milestones.find(m => this.gameState.kisses < m.kisses);
    }

    // Achievement System
    checkAchievements() {
        this.achievements.forEach(achievement => {
            if (!this.isAchievementUnlocked(achievement.id) && achievement.condition()) {
                this.unlockAchievement(achievement.id);
            }
        });
    }

    isAchievementUnlocked(id) {
        return this.gameState.achievements.includes(id);
    }

    unlockAchievement(id) {
        const achievement = this.achievements.find(a => a.id === id);
        if (!achievement) return;
        
        this.gameState.achievements.push(id);
        this.showAchievementNotification(achievement);
        this.updateAchievementUI();
        this.createConfetti();
        
        // Check for completionist achievement
        if (this.gameState.achievements.length >= this.achievements.length - 1) {
            const completionist = this.achievements.find(a => a.id === 'completionist');
            if (completionist && !this.isAchievementUnlocked('completionist')) {
                setTimeout(() => this.unlockAchievement('completionist'), 1000);
            }
        }
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'notification achievement';
        notification.innerHTML = `
            <div class="notification-title">🎉 Achievement Unlocked!</div>
            <div class="notification-description">${achievement.icon} ${achievement.name}</div>
        `;
        
        const container = document.getElementById('notification-container');
        container.appendChild(notification);
        
        // Auto dismiss after 4 seconds
        setTimeout(() => {
            notification.remove();
        }, 4000);
        
        // Click to dismiss
        notification.addEventListener('click', () => notification.remove());
    }

    updateAchievementUI() {
        const achievementGrid = document.getElementById('achievement-grid');
        const achievementCount = document.getElementById('achievement-count');
        
        achievementCount.textContent = `${this.gameState.achievements.length}/${this.achievements.length}`;
        
        this.renderAchievements();
    }

    renderAchievements() {
        const achievementGrid = document.getElementById('achievement-grid');
        achievementGrid.innerHTML = '';
        
        this.achievements.forEach(achievement => {
            const isUnlocked = this.isAchievementUnlocked(achievement.id);
            const achievementElement = document.createElement('div');
            achievementElement.className = `achievement-item ${isUnlocked ? 'unlocked' : 'locked'}`;
            
            // Create tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'achievement-tooltip';
            
            if (isUnlocked) {
                tooltip.innerHTML = `
                    <div class="tooltip-title">${achievement.icon} ${achievement.name}</div>
                    <div class="tooltip-description">✓ Completed!</div>
                `;
            } else {
                tooltip.innerHTML = `
                    <div class="tooltip-title">${achievement.icon} ${achievement.name}</div>
                    <div class="tooltip-description">${achievement.description}</div>
                `;
            }
            
            achievementElement.textContent = achievement.icon;
            achievementElement.appendChild(tooltip);
            
            achievementGrid.appendChild(achievementElement);
        });
    }

    // Facts System
    unlockFact(index) {
        if (index < this.facts.length && !this.gameState.unlockedFacts.includes(index)) {
            this.gameState.unlockedFacts.push(index);
            const fact = this.facts[index];
            this.showFactNotification(fact);
            this.updateFactsUI();
        }
    }

    showFactNotification(fact) {
        const notification = document.createElement('div');
        notification.className = 'notification fact';
        notification.innerHTML = `
            <div class="notification-title">📚 Fun Fact Unlocked!</div>
            <div class="notification-description">${fact.emoji} ${fact.text}</div>
        `;
        
        const container = document.getElementById('notification-container');
        container.appendChild(notification);
        
        // Auto dismiss after 6 seconds
        setTimeout(() => {
            notification.remove();
        }, 6000);
        
        // Click to dismiss
        notification.addEventListener('click', () => notification.remove());
    }

    updateFactsUI() {
        const factsCount = document.getElementById('facts-count');
        factsCount.textContent = `${this.gameState.unlockedFacts.length}/${this.facts.length}`;
        
        this.renderFacts();
    }

    renderFacts() {
        const factsContainer = document.getElementById('facts-container');
        factsContainer.innerHTML = '';
        
        this.facts.forEach((fact, index) => {
            const isUnlocked = this.gameState.unlockedFacts.includes(index);
            const factCard = document.createElement('div');
            factCard.className = `fact-card ${isUnlocked ? 'unlocked' : 'locked'}`;
            
            if (isUnlocked) {
                factCard.innerHTML = `
                    <span class="fact-emoji">${fact.emoji}</span>
                    <div class="fact-text">${fact.text}</div>
                `;
            }
            
            factsContainer.appendChild(factCard);
        });
    }

    // Visual Effects
    createParticleBurst(x, y) {
        if (!this.gameState.settings.particlesEnabled) return;
        
        const particleContainer = document.getElementById('particle-container');
        const particles = ['💋', '💕', '💖', '💗', '💓', '💞'];
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            
            const angle = (Math.PI * 2 * i) / 8;
            const velocity = 50 + Math.random() * 50;
            const duration = 800 + Math.random() * 400;
            
            particle.style.setProperty('--tx', `${Math.cos(angle) * velocity}px`);
            particle.style.setProperty('--ty', `${Math.sin(angle) * velocity}px`);
            particle.style.animationDuration = `${duration}ms`;
            
            particleContainer.appendChild(particle);
            
            setTimeout(() => particle.remove(), duration);
        }
    }

    createConfetti() {
        const particleContainer = document.getElementById('particle-container');
        const colors = ['#FF006E', '#8338EC', '#FB5607', '#FFBE0B'];
        
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = `${Math.random() * 50}%`;
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            particleContainer.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }
    }

    triggerMilestoneCelebration(milestone) {
        const counter = document.getElementById('counter-display');
        counter.classList.add('milestone');
        
        setTimeout(() => {
            counter.classList.remove('milestone');
        }, 2000);
        
        this.createConfetti();
        this.playMilestoneSound();
    }

    animateNumber(from, to, duration) {
        const element = document.getElementById('counter-display');
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(from + (to - from) * progress);
            element.textContent = this.formatNumber(current);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    // Sound Effects
    playKissSound() {
        if (!this.gameState.settings.soundEnabled) return;
        
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    }

    playMilestoneSound() {
        if (!this.gameState.settings.soundEnabled) return;
        
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const notes = [523.25, 659.25, 783.99]; // C, E, G chord
        
        notes.forEach((frequency, index) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime + index * 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5 + index * 0.1);
            
            oscillator.start(audioContext.currentTime + index * 0.1);
            oscillator.stop(audioContext.currentTime + 0.5 + index * 0.1);
        });
    }

    // Game Loop and Stats
    startGameLoop() {
        setInterval(() => {
            this.updateStats();
            this.updateUI();
        }, 100);
        
        // Auto-save every 5 seconds
        setInterval(() => {
            this.saveProgress();
        }, 5000);
    }

    updateStats() {
        const now = Date.now();
        const sessionTime = now - this.gameState.sessionStartTime;
        this.gameState.stats.totalTimeMs = sessionTime;
        
        // Calculate KPS (kisses per second)
        const recentKisses = this.getRecentKisses(1000); // Last second
        this.gameState.stats.currentKPS = recentKisses;
        
        if (this.gameState.stats.currentKPS > this.gameState.stats.highestKPS) {
            this.gameState.stats.highestKPS = this.gameState.stats.currentKPS;
        }
    }

    getRecentKisses(timeframe) {
        // Simplified KPS calculation based on recent clicks
        const now = Date.now();
        const timeSinceLastClick = now - this.gameState.lastClickTime;
        return timeSinceLastClick < timeframe ? 1 / (timeSinceLastClick / 1000) : 0;
    }

    updateUI() {
        // Update main counter
        const counter = document.getElementById('counter-display');
        if (counter.textContent !== this.formatNumber(this.gameState.kisses)) {
            counter.textContent = this.formatNumber(this.gameState.kisses);
        }
        
        // Update stats dashboard
        document.getElementById('total-kisses').textContent = this.formatNumber(this.gameState.kisses);
        document.getElementById('highest-combo').textContent = `${this.gameState.highestCombo}x`;
        document.getElementById('kps').textContent = this.gameState.stats.currentKPS.toFixed(1);
        document.getElementById('time-played').textContent = this.formatTime(this.gameState.stats.totalTimeMs);
        
        // Update achievement and fact counts
        document.getElementById('achievement-count').textContent = `${this.gameState.achievements.length}/${this.achievements.length}`;
        document.getElementById('facts-count').textContent = `${this.gameState.unlockedFacts.length}/${this.facts.length}`;
        
        // Update next fact indicator
        this.updateNextFactIndicator();
    }

    // Utility Functions
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    formatTime(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Achievement Check Functions
    checkSpeedAchievement(kisses, timeWindow) {
        // Simplified speed check - in a real implementation, this would track recent clicks
        return this.gameState.kisses >= kisses && this.gameState.stats.currentKPS >= (kisses / timeWindow);
    }

    checkComboDuration(multiplier, duration) {
        // Simplified combo duration check
        return this.gameState.highestCombo >= multiplier;
    }

    checkTimeAchievement(startHour, endHour) {
        const currentHour = new Date().getHours();
        if (startHour > endHour) {
            return currentHour >= startHour || currentHour < endHour;
        }
        return currentHour >= startHour && currentHour < endHour;
    }

    checkKissDayAchievement() {
        const today = new Date();
        const isKissDay = today.getMonth() === 1 && today.getDate() === 14; // February 14
        return isKissDay && this.gameState.kisses >= 100;
    }

    checkConsecutiveDays(days) {
        // Simplified consecutive days check
        const lastPlayDate = this.gameState.stats.lastPlayDate;
        if (!lastPlayDate) return false;
        
        const lastPlay = new Date(lastPlayDate);
        const today = new Date();
        const daysDiff = Math.floor((today - lastPlay) / (1000 * 60 * 60 * 24));
        
        return daysDiff === 1; // Played yesterday
    }

    // Settings and UI Controls
    toggleSettingsMenu() {
        const menu = document.getElementById('settings-menu');
        menu.classList.toggle('show');
    }

    toggleSound() {
        this.gameState.settings.soundEnabled = !this.gameState.settings.soundEnabled;
        const soundToggle = document.getElementById('sound-toggle');
        soundToggle.textContent = this.gameState.settings.soundEnabled ? '🔊 Sound: ON' : '🔇 Sound: OFF';
        this.saveProgress();
    }

    showResetModal() {
        document.getElementById('reset-modal').classList.add('show');
    }

    hideResetModal() {
        document.getElementById('reset-modal').classList.remove('show');
    }

    resetGame() {
        this.gameState = {
            kisses: 0,
            totalClicks: 0,
            sessionStartTime: Date.now(),
            lastClickTime: 0,
            currentCombo: 1,
            comboActive: false,
            comboTimer: null,
            highestCombo: 1,
            achievements: [],
            unlockedFacts: [],
            stats: {
                totalTimeMs: 0,
                highestKPS: 0,
                currentKPS: 0,
                lastPlayDate: null
            },
            settings: {
                soundEnabled: true,
                particlesEnabled: true
            }
        };
        
        localStorage.removeItem('kissCounterProgress');
        this.updateUI();
        this.renderAchievements();
        this.renderFacts();
        this.hideResetModal();
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `<div class="notification-description">${message}</div>`;
        
        const container = document.getElementById('notification-container');
        container.appendChild(notification);
        
        setTimeout(() => notification.remove(), 3000);
    }

    // Storage
    saveProgress() {
        const saveData = {
            totalKisses: this.gameState.kisses,
            achievements: this.gameState.achievements,
            unlockedFacts: this.gameState.unlockedFacts,
            highestCombo: this.gameState.highestCombo,
            stats: {
                ...this.gameState.stats,
                lastPlayDate: new Date().toISOString().split('T')[0]
            },
            settings: this.gameState.settings
        };
        
        localStorage.setItem('kissCounterProgress', JSON.stringify(saveData));
    }

    loadProgress() {
        const savedData = localStorage.getItem('kissCounterProgress');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.gameState.kisses = data.totalKisses || 0;
            this.gameState.achievements = data.achievements || [];
            this.gameState.unlockedFacts = data.unlockedFacts || [];
            this.gameState.highestCombo = data.highestCombo || 1;
            this.gameState.stats = { ...this.gameState.stats, ...data.stats };
            this.gameState.settings = { ...this.gameState.settings, ...data.settings };
        }
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new KissCounterGame();
});
