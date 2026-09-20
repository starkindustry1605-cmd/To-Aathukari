/**
 * ===================================================================
 * 🔐 ROMANTIC LOCK SCREEN & PASSWORD GATE CONTROLLER
 * ===================================================================
 * Validates girlfriend's password, handles animations, hints, and unlock effects.
 */

class RomanticLockScreen {
    constructor(audioController) {
        this.audio = audioController;
        this.config = window.appConfig || {};
        this.inputElem = document.getElementById('passcode-input');
        this.unlockBtn = document.getElementById('unlock-btn');
        this.hintBtn = document.getElementById('hint-btn');
        this.hintBox = document.getElementById('hint-box');
        this.hintText = document.getElementById('hint-text');
        this.errorMessage = document.getElementById('error-message');
        this.lockCard = document.getElementById('lock-card');
        this.lockScreen = document.getElementById('lock-screen');
        this.mainContent = document.getElementById('main-content');

        this.init();
    }

    init() {
        if (!this.inputElem || !this.unlockBtn) return;

        // Set hint text from configuration
        if (this.hintText) {
            this.hintText.innerText = this.config.passcodeHint || "The magic word of our love story + anniversary year! (e.g. 'love3')";
        }

        // Event listeners
        this.unlockBtn.addEventListener('click', () => this.verifyPassword());

        this.inputElem.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.verifyPassword();
            }
        });

        this.inputElem.addEventListener('input', () => {
            this.clearError();
        });

        if (this.hintBtn && this.hintBox) {
            this.hintBtn.addEventListener('click', () => {
                const isHidden = this.hintBox.classList.contains('hidden');
                if (isHidden) {
                    this.hintBox.classList.remove('hidden');
                    this.hintBox.classList.add('animate-fadeIn');
                } else {
                    this.hintBox.classList.add('hidden');
                }
            });
        }

        // On-screen quick keys if present
        const quickKeys = document.querySelectorAll('.quick-pass-btn');
        quickKeys.forEach(btn => {
            btn.addEventListener('click', () => {
                const val = btn.getAttribute('data-val');
                if (val === 'clear') {
                    this.inputElem.value = '';
                } else if (val === 'backspace') {
                    this.inputElem.value = this.inputElem.value.slice(0, -1);
                } else {
                    this.inputElem.value += val;
                }
                this.clearError();
            });
        });
    }

    verifyPassword() {
        const entered = (this.inputElem.value || '').trim().toLowerCase();
        const expected = (this.config.passcode || '1605').trim().toLowerCase();

        if (entered === expected && entered.length > 0) {
            this.handleSuccess();
        } else {
            this.handleError();
        }
    }

    handleSuccess() {
        this.clearError();
        if (this.audio) {
            this.audio.playSuccessChime();
        }

        // Fire full-screen celebratory confetti
        this.triggerCelebrationConfetti();

        // Animate unlock card
        if (this.lockCard) {
            this.lockCard.classList.add('animate-unlockScale');
        }

        setTimeout(() => {
            // Fade out lockscreen and show main celebration realm
            if (this.lockScreen) {
                this.lockScreen.classList.add('animate-fadeOutCurtain');
                setTimeout(() => {
                    this.lockScreen.style.display = 'none';
                    if (this.mainContent) {
                        this.mainContent.classList.remove('hidden');
                        this.mainContent.classList.add('animate-fadeInContent');
                    }

                    // Autoplay background music if configured
                    if (this.config.autoPlayOnUnlock && this.audio && !this.audio.isPlaying) {
                        this.audio.play();
                    }
                }, 800);
            }
        }, 600);
    }

    handleError() {
        if (this.audio) {
            this.audio.playErrorBuzzer();
        }

        if (this.lockCard) {
            this.lockCard.classList.remove('shake-animation');
            void this.lockCard.offsetWidth; // Trigger reflow
            this.lockCard.classList.add('shake-animation');
        }

        if (this.errorMessage) {
            const cuteErrors = [
                "Almost there, my love! Check the hint button ❤️",
                "Oops! Think of our date of birth, sweetheart! 🌸",
                "That's not quite our secret code! (Hint: Our date of birth) ✨",
                "Aww, remember our special numbers? Check the hint! 💖"
            ];
            this.errorMessage.innerText = cuteErrors[Math.floor(Math.random() * cuteErrors.length)];
            this.errorMessage.classList.remove('hidden');
        }

        this.inputElem.focus();
    }

    clearError() {
        if (this.errorMessage) {
            this.errorMessage.classList.add('hidden');
        }
    }

    triggerCelebrationConfetti() {
        if (typeof confetti === 'function') {
            const count = 200;
            const defaults = {
                origin: { y: 0.7 }
            };

            function fire(particleRatio, opts) {
                confetti(Object.assign({}, defaults, opts, {
                    particleCount: Math.floor(count * particleRatio)
                }));
            }

            fire(0.25, {
                spread: 26,
                startVelocity: 55,
                colors: ['#f43f5e', '#ec4899', '#fb7185']
            });
            fire(0.2, {
                spread: 60,
                colors: ['#fbbf24', '#fbcfe8', '#fda4af']
            });
            fire(0.35, {
                spread: 100,
                decay: 0.91,
                scalar: 0.8,
                colors: ['#e11d48', '#ffffff', '#f43f5e']
            });
            fire(0.1, {
                spread: 120,
                startVelocity: 25,
                decay: 0.92,
                colors: ['#ffe4e6', '#fb7185']
            });
            fire(0.1, {
                spread: 120,
                startVelocity: 45,
                colors: ['#fbbf24', '#f43f5e']
            });
        }
    }
}

window.RomanticLockScreen = RomanticLockScreen;
