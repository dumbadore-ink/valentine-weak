class LoveQuiz {
    constructor() {
        this.questions = [];
        this.initialized = false;
        
        // Quiz State
        this.state = {
            currentQuestion: 0,
            score: 0,
            answers: [],
            startTime: null,
            endTime: null,
            quizComplete: false
        };

        // Result Tiers
        this.resultTiers = [
            {
                minPercentage: 100,
                maxPercentage: 100,
                title: "My Twin",
                message: "You know our story by heart. Every moment, every laugh, every tear, even when you are detoriating you memory.",
                emoji: "💝"
            },
            {
                minPercentage: 75,
                maxPercentage: 99,
                title: "Love Guru",
                message: "Hopefully you remeber the most important once not the useless ones.",
                emoji: "❤️"
            },
            {
                minPercentage: 51,
                maxPercentage: 74,
                title: "Do better",
                message: "I know you got the alzimers. So it's fine.",
                emoji: "💕"
            },
            {
                minPercentage: 1,
                maxPercentage: 50,
                title: "I expected better",
                message: "I'm dissapointed. I still love you but dissapointed.",
                emoji: "😔"
            },
            {
                minPercentage: 0,
                maxPercentage: 0,
                title: "Tf??",
                message: "Well there is a saying - To give every answer wrong you have to know every right answer. So fair game",
                emoji: "😂"
            }
        ];

        // Loading messages
        this.loadingMessages = [
            "Counting our memories...",
            "AI is evaluating our journey...",
            "Almost there..."
        ];
        
    }

    static create() {
        const quiz = new LoveQuiz();
        quiz.init();
        return quiz;
    }

    init() {
        if (this.initialized) return;
        this.initialized = true;
        
        // Load questions from global variable
        this.questions = window.questions || [];
        
        this.loadProgress();
        this.setupEventListeners();
        this.setupStarsBackground();
    }

    // Initialize event listeners
    setupEventListeners() {
        // Begin button
        document.getElementById('begin-btn').addEventListener('click', () => this.startQuiz());

        // Navigation buttons
        document.getElementById('prev-btn').addEventListener('click', () => this.previousQuestion());
        document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());

        // Results buttons
        document.getElementById('share-btn').addEventListener('click', () => this.shareResult());
        document.getElementById('retake-btn').addEventListener('click', () => this.retakeQuiz());

        // Keyboard support
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    // Setup stars background for interactive effects
    setupStarsBackground() {
        const starsBackground = document.getElementById('stars-background');
        const interactiveStars = document.getElementById('interactive-stars');
        let mouseX = 0;
        let mouseY = 0;
        let lastTrailTime = 0;

        // Mouse movement tracking
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Create trail stars
            const now = Date.now();
            if (now - lastTrailTime > 100 && Math.random() > 0.7) {
                this.createTrailStar(mouseX, mouseY);
                lastTrailTime = now;
            }
        });

        // Click effect
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.option-btn') && !e.target.closest('.begin-btn') && 
                !e.target.closest('.result-btn') && !e.target.closest('.nav-btn')) {
                this.createStarBurst(e.clientX, e.clientY);
            }
        });
    }

    // Create trail star
    createTrailStar(x, y) {
        const star = document.createElement('div');
        star.className = 'trail-star';
        
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;
        star.style.left = (x + offsetX) + 'px';
        star.style.top = (y + offsetY) + 'px';
        
        const hearts = ['💕', '💖', '💗', '💝', '💗'];
        star.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        star.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        document.getElementById('interactive-stars').appendChild(star);
        
        setTimeout(() => {
            if (star.parentNode) star.parentNode.removeChild(star);
        }, 2000);
    }

    // Create star burst
    createStarBurst(x, y) {
        const starCount = 8;
        for (let i = 0; i < starCount; i++) {
            setTimeout(() => {
                const star = document.createElement('div');
                star.className = 'star-particle';
                star.style.left = x + 'px';
                star.style.top = y + 'px';
                
                const angle = (i / starCount) * Math.PI * 2;
                const distance = 30 + Math.random() * 50;
                const endX = x + Math.cos(angle) * distance;
                const endY = y + Math.sin(angle) * distance;
                
                const hearts = ['❤️', '💕', '💖', '💗', '💝'];
                const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];
                star.innerHTML = `<span style="font-size: ${12 + Math.random() * 8}px;">${randomHeart}</span>`;
                
                star.animate([
                    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                    { transform: `translate(${endX - x}px, ${endY - y}px) scale(0.3)`, opacity: 0 }
                ], {
                    duration: 800 + Math.random() * 400,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }).onfinish = () => {
                    if (star.parentNode) star.parentNode.removeChild(star);
                };
                
                document.getElementById('interactive-stars').appendChild(star);
            }, i * 40);
        }
    }

    // Start the quiz
    startQuiz() {
        this.state.startTime = Date.now();
        this.showScreen('quiz-screen');
        this.renderQuestion(0);
        this.updateProgress();
    }

    // Show a specific screen
    showScreen(screenId) {
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => {
            screen.classList.add('hidden');
        });
        document.getElementById(screenId).classList.remove('hidden');
    }

    // Render a question
    renderQuestion(index) {
        if (!this.questions || this.questions.length === 0) {
            console.error('No questions found!');
            return;
        }

        const question = this.questions[index];
        
        // Update question number
        document.getElementById('question-number').textContent = `Question ${index + 1}`;
        document.getElementById('question-text').textContent = question.question;
        
        // Update progress
        this.updateProgress();
        
        // Render options
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';
        const correctAnswer = question.correct;
        question.options.forEach((option, optionIndex) => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'option-btn';
            optionBtn.innerHTML = `<span>${option}</span>`;
            
            // Check if this option was previously selected
            const previousAnswer = this.state.answers[index];
            if (previousAnswer !== undefined) {
                optionBtn.classList.add('selected');
            }
            
            optionBtn.addEventListener('click', () => this.selectAnswer(optionIndex, correctAnswer === optionIndex));
            optionsContainer.appendChild(optionBtn);
        });
        
        // Update navigation buttons
        this.updateNavigationButtons();
    }

    // Handle answer selection
    selectAnswer(optionIndex, isCorrect) {
        // Store the answer
        this.state.answers[this.state.currentQuestion] = {
            index: optionIndex,
            correct: isCorrect
        };
        
        // Update score
        if (isCorrect) {
            this.state.score++;
        }
        
        // Save progress
        this.saveProgress();
        
        // Visual feedback
        const options = document.querySelectorAll('.option-btn');
        options.forEach((btn, index) => {
            btn.classList.remove('selected');
            if (index === optionIndex) {
                btn.classList.add(isCorrect ? 'correct' : 'incorrect');
            }
        });
        
        // Auto-advance after a short delay
        setTimeout(() => {
            if (this.state.currentQuestion < this.questions.length - 1) {
                this.nextQuestion();
            } else {
                this.completeQuiz();
            }
        }, 500);
    }

    // Update progress bar
    updateProgress() {
        const progress = ((this.state.currentQuestion + 1) / this.questions.length) * 100;
        document.getElementById('progress-fill').style.width = progress + '%';
        document.getElementById('progress-text').textContent = `Question ${this.state.currentQuestion + 1} of ${this.questions.length}`;
    }

    // Update navigation buttons visibility
    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        // Previous button
        if (this.state.currentQuestion > 0) {
            prevBtn.classList.remove('hidden');
        } else {
            prevBtn.classList.add('hidden');
        }
        
        // Next button
        if (this.state.currentQuestion < this.questions.length - 1) {
            nextBtn.classList.remove('hidden');
        } else {
            nextBtn.classList.add('hidden');
        }
    }

    // Go to next question
    nextQuestion() {
        if (this.state.currentQuestion < this.questions.length - 1) {
            this.state.currentQuestion++;
            this.renderQuestion(this.state.currentQuestion);
        }
    }

    // Go to previous question
    previousQuestion() {
        if (this.state.currentQuestion > 0) {
            this.state.currentQuestion--;
            this.renderQuestion(this.state.currentQuestion);
        }
    }

    // Complete the quiz
    completeQuiz() {
        this.state.endTime = Date.now();
        this.state.quizComplete = true;
        
        // Show loading screen
        this.showLoadingScreen();
    }

    // Show loading screen
    showLoadingScreen() {
        this.showScreen('loading-screen');
        
        const loadingText = document.getElementById('loading-text');
        let messageIndex = 0;
        
        // Cycle through loading messages
        const messageInterval = setInterval(() => {
            loadingText.textContent = this.loadingMessages[messageIndex];
            messageIndex = (messageIndex + 1) % this.loadingMessages.length;
        }, 1000);
        
        // Show results after 3 seconds
        setTimeout(() => {
            clearInterval(messageInterval);
            this.showResults();
        }, 3000);
    }

    // Calculate and show results
    showResults() {
        const percentage = (this.state.score / this.questions.length) * 100;
        
        // Find matching result tier
        const result = this.resultTiers.find(tier => 
            percentage >= tier.minPercentage && percentage <= tier.maxPercentage
        ) || this.resultTiers[this.resultTiers.length - 1];
        
        // Update results UI
        document.getElementById('result-emoji').textContent = result.emoji;
        document.getElementById('result-title').textContent = result.title;
        document.getElementById('result-score').textContent = `${this.state.score} / ${this.questions.length}`;
        document.getElementById('result-message').textContent = result.message;
        
        // Show results screen
        this.showScreen('results-screen');
        
        // Show footer
        document.querySelector('.footer').classList.add('show');
        
        // Clear saved progress
        localStorage.removeItem('quizProgress');
    }

    // Share result
    shareResult() {
        const percentage = (this.state.score / this.questions.length) * 100;
        const result = this.resultTiers.find(tier => 
            percentage >= tier.minPercentage && percentage <= tier.maxPercentage
        );
        
        const shareText = `I got ${this.state.score}/${this.questions.length} on "Our Love Story" quiz! ${result?.emoji}\n\n${result?.title} - ${result?.message}\n\nHow well do you know our love story?`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Our Love Story Quiz',
                text: shareText
            });
        } else {
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Result copied to clipboard!');
            });
        }
    }

    // Retake the quiz
    retakeQuiz() {
        // Reset state
        this.state = {
            currentQuestion: 0,
            score: 0,
            answers: [],
            startTime: null,
            endTime: null,
            quizComplete: false
        };
        
        // Hide footer
        document.querySelector('.footer').classList.remove('show');
        
        // Clear progress
        localStorage.removeItem('quizProgress');
        
        // Show welcome screen
        this.showScreen('welcome-screen');
    }

    // Handle keyboard navigation
    handleKeyboard(e) {
        if (this.state.quizComplete) return;
        
        if (e.key === 'ArrowRight') {
            this.nextQuestion();
        } else if (e.key === 'ArrowLeft') {
            this.previousQuestion();
        } else if (e.key === 'Enter' || e.key === ' ') {
            if (document.getElementById('welcome-screen').classList.contains('hidden') === false) {
                this.startQuiz();
            }
        }
    }

    // Save progress to localStorage
    saveProgress() {
        const progressData = {
            currentQuestion: this.state.currentQuestion,
            score: this.state.score,
            answers: this.state.answers,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('quizProgress', JSON.stringify(progressData));
    }

    // Load progress from localStorage
    loadProgress() {
        const savedData = localStorage.getItem('quizProgress');
        
        if (savedData) {
            const data = JSON.parse(savedData);
            
            // Check if the save is from today
            const saveDate = new Date(data.timestamp);
            const today = new Date();
            
            if (saveDate.toDateString() === today.toDateString()) {
                // Resume the quiz
                this.state.currentQuestion = data.currentQuestion;
                this.state.score = data.score;
                this.state.answers = data.answers;
                
                // Show quiz screen
                this.showScreen('quiz-screen');
                this.renderQuestion(this.state.currentQuestion);
            } else {
                // Old save, clear it
                localStorage.removeItem('quizProgress');
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('question-count').textContent = questions.length;
    LoveQuiz.create();
});  
