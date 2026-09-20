/**
 * ===================================================================
 * 💌 INTERACTIVE WAX SEAL LOVE LETTER CONTROLLER
 * ===================================================================
 * Handles the 3D envelope opening animation and romantic letter display.
 */

class RomanticLetterController {
    constructor(audioController) {
        this.audio = audioController;
        this.config = window.appConfig || {};
        this.envelope = document.getElementById('wax-envelope');
        this.waxSeal = document.getElementById('wax-seal-btn');
        this.letterPaper = document.getElementById('letter-paper');
        this.letterContent = document.getElementById('letter-content-body');
        this.letterSalutation = document.getElementById('letter-salutation');
        this.letterSignOff = document.getElementById('letter-signoff');
        this.letterSignature = document.getElementById('letter-signature');
        this.isOpen = false;

        this.init();
    }

    init() {
        if (!this.envelope || !this.waxSeal) return;
        this.renderLetterText();

        this.waxSeal.addEventListener('click', () => this.toggleEnvelope());
    }

    renderLetterText() {
        const letter = (this.config.loveLetter) || {};

        if (this.letterSalutation) {
            this.letterSalutation.innerText = letter.salutation || "To My Dearest Girlfriend,";
        }

        if (this.letterContent && letter.paragraphs) {
            this.letterContent.innerHTML = letter.paragraphs.map(p => `
                <p class="mb-4 text-base md:text-lg text-rose-950/90 font-serif leading-relaxed text-justify indent-4">
                    ${p}
                </p>
            `).join('');
        }

        if (this.letterSignOff) {
            this.letterSignOff.innerText = letter.signOff || "Forever & Always Yours,";
        }

        if (this.letterSignature) {
            this.letterSignature.innerText = letter.signature || `${this.config.yourName || "Sanjay"} ❤️`;
        }
    }

    toggleEnvelope() {
        if (this.isOpen) return;
        this.isOpen = true;

        if (this.audio) {
            this.audio.playSparkleEffect();
        }

        // 1. Break wax seal animation
        this.waxSeal.classList.add('seal-break-animation');

        // 2. Open envelope flap
        setTimeout(() => {
            if (this.envelope) {
                this.envelope.classList.add('envelope-open');
            }
        }, 400);

        // 3. Slide letter paper out smoothly
        setTimeout(() => {
            if (this.letterPaper) {
                this.letterPaper.classList.add('letter-slide-out');
            }
        }, 900);
    }
}

window.RomanticLetterController = RomanticLetterController;
