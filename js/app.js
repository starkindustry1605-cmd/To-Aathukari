/**
 * ===================================================================
 * 🚀 MAIN APPLICATION BOOTSTRAPPER
 * ===================================================================
 * Coordinates all romantic modules and initializes the anniversary app.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("💖 Initializing 3rd Anniversary Web Experience for", window.appConfig.partnerName);

    // Update dynamic names and texts on the page
    updateDynamicText();

    // 1. Initialize Canvas Particle Engine (Floating hearts, sakura petals, sparkles)
    if (window.RomanticParticleEngine) {
        window.particlesEngine = new RomanticParticleEngine('particles-canvas');
    }

    // 2. Initialize Romantic Audio Engine
    let audioCtrl = null;
    if (window.RomanticAudioController) {
        audioCtrl = new RomanticAudioController();
        window.audioController = audioCtrl;
    }

    // 3. Initialize Passcode Lock Screen Gate
    if (window.RomanticLockScreen) {
        window.lockScreen = new RomanticLockScreen(audioCtrl);
    }

    // 4. Initialize Live Relationship Counter
    if (window.RomanticRelationshipCounter) {
        window.relationshipCounter = new RomanticRelationshipCounter();
    }

    // 5. Initialize 3-Year Love Story Timeline
    if (window.RomanticTimelineController) {
        window.timelineController = new RomanticTimelineController();
    }

    // 6. Initialize Polaroid Memory Gallery & Lightbox
    if (window.RomanticGalleryController) {
        window.galleryController = new RomanticGalleryController();
    }

    // 7. Initialize Wax Seal Love Letter
    if (window.RomanticLetterController) {
        window.letterController = new RomanticLetterController(audioCtrl);
    }

    // 8. Initialize Surprise Gifts Wonderland (Box, Rose, Coupons, Scratch Card, Jar)
    if (window.RomanticGiftsController) {
        window.giftsController = new RomanticGiftsController(audioCtrl);
    }

    // 9. Initialize Couple Memory Mini-Quiz
    if (window.RomanticQuizController) {
        window.quizController = new RomanticQuizController(audioCtrl);
    }

    // 10. Initialize In-Browser Settings & Customizer
    if (window.RomanticSettingsController) {
        window.settingsController = new RomanticSettingsController();
    }
});

function updateDynamicText() {
    const config = window.appConfig || {};

    const partnerNameElems = document.querySelectorAll('.dynamic-partner-name');
    partnerNameElems.forEach(el => {
        el.innerText = config.partnerName || "My Love";
    });

    const yourNameElems = document.querySelectorAll('.dynamic-your-name');
    yourNameElems.forEach(el => {
        el.innerText = config.yourName || "Sanjay";
    });
}
