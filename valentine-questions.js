// Valentine's Day Quiz - Questions

const questions = [
    {
        id: 1,
        question: "Where did we first meet?",
        options: [
            { text: "Coffee shop", correct: false },
            { text: "College campus", correct: false },
            { text: "Friend's party", correct: true },
            { text: "Online dating app", correct: false }
        ]
    },
    {
        id: 2,
        question: "What was our first date?",
        options: [
            { text: "Movie theater", correct: false },
            { text: "Fancy restaurant", correct: false },
            { text: "Walk in the park", correct: true },
            { text: "Coffee date", correct: false }
        ]
    },
    {
        id: 3,
        question: "When is our anniversary?",
        options: [
            { text: "January 14", correct: false },
            { text: "February 14", correct: true },
            { text: "March 20", correct: false },
            { text: "December 25", correct: false }
        ]
    },
    {
        id: 4,
        question: "What's my favorite color?",
        options: [
            { text: "Blue", correct: false },
            { text: "Pink", correct: false },
            { text: "Purple", correct: true },
            { text: "Red", correct: false }
        ]
    },
    {
        id: 5,
        question: "Where was our first kiss?",
        options: [
            { text: "At the beach", correct: true },
            { text: "Under the stars", correct: false },
            { text: "At home", correct: false },
            { text: "In the car", correct: false }
        ]
    },
    {
        id: 6,
        question: "What's my favorite food?",
        options: [
            { text: "Pizza", correct: false },
            { text: "Sushi", correct: true },
            { text: "Burgers", correct: false },
            { text: "Pasta", correct: false }
        ]
    },
    {
        id: 7,
        question: "What's my favorite movie genre?",
        options: [
            { text: "Horror", correct: false },
            { text: "Romantic comedies", correct: true },
            { text: "Action", correct: false },
            { text: "Sci-Fi", correct: false }
        ]
    },
    {
        id: 8,
        question: "What's my favorite song?",
        options: [
            { text: "Shape of You", correct: false },
            { text: "Perfect", correct: true },
            { text: "Thinking Out Loud", correct: false },
            { text: "All of Me", correct: false }
        ]
    }
];

// Make questions available globally
window.questions = questions;