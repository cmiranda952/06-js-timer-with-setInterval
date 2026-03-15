// Select the timer display, counter display, and increment button elements
const timerDisplay = document.querySelector('#timer');
const counterDisplay = document.querySelector('#counter');
const incrementButton = document.querySelector('#incrementButton');
const startButton = document.querySelector('#startButton');

// Initialize the timer value
let timerValue = 10;
let countdownIntervalId;

// Track the 10-second goal for the counter
let challengeIsActive = false;
let confettiShown = false;
let challengeTimeoutId;

// Goal settings
const challengeDurationInMilliseconds = 10000;
const targetCounterValue = 10;

// Function to launch confetti using the canvas-confetti library
function showConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 }
        });
    }
}

// Function to start a new 10-second challenge
function startCounterChallenge() {
    challengeIsActive = true;
    confettiShown = false;

    clearTimeout(challengeTimeoutId);
    challengeTimeoutId = setTimeout(function() {
        challengeIsActive = false;
    }, challengeDurationInMilliseconds);
}

// Check if the counter reached the target while the challenge is active
function checkCounterGoal() {
    if (challengeIsActive && !confettiShown && counterValue >= targetCounterValue) {
        confettiShown = true;
        challengeIsActive = false;
        clearTimeout(challengeTimeoutId);
        showConfetti();
    }
}

// Function to start the countdown
function startCountdown() {
    clearInterval(countdownIntervalId);

    // Reset timer display and start the 10-second counter challenge
    timerValue = 10;
    timerDisplay.textContent = timerValue;
    startCounterChallenge();

    countdownIntervalId = setInterval(function() {
        // Decrement the timer value
        timerValue--;
        // Update the timer display
        timerDisplay.textContent = timerValue;

        // Stop the countdown when the timer reaches 0
        if (timerValue <= 0) {
            clearInterval(countdownIntervalId);
            timerDisplay.textContent = '0'; // Ensure the display shows 0
        }
    }, 1000);
}

// Initialize the counter value
let counterValue = 0;

// Function to increase the counter
function increaseCounter() {
    // Increment the counter value
    counterValue++;
    // Update the counter display
    counterDisplay.textContent = counterValue;

    // Check if the user reached the counter goal in time
    checkCounterGoal();
}

// Add an event listener to the increment button to increase the counter when clicked
incrementButton.addEventListener('click', increaseCounter);

// Add an event listener to the start button to start the countdown when clicked
startButton.addEventListener('click', startCountdown);
