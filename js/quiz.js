/**
 * ===================================================================
 * 🧩 COUPLE MEMORY MINI-QUIZ CONTROLLER
 * ===================================================================
 * Interactive 4-question quiz testing relationship memories with celebrations.
 */

class RomanticQuizController {
    constructor(audioController) {
        this.audio = audioController;
        this.config = window.appConfig || {};
        this.questions = this.config.quizQuestions || [];
        this.currentIndex = 0;
        this.score = 0;

        this.questionContainer = document.getElementById('quiz-question-container');
        this.questionText = document.getElementById('quiz-question-text');
        this.optionsContainer = document.getElementById('quiz-options-container');
        this.feedbackBox = document.getElementById('quiz-feedback-box');
        this.feedbackNote = document.getElementById('quiz-feedback-note');
        this.nextBtn = document.getElementById('quiz-next-btn');
        this.progressBadge = document.getElementById('quiz-progress-badge');
        this.resultsCard = document.getElementById('quiz-results-card');
        this.restartBtn = document.getElementById('quiz-restart-btn');

        this.init();
    }

    init() {
        if (!this.questionText || !this.optionsContainer) return;
        this.renderQuestion();

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.goToNext());
        }

        if (this.restartBtn) {
            this.restartBtn.addEventListener('click', () => this.restartQuiz());
        }
    }

    renderQuestion() {
        if (this.currentIndex >= this.questions.length) {
            this.showResults();
            return;
        }

        const q = this.questions[this.currentIndex];
        if (this.progressBadge) {
            this.progressBadge.innerText = `Question ${this.currentIndex + 1} of ${this.questions.length}`;
        }

        if (this.questionText) {
            this.questionText.innerText = q.question;
        }

        if (this.feedbackBox) {
            this.feedbackBox.classList.add('hidden');
        }

        if (this.nextBtn) {
            this.nextBtn.classList.add('hidden');
        }

        if (this.optionsContainer) {
            this.optionsContainer.innerHTML = '';
            q.options.forEach((opt, idx) => {
                const btn = document.createElement('button');
                btn.className = `w-full text-left p-4 rounded-xl border border-rose-300/30 bg-white/10 hover:bg-rose-500/20 text-white font-medium text-sm md:text-base transition-all duration-300 flex items-center justify-between group`;
                btn.innerHTML = `
                    <span class="flex items-center gap-3">
                        <span class="w-7 h-7 rounded-full bg-rose-500/30 flex items-center justify-center text-xs font-bold text-rose-200 border border-rose-400/40 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                            ${String.fromCharCode(65 + idx)}
                        </span>
                        <span>${opt}</span>
                    </span>
                    <span class="opacity-0 group-hover:opacity-100 text-rose-300 text-sm transition-opacity">
                        💖
                    </span>
                `;

                btn.addEventListener('click', () => this.handleAnswer(idx, q, btn));
                this.optionsContainer.appendChild(btn);
            });
        }
    }

    handleAnswer(selectedIndex, questionObj, selectedBtn) {
        // Disable all option buttons
        const allBtns = this.optionsContainer.querySelectorAll('button');
        allBtns.forEach(b => b.classList.add('pointer-events-none'));

        const isCorrect = selectedIndex === questionObj.correctIndex;

        if (isCorrect) {
            this.score++;
            selectedBtn.classList.remove('bg-white/10');
            selectedBtn.classList.add('bg-emerald-600/50', 'border-emerald-400', 'shadow-[0_0_15px_rgba(52,211,153,0.5)]');

            if (this.audio) this.audio.playSparkleEffect();
        } else {
            selectedBtn.classList.remove('bg-white/10');
            selectedBtn.classList.add('bg-rose-600/50', 'border-rose-400');

            // Highlight the correct button in green so she learns the sweet memory
            const correctBtn = allBtns[questionObj.correctIndex];
            if (correctBtn) {
                correctBtn.classList.remove('bg-white/10');
                correctBtn.classList.add('bg-emerald-600/40', 'border-emerald-400');
            }
        }

        // Show feedback note
        if (this.feedbackBox && this.feedbackNote) {
            this.feedbackNote.innerText = questionObj.sweetNote || "You know my heart so well! ❤️";
            this.feedbackBox.classList.remove('hidden');
            this.feedbackBox.classList.add('animate-fadeIn');
        }

        if (this.nextBtn) {
            this.nextBtn.classList.remove('hidden');
            this.nextBtn.classList.add('animate-fadeIn');
        }
    }

    goToNext() {
        this.currentIndex++;
        this.renderQuestion();
    }

    showResults() {
        if (this.questionContainer) {
            this.questionContainer.classList.add('hidden');
        }

        if (this.resultsCard) {
            this.resultsCard.classList.remove('hidden');
            this.resultsCard.classList.add('animate-fadeInScale');
        }

        if (this.audio) this.audio.playSuccessChime();

        if (typeof confetti === 'function') {
            confetti({
                particleCount: 100,
                spread: 80,
                origin: { y: 0.6 }
            });
        }
    }

    restartQuiz() {
        this.currentIndex = 0;
        this.score = 0;

        if (this.resultsCard) {
            this.resultsCard.classList.add('hidden');
        }

        if (this.questionContainer) {
            this.questionContainer.classList.remove('hidden');
        }

        this.renderQuestion();
    }
}

window.RomanticQuizController = RomanticQuizController;
