// Hug Day Mood Matcher - Quiz Application

// State Management
let currentQuestion = 0;
let answers = [];
let tags = [];

// Questions Data
const questions = [
    {
        id: 1,
        text: "What's your energy level right now?",
        answers: [
            { text: "Fully charged and gand faad!", emoji: "🔋", tags: ["energetic"] },
            { text: "Calm and peaceful", emoji: "😌", tags: ["peaceful"] },
            { text: "Drained and tired", emoji: "😔", tags: ["tired"] },
            { text: "Restless and hangry", emoji: "😤", tags: ["frustrated"] }
        ]
    },
    {
        id: 2,
        text: "How do you feel about being around people?",
        answers: [
            { text: "I want to celebrate with everyone!", emoji: "🎉", tags: ["social"] },
            { text: "Family", emoji: "👥", tags: ["moderate"] },
            { text: "Vinay", emoji: "🏠", tags: ["intimate"] },
            { text: "I need space right now", emoji: "🚪", tags: ["solo"] }
        ]
    },
    {
        id: 3,
        text: "Which Ananya describes you best right now?",
        answers: [
            { text: "Happy Ananya", emoji: "❤️", tags: ["happy"] },
            { text: "Eating Ananya ", emoji: "💙", tags: ["calm"] },
            { text: "Sed Ananya", emoji: "💔", tags: ["sad"] },
            { text: "Stressed Ananya", emoji: "😰", tags: ["anxious"] }
        ]
    },
    {
        id: 4,
        text: "What would help you most right now?",
        answers: [
            { text: "Headstand", emoji: "🎊", tags: ["playful"] },
            { text: "Food", emoji: "🤗", tags: ["comfort"] },
            { text: "No stress", emoji: "💪", tags: ["support"] },
            { text: "Lie down", emoji: "✨", tags: ["gentle"] }
        ]
    },
    {
        id: 5,
        text: "How do you like your hugs?",
        answers: [
            { text: "Big, tight, all-encompassing", emoji: "🐻", tags: ["tight"] },
            { text: "Warm but not overwhelming", emoji: "🤝", tags: ["moderate"] },
            { text: "Light and gentle", emoji: "🦋", tags: ["light"] },
            { text: "Quickie and energizing", emoji: "⚡", tags: ["quick"] }
        ]
    },
    {
        id: 6,
        text: "How long should a perfect hug last?",
        answers: [
            { text: "Quick squeeze (1-2 seconds)", emoji: "⏱️", tags: ["quick"] },
            { text: "Standard hug (3-5 seconds)", emoji: "⏰", tags: ["standard"] },
            { text: "Long and lingering (10+ seconds)", emoji: "🕐", tags: ["long"] },
            { text: "As long as needed", emoji: "♾️", tags: ["extended"] }
        ]
    }
];

// Hug Types Data
const hugTypes = [
    {
        id: 'bear',
        name: 'Ananya need Bear Hug',
        emoji: '🐻',
        triggers: ['energetic', 'tight', 'support', 'social'],
        description: 'A strong, enveloping embrace that will scream "I\'ve got hold of you now!"',
        perfectFor: 'When Ananya is excited or need powerful love'
    },
    {
        id: 'comfort',
        name: 'Comfort Hug is what Ananya needs',
        emoji: '💙',
        triggers: ['sad', 'comfort', 'gentle', 'long'],
        description: 'A tender hug for tender baby',
        perfectFor: 'When Ananya is feeling down and need emotional support'
    },
    {
        id: 'side',
        name: 'Side Hug. Eww. Do better!',
        emoji: '🤝',
        triggers: ['moderate', 'quick', 'social', 'standard'],
        description: 'You deserve better',
        perfectFor: 'When you want to be formal'
    },
    {
        id: 'group',
        name: 'Group Hug for our cutie',
        emoji: '🎉',
        triggers: ['social', 'happy', 'playful', 'energetic'],
        description: 'Everybody loves Ananya. Everybody wants to hug her',
        perfectFor: 'Celebrating and sharing happiness with others'
    },
    {
        id: 'back',
        name: 'Back Hug.',
        emoji: '💕',
        triggers: ['calm', 'intimate', 'gentle', 'peaceful'],
        description: 'Only reserved for Vinay. No other is needed',
        perfectFor: 'Quiet, intimate moments of peace'
    },
    {
        id: 'squeeze',
        name: 'Squeeze Hug',
        emoji: '💪',
        triggers: ['frustrated', 'support', 'tight', 'quick'],
        description: 'A firm, energetic embrace and will make you Ketchup',
        perfectFor: 'Squeeze and relase ketchup'
    },
    {
        id: 'butterfly',
        name: 'Butterfly Hug for my Butterfly',
        emoji: '🦋',
        triggers: ['anxious', 'gentle', 'light', 'solo'],
        description: 'Atma-nirbhar Ananya',
        perfectFor: 'When Ananya needs her solitude'
    },
    {
        id: 'long',
        name: 'Long huggy',
        emoji: '🕐',
        triggers: ['tired', 'comfort', 'extended', 'long'],
        description: 'For recharge Ananys',
        perfectFor: 'When Ananya is exhausted and need deep comfort'
    }
];

// Initialize App
function initApp() {
    showScreen('landing-screen');
}

function startQuiz() {
    currentQuestion = 0;
    answers = [];
    tags = [];
    showScreen('quiz-screen');
    renderQuestion();
}

function renderQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question-text').textContent = question.text;
    
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.onclick = () => selectAnswer(answer);
        button.innerHTML = `
            <span class="icon">${answer.emoji}</span>
            <span>${answer.text}</span>
        `;
        answersContainer.appendChild(button);
    });
    
    updateProgress();
    updateBackButton();
}

