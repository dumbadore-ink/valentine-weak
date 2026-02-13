// Promise Day JavaScript - 100 promises with infinite scroll illusion

const promises = [
    "I promise to always love you unconditionally",
    "I promise to help you start your firm",
    "I promise to make you do a headstand",
    "I promise that you will never be alone",
    "I promise to hold your hand through thick and thin",
    "I promise that if you cry, you can cry on my shoulder",
    "I promise to always give you the best sessions",
    "I promise to always make you listen to my singing",
    "I promise to make you watch all the things that I watch",
    "I promise to watch you every time you eat",
    "I promise to love every part of you",
    "I promise to love every bit of you",
    "I promise to grow old and grey with you",
    "I promise to kiss you goodnight every chance I get",
    "I promise to kiss you right after we wake up",
    "I promise to keep you full one way or another",
    "I promise to watch your favorite shows even if I don't like them",
    "I promise to make sure you make paranthas for me",
    "I promise to never let you go to bed angry",
    "I promise to never let you go to bed hungry",
    "I promise to kiss you when you're sick",
    "I promise to be your partner in crime in laziness",
    "I promise to build a home filled with lots of love and laughter",
    "I promise to annoy you every single day",
    "I promise that my co-pilot is never alone",
    "I promise to comfort you through all cycles",
    "I promise to help you grow a beard",
    "I promise to give you my last slice of pizza",
    "I promise to be your rock through it all",
    "I promise to always join you in the shower",
    "I promise to sing 'I love youuuuu I miss youuuuu I kisshhh youuuuu' every day",
    "I promise to be your bed buddy",
    "I promise to love your imperfections because you are pitch perfect",
    "I promise to be your sunshine on cloudy days",
    "I promise to never stop trying make you laugh",
    "I promise to share my blanket with you",
    "I promise to laugh at your jokes even when they're bad which they all are",
    "I promise to love you through every season",
    "I promise to be your constant in this changing world",
    "I promise to make you my main character",
    "I promise to make my ass more juicy",
    "I promise to make you take sunlight",
    "I promise to make you eat furits and healty",
    "I promise to make you listen to metal",
    "I promise to love Booby and Deol",
    "I promise to be your biggest fan",
    "I promise to give you twins",
    "I promise to love you more everry day",
    "I promise to not love you at your worst becuase you're always best",
    "I promise to love you beyond forever",
    "I promise to be your best friend. Only friend",
    "I promise to love you for all eternity",
    "I promise to be your top cheerleader",
    "I promise to be your OnlyFan",
    "I promise that I will love Esha a lil more than you",
    "I promise to you you my shera",
    "I promise to make you my wife",
    "I promise to be yuor confidant",
    "I promise that you will always keep smiling",
    "I promise to make you my Catwoman",
    "I promise to not abandon any Ananya. All Ananya will be cherished",
    "I promise to give you compliments always"
];



let currentPromiseIndex = 0;
let isLoading = false;

function createPromiseCard(promise) {
    const card = document.createElement('div');
    card.className = 'promise-card';
    card.innerHTML = `
        <p class="promise-text">${promise}</p>
    `;
    
    return card;
}

function loadMorePromises() {
    if (isLoading) return;
    
    isLoading = true;
    const loadingIndicator = document.getElementById('loading');
    const grid = document.getElementById('promises-grid');
    
    // Show loading indicator
    loadingIndicator.classList.add('show');
    console.log('Loading indicator shown');
    
    // Add a proper delay to show the loading animation
    setTimeout(() => {
        const promisesToLoad = 20; // Load 20 promises at a time
        
        for (let i = 0; i < promisesToLoad; i++) {
            const promise = promises[currentPromiseIndex % promises.length];
            const card = createPromiseCard(promise);
            grid.appendChild(card);
            currentPromiseIndex++;
        }
        
        // Hide loading indicator
        loadingIndicator.classList.remove('show');
        isLoading = false;
    }, 800);
}



function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Load more promises when user is near the bottom
    if (scrollTop + windowHeight >= documentHeight - windowHeight * 0.5) {
        loadMorePromises();
    }
}



function initializePromises() {
    // Load initial batch of promises
    loadMorePromises();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Add click interaction to promise cards
    document.addEventListener('click', function(e) {
        if (e.target.closest('.promise-card')) {
            const card = e.target.closest('.promise-card');
            
            // Create ripple lines effect
            createRippleLines(card);
            
            // Scale down animation
            card.style.transform = 'scale(0.98)';
            card.style.transition = 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Return to normal size after 150ms
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 150);
        }
    });
}

function createRippleLines(card) {
    // Get card dimensions and position
    const cardRect = card.getBoundingClientRect();
    
    // Create single outline element
    const outline = document.createElement('div');
    outline.style.position = 'fixed';
    outline.style.border = '1px solid #0070f3';
    outline.style.top = cardRect.top + 'px';
    outline.style.left = cardRect.left + 'px';
    outline.style.width = cardRect.width + 'px';
    outline.style.height = cardRect.height + 'px';
    outline.style.opacity = '0.8';
    outline.style.pointerEvents = 'none';
    outline.style.zIndex = '9999';
    outline.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    
    document.body.appendChild(outline);
    
    // Animate expansion
    setTimeout(() => {
        outline.style.top = (cardRect.top - 20) + 'px';
        outline.style.left = (cardRect.left - 20) + 'px';
        outline.style.width = (cardRect.width + 40) + 'px';
        outline.style.height = (cardRect.height + 40) + 'px';
        outline.style.opacity = '0';
    }, 10);
    
    // Remove after animation
    setTimeout(() => {
        outline.remove();
    }, 450);
}

// Create starry night background
function createStarryNight() {
    const starsContainer = document.getElementById('stars-container');
    
    // Create all moving stars (no static stars)
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'moving-star';
        
        // Random position
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Random size (1-3px)
        const size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Very slow random movement (60-120 seconds)
        const duration = Math.random() * 60 + 60;
        star.style.animationDuration = duration + 's';
        
        // Random animation delay
        star.style.animationDelay = Math.random() * duration + 's';
        
        starsContainer.appendChild(star);
    }
}

// Save and restore scroll position
function saveScrollPosition() {
    sessionStorage.setItem('scrollPosition', window.pageYOffset || document.documentElement.scrollTop);
}

function restoreScrollPosition() {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
        sessionStorage.removeItem('scrollPosition');
    }
}

// Save scroll position before unload
window.addEventListener('beforeunload', saveScrollPosition);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createStarryNight();
    initializePromises();
    
    // Restore scroll position after a short delay to ensure page is rendered
    setTimeout(restoreScrollPosition, 100);
});

