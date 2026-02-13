# Valentine's Day Journey Quiz - Design Document

## Project Overview
A luxurious, premium quiz about your relationship journey. Answer questions about your shared memories and experiences, get a score, and receive a personalized romantic message based on how well you know your story together. Built with vanilla HTML, CSS, and JavaScript.

## Core Concept
A beautiful quiz testing knowledge of your relationship - like a romantic trivia game. Each question has ONE correct answer. Your final score determines which romantic result page you see with a personalized message.

---

## Technical Requirements
- Pure vanilla HTML, CSS, JavaScript only
- Fully static - no backend
- Single page application
- LocalStorage for progress saving
- Premium, luxurious aesthetic

---

## Visual Identity: LUXURY & SOPHISTICATION

### Design Direction: Premium Editorial / Magazine Quality
- Clean, spacious layouts with generous whitespace
- Elegant serif + modern sans-serif pairing
- Subtle, sophisticated animations
- High-end color palette
- Glass morphism and gradient accents
- Minimalist, refined UI elements

### Color Palette
- **Primary:** Deep Burgundy (#8B1538) - rich, romantic, luxurious
- **Secondary:** Champagne Gold (#D4AF37) - elegant, celebratory
- **Accent:** Soft Rose (#FFE4E8) - gentle, romantic
- **Background:** Ivory White (#FFFEF7) - clean, premium paper feel
- **Text Primary:** Charcoal (#2D2D2D) - sophisticated, readable
- **Text Secondary:** Warm Gray (#6B6B6B) - elegant, subtle
- **Gradient Accent:** Rose Gold (linear: #E8B4B8 → #D4AF37)

### Typography
- **Headings:** Elegant serif (Playfair Display style)
- **Subheadings:** Refined sans-serif (Montserrat)
- **Body:** Clean sans-serif (Inter / Lato)
- **Emphasis:** Italic serif for romantic touches

### Animation Principles
- Slow and luxurious (400-600ms)
- Smooth easing (cubic-bezier)
- Fade and slide combinations
- Gentle hover states
- Elegant transitions

---

## User Experience Flow

1. **Welcome Screen**
   - Elegant title: "Our Love Story"
   - Romantic subtitle
   - Brief description (2-3 lines)
   - "Begin" button
   - Subtle animated background

2. **Quiz Questions** (15 questions)
   - One question per screen
   - Progress bar at top
   - Question text
   - 4 answer options
   - Smooth transitions between questions
   - Auto-save progress

3. **Loading Screen**
   - Elegant loading animation
   - Romantic message
   - 3 second delay
   - Smooth transition to results

4. **Results Screen** (Changes based on score)
   - Score display (e.g., "12 / 15")
   - Result title (changes based on score tier)
   - Personalized romantic message
   - Beautiful imagery/emoji
   - Share and Download buttons
   - "Retake Quiz" option

---

## Data Schema - SIMPLE

### Questions Structure
```javascript
const questions = [
  {
    id: 1,
    question: "Where did we first meet?",
    options: [
      { text: "Coffee shop", correct: false },
      { text: "College library", correct: true },
      { text: "Friend's party", correct: false },
      { text: "Online", correct: false }
    ]
  },
  {
    id: 2,
    question: "What was the first movie we watched together?",
    options: [
      { text: "The Notebook", correct: false },
      { text: "Inception", correct: true },
      { text: "La La Land", correct: false },
      { text: "Titanic", correct: false }
    ]
  }
  // ... more questions (DUMMY placeholders)
];
```

### Results Tiers (Based on Score)
```javascript
const resultTiers = [
  {
    minPercentage: 100,
    maxPercentage: 100,
    title: "Soulmate Status",
    message: "You know our story by heart...",
    emoji: "💝"
  },
  {
    minPercentage: 81,
    maxPercentage: 99,
    title: "Love Expert",
    message: "You remember the important moments...",
    emoji: "❤️"
  },
  {
    minPercentage: 76,
    maxPercentage: 80,
    title: "Sweet Heart",
    message: "Our journey is still unfolding...",
    emoji: "💕"
  },
  {
    minPercentage: 0,
    maxPercentage: 75,
    title: "Tf??",
message: "Every love story has its surprises... and you forgot most of all of them",
    emoji: "😭"
  }
];
```

---

## Scoring Logic

### Simple Correct/Incorrect System
```
1. User selects an answer
2. Check if answer.correct === true
3. If true: score++
4. Move to next question
5. After all questions: calculate final score
6. Match percentage to result tier
7. Display appropriate result
```

### Score Calculation Example
```javascript
let score = 0;
let totalQuestions = 15;

// After quiz completion
let percentage = (score / totalQuestions) * 100;

// Find matching tier
let result = resultTiers.find(tier => 
  percentage >= tier.minPercentage && percentage <= tier.maxPercentage
);
```

---

## Component Specifications

### Welcome Screen
```
Layout:
- Full viewport height
- Centered content (max-width: 800px)
- Hero heading (60-80px serif) - "Our Love Story"
- Subtitle (20-24px sans-serif)
- 2-3 line intro text
- CTA button - "Begin Our Journey"
- Animated background (subtle)

Styling:
- Generous padding (4-6rem)
- Soft gradient overlay
- Button: Rose gold gradient, white text
- Hover: Scale (1.02), deeper shadow
```

### Quiz Question Screen
```
Layout:
- Progress bar (top, fixed)
  - Shows: progress percentage
  - Rose gold gradient fill
  
- Question card (centered, max-width: 700px)
  - Question number (small, elegant) "Question 5"
  - Question text (32-40px, serif)
  - 4 answer buttons (stacked)
  
- Previous button (bottom left, if not Q1)

Answer Buttons:
- White background, soft shadow
- Rounded (16px)
- Padding: 24px 32px
- Hover: Lift + gold border glow
- Selected state: Rose gold gradient + white text
- Transition: 300ms
```

### Loading Screen
```
Layout:
- Centered content
- Loading animation (rotating hearts/rose)
- Text that changes every second:
  "Counting our memories..."
  "Reviewing our journey..."
  "Almost there..."

Styling:
- Gradient background
- Animation: 60-80px
- Text: Serif, 24px
- 3 second total duration
```

### Results Screen (Score-Based)

#### High Score (13-15 correct)
```
Layout:
- Large emoji: 💝
- Title: "Soulmate Status" (48px serif)
- Score: "15 / 15" (32px, gold color)
- Message: 3-4 paragraphs about how well you know each other
- Personal touch: Reference to a shared memory
- Share/Download buttons

Styling:
- Celebratory feel
- Gold accents prominent
- Confetti animation (optional)
```

#### Medium Score (10-12 correct)
```
Similar layout but:
- Emoji: ❤️
- Title: "Love Expert"
- Warm, affectionate message
- Encouragement about your bond
```

#### Lower Score (7-9 correct)
```
Similar layout but:
- Emoji: 💕
- Title: "Sweet Heart"
- Gentle, loving message
- Focus on journey ahead
```

#### Lowest Score (0-6 correct)
```
Similar layout but:
- Emoji: 😭
- Title: "Tf???"
- Message: "Every love story has its surprises... and you forgot most of all of them"
```

---

## JavaScript Architecture

### State Management
```javascript
const state = {
  currentQuestion: 0,
  score: 0,
  answers: [],
  startTime: null,
  endTime: null
};
```

### Core Functions
```javascript
// App Flow
initApp()              // Load welcome screen
startQuiz()            // Begin quiz
renderQuestion(index)  // Display current question
selectAnswer(option)   // Handle answer selection
nextQuestion()         // Move forward
previousQuestion()     // Go back (optional)
completeQuiz()         // Show loading screen
calculateResult()      // Determine score tier
showResults()          // Display result screen

// UI Functions
updateProgress()       // Update progress bar
showLoadingScreen()    // Display processing
animateScore()         // Reveal score animation

// Sharing
generateShareImage()   // Create canvas image
downloadResult()       // Download image
shareResult()          // Share functionality
retakeQuiz()          // Reset and restart

// Storage
saveProgress()         // Save to localStorage
loadProgress()         // Resume saved quiz
```

### Event Listeners
```javascript
// Answer selection clicks
// Previous/Next navigation
// Share/Download buttons
// Retake quiz
// Keyboard support (optional: arrows, Enter)
```

### LocalStorage Structure
```javascript
{
  "quizProgress": {
    "currentQuestion": 5,
    "score": 3,
    "answers": [...],
    "timestamp": "2026-02-14T10:30:00Z"
  }
}
```

---

## Premium Animations

### Question Transitions
```
Exit: fade + slide left (400ms)
Enter: fade + slide from right (400ms, 100ms delay)
```

### Answer Selection
```
Hover: translateY(-2px) + shadow
Click: scale(0.98)
Selected: background gradient animation
```

### Score Reveal
```
Number count-up animation (2 seconds)
Emoji pop-in with bounce
Result title fade + slide up
```

### Progress Bar
```
Width transition (smooth)
Color shift as progress increases
```


---

## How to Add Questions
Create a json file with the questions and answers in the format below which will be used to populate the quiz questions. 

**In questions.js file:**

```json
[{
  id: 16,  // Increment from last question
  question: "Your question here?",
  options: [
    { text: "Option 1", correct: false },
    { text: "Option 2", correct: true },  // The right answer
    { text: "Option 3", correct: false },
    { text: "Option 4", correct: false }
  ]
}
]
```