function selectAnswer(answer) {
    answers.push(answer);
    answer.tags.forEach(tag => {
        if (!tags.includes(tag)) {
            tags.push(tag);
        }
    });
    
    nextQuestion();
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
        calculateResult();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        answers.pop(); // Remove last answer
        renderQuestion();
    }
}

function updateProgress() {
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;
    
    progressFill.style.width = progressPercentage + '%';
    progressText.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
}

function updateBackButton() {
    const backBtn = document.getElementById('back-btn');
    backBtn.style.display = currentQuestion > 0 ? 'block' : 'none';
}

function calculateResult() {
    // Count frequency of each tag
    const tagCounts = {};
    tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
    
    // Find best matching hug type
    let bestMatch = null;
    let maxScore = 0;
    
    hugTypes.forEach(hugType => {
        let score = 0;
        hugType.triggers.forEach(trigger => {
            score += tagCounts[trigger] || 0;
        });
        
        // Prioritize emotional state tags
        if (tagCounts['happy']) score += 2;
        if (tagCounts['sad']) score += 2;
        if (tagCounts['anxious']) score += 2;
        if (tagCounts['calm']) score += 2;
        
        if (score > maxScore) {
            maxScore = score;
            bestMatch = hugType;
        }
    });
    
    showResult(bestMatch);
}

function showResult(hugType) {
    const resultScreen = document.getElementById('results-screen');
    
    document.getElementById('hug-emoji').textContent = hugType.emoji;
    document.getElementById('hug-title').textContent = hugType.name;
    document.getElementById('hug-description').textContent = hugType.description;
    document.getElementById('hug-reason').textContent = hugType.perfectFor;
    
    showScreen('results-screen');
}

function shareResult() {
    const hugType = document.getElementById('hug-title').textContent;
    const emoji = document.getElementById('hug-emoji').textContent;
    
    // Create shareable image
    generateShareImage(hugType, emoji);
}

function generateShareImage(title, emoji) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 700;
    
    // Wait for fonts to load before drawing
    return document.fonts.ready.then(() => {
    
    // Background
    ctx.fillStyle = '#FFF8F0';
    ctx.fillRect(0, 0, 800, 700);
    
    // Title with word wrap
    ctx.fillStyle = '#4A2545';
    ctx.font = 'bold 42px Poppins';
    ctx.textAlign = 'center';
    
    const maxWidth = 700;
    const lineHeight = 50;
    const words = title.split(' ');
    let line = '';
    let y = 120;
    
    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, 400, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, 400, y);
    
    // Emoji
    ctx.font = '100px Arial';
    ctx.fillText(emoji, 400, y + 120);
    
    // Get description and reason from results screen
    const description = document.getElementById('hug-description').textContent;
    const reason = document.getElementById('hug-reason').textContent;
    
    // Description with word wrap
    ctx.fillStyle = '#4A2545';
    ctx.font = '24px Poppins';
    ctx.textAlign = 'center';
    
    const descWords = description.split(' ');
    let descLine = '';
    let descY = y + 200;
    const descMaxWidth = 700;
    const descLineHeight = 30;
    
    for (let n = 0; n < descWords.length; n++) {
        const testLine = descLine + descWords[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > descMaxWidth && n > 0) {
            ctx.fillText(descLine, 400, descY);
            descLine = descWords[n] + ' ';
            descY += descLineHeight;
        } else {
            descLine = testLine;
        }
    }
    ctx.fillText(descLine, 400, descY);
    
    // "Why this hug?" section
    ctx.fillStyle = '#E6E6FA';
    ctx.fillRect(50, descY + 40, 700, 100);
    
    ctx.fillStyle = '#4A2545';
    ctx.font = 'bold 20px Poppins';
    ctx.fillText('Why this hug?', 400, descY + 70);
    
    ctx.font = '18px Poppins';
    ctx.fillStyle = '#4A2545';
    
    const reasonWords = reason.split(' ');
    let reasonLine = '';
    let reasonY = descY + 100;
    const reasonMaxWidth = 650;
    const reasonLineHeight = 25;
    
    for (let n = 0; n < reasonWords.length; n++) {
        const testLine = reasonLine + reasonWords[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > reasonMaxWidth && n > 0) {
            ctx.fillText(reasonLine, 400, reasonY);
            reasonLine = reasonWords[n] + ' ';
            reasonY += reasonLineHeight;
        } else {
            reasonLine = testLine;
        }
    }
    ctx.fillText(reasonLine, 400, reasonY);
    
    // Footer
    ctx.fillStyle = '#FFB6C1';
    ctx.font = '20px Poppins';
    ctx.fillText('Find your perfect hug 💕', 400, 660);
    
    // Download image
    canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'my-hug-result.png';
        a.click();
        URL.revokeObjectURL(url);
    });
    
    // Show confirmation
    alert('Your hug result has been downloaded!');
    });
}

function retakeQuiz() {
    currentQuestion = 0;
    answers = [];
    tags = [];
    showScreen('quiz-screen');
    renderQuestion();
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    const targetScreen = document.getElementById(screenId);
    targetScreen.classList.add('active');
}

// Keyboard Support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.getElementById('quiz-screen').classList.contains('active')) {
        const buttons = document.querySelectorAll('.answer-btn');
        if (buttons.length > 0) {
            buttons[0].click();
        }
    }
    
    if (e.key === 'Escape' && currentQuestion > 0) {
        previousQuestion();
    }
});

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);