/**
 * ===================================================================
 * 🎁 SURPRISE GIFTS WONDERLAND CONTROLLER
 * ===================================================================
 * Features:
 * 1. 3D Mystery Gift Box Unwrap
 * 2. Forever Blooming Digital Rose
 * 3. Redeemable Love Coupons
 * 4. Interactive HTML5 Canvas Scratch-Off Card
 * 5. Love Reason Jar & Capsule Dispenser
 */

class RomanticGiftsController {
    constructor(audioController) {
        this.audio = audioController;
        this.config = window.appConfig || {};

        this.initMysteryBox();
        this.initRoseGarden();
        this.initCoupons();
        this.initScratchCard();
        this.initLoveJar();
    }

    /* -------------------------------------------------------------
     * 1. 🎁 3D Mystery Gift Box Unwrap (Surprise Offer)
     * ------------------------------------------------------------- */
    initMysteryBox() {
        const giftBox = document.getElementById('mystery-gift-box');
        const surpriseReveal = document.getElementById('mystery-gift-reveal');

        if (!giftBox) return;

        giftBox.addEventListener('click', () => {
            if (giftBox.classList.contains('opened')) return;
            giftBox.classList.add('opened');

            if (this.audio) {
                this.audio.playSuccessChime();
            }

            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 120,
                    spread: 80,
                    origin: { y: 0.6 }
                });
            }

            if (surpriseReveal) {
                setTimeout(() => {
                    surpriseReveal.classList.remove('hidden');
                    surpriseReveal.classList.add('animate-fadeInScale');
                }, 600);
            }
        });
    }

    /* -------------------------------------------------------------
     * 2. 🌹 Forever Blooming Digital Rose
     * ------------------------------------------------------------- */
    initRoseGarden() {
        const roseBtn = document.getElementById('bloom-rose-btn');
        const rosePetals = document.getElementById('animated-rose-svg');
        const roseMsg = document.getElementById('rose-message');

        if (!roseBtn) return;

        roseBtn.addEventListener('click', () => {
            if (this.audio) this.audio.playSparkleEffect();
            if (rosePetals) {
                rosePetals.classList.add('rose-blooming-animation');
            }
            if (roseMsg) {
                roseMsg.classList.remove('hidden');
                roseMsg.classList.add('animate-fadeIn');
            }
        });
    }

    /* -------------------------------------------------------------
     * 3. 🎫 Date Options Selector (Bike Ride, Dinner Date, Night Walk)
     * ------------------------------------------------------------- */
    initCoupons() {
        const container = document.getElementById('coupons-container');
        const selectionBanner = document.getElementById('coupon-selection-banner');
        const selectedDateText = document.getElementById('selected-date-text');

        if (!container) return;

        const options = this.config.dateOptions || [
            {
                id: "bike-ride",
                title: "Cozy Bike Ride 🛵",
                icon: "🛵",
                subtitle: "Wind in our hair, music playing & holding you tight",
                description: "A romantic scenic bike ride through the coolest roads with your arms wrapped around me and endless peaceful vibes.",
                color: "from-pink-500 to-rose-600"
            },
            {
                id: "dinner-date",
                title: "Romantic Dinner Date 🍽️",
                icon: "🍽️",
                subtitle: "Delicious food, sweet desserts & candlelight talks",
                description: "A fancy or cozy dinner date at our favorite food spot, featuring all your favorite dishes, drinks, desserts, and quiet quality time.",
                color: "from-purple-500 to-indigo-600"
            },
            {
                id: "night-walk",
                title: "Peaceful Night Walk 🌙",
                icon: "🌙",
                subtitle: "Holding hands under the moonlight & deep talks",
                description: "A calm, dreamy night walk under the stars holding hands, sharing laughs, whispering secrets, and making new memories.",
                color: "from-amber-500 to-rose-500"
            }
        ];

        container.innerHTML = '';

        options.forEach((opt) => {
            const isSelected = (this.config.selectedDateOption === opt.id);
            const card = document.createElement('div');
            card.id = `option-card-${opt.id}`;
            card.className = `date-option-card relative overflow-hidden rounded-3xl bg-gradient-to-br ${opt.color} p-6 md:p-8 text-white shadow-2xl transform transition-all duration-400 hover:-translate-y-2 cursor-pointer border-2 ${
                isSelected ? 'border-amber-300 ring-4 ring-amber-300/50 scale-105' : 'border-white/20 hover:border-white/40'
            }`;

            card.innerHTML = `
                <!-- Background ambient glow -->
                <div class="absolute -right-8 -bottom-8 w-36 h-36 bg-white/15 rounded-full blur-2xl pointer-events-none"></div>

                <div class="relative z-10 flex flex-col justify-between h-full space-y-4">
                    <div>
                        <div class="flex items-center justify-between mb-3">
                            <span class="text-4xl p-3 bg-white/20 backdrop-blur-md rounded-2xl shadow-inner">${opt.icon}</span>
                            <span class="selection-tag px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${
                                isSelected ? 'bg-amber-300 text-rose-950 shadow-lg' : 'bg-white/20 text-white/90'
                            }">
                                ${isSelected ? 'Selected with Love ❤️' : 'Select Option ✨'}
                            </span>
                        </div>
                        
                        <h4 class="text-xl md:text-2xl font-bold font-serif tracking-wide text-white mb-1">
                            ${opt.title}
                        </h4>
                        
                        <p class="text-xs text-rose-100 font-semibold mb-3">
                            ${opt.subtitle}
                        </p>
                        
                        <p class="text-xs md:text-sm text-white/90 leading-relaxed font-sans">
                            ${opt.description}
                        </p>
                    </div>

                    <div class="pt-4 border-t border-white/20 flex items-center justify-between">
                        <span class="text-xs text-white/80 font-mono">
                            Host: Loveable KD ❤️
                        </span>
                        
                        <button class="select-btn px-5 py-2 text-xs font-bold rounded-full transition-all shadow-md ${
                            isSelected ? 'bg-amber-300 text-rose-950' : 'bg-white text-rose-600 hover:bg-rose-100'
                        }">
                            ${isSelected ? 'Selected ❤️' : 'Choose This 💖'}
                        </button>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                this.selectDateOption(opt, options);
            });

            container.appendChild(card);
        });

        // If previously selected, show banner
        if (this.config.selectedDateOption && selectionBanner && selectedDateText) {
            const current = options.find(o => o.id === this.config.selectedDateOption);
            if (current) {
                selectedDateText.innerText = current.title;
                selectionBanner.classList.remove('hidden');
            }
        }
    }

    selectDateOption(chosenOpt, allOptions) {
        this.config.selectedDateOption = chosenOpt.id;
        // Save selection only when persistence is enabled in config
        if (this.config.persistSelections !== false) {
            saveAppConfig(this.config);
        }

        if (this.audio) this.audio.playSparkleEffect();

        if (typeof confetti === 'function') {
            confetti({
                particleCount: 90,
                spread: 70,
                origin: { y: 0.7 }
            });
        }

        // Update all cards UI
        allOptions.forEach(opt => {
            const card = document.getElementById(`option-card-${opt.id}`);
            if (!card) return;
            const tag = card.querySelector('.selection-tag');
            const btn = card.querySelector('.select-btn');

            if (opt.id === chosenOpt.id) {
                card.className = `date-option-card relative overflow-hidden rounded-3xl bg-gradient-to-br ${opt.color} p-6 md:p-8 text-white shadow-2xl transform transition-all duration-400 -translate-y-2 scale-105 border-2 border-amber-300 ring-4 ring-amber-300/50 cursor-pointer`;
                if (tag) {
                    tag.className = 'selection-tag px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-amber-300 text-rose-950 shadow-lg animate-pulse';
                    tag.innerText = 'Selected with Love ❤️';
                }
                if (btn) {
                    btn.className = 'select-btn px-5 py-2 text-xs font-bold rounded-full transition-all shadow-md bg-amber-300 text-rose-950';
                    btn.innerText = 'Selected ❤️';
                }
            } else {
                card.className = `date-option-card relative overflow-hidden rounded-3xl bg-gradient-to-br ${opt.color} p-6 md:p-8 text-white shadow-2xl transform transition-all duration-400 hover:-translate-y-2 border-2 border-white/20 hover:border-white/40 opacity-75 cursor-pointer`;
                if (tag) {
                    tag.className = 'selection-tag px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-white/20 text-white/90';
                    tag.innerText = 'Select Option ✨';
                }
                if (btn) {
                    btn.className = 'select-btn px-5 py-2 text-xs font-bold rounded-full transition-all shadow-md bg-white text-rose-600 hover:bg-rose-100';
                    btn.innerText = 'Choose This 💖';
                }
            }
        });

        const selectionBanner = document.getElementById('coupon-selection-banner');
        const selectedDateText = document.getElementById('selected-date-text');
        if (selectionBanner && selectedDateText) {
            selectedDateText.innerText = chosenOpt.title;
            selectionBanner.classList.remove('hidden');
            selectionBanner.classList.remove('animate-fadeInScale');
            void selectionBanner.offsetWidth;
            selectionBanner.classList.add('animate-fadeInScale');
        }
    }

    /* -------------------------------------------------------------
     * 4. 🪙 Interactive HTML5 Canvas Scratch-Off Card
     * ------------------------------------------------------------- */
    initScratchCard() {
        const canvas = document.getElementById('scratch-canvas');
        const cardTitle = document.getElementById('scratch-card-title');
        const secretMsg = document.getElementById('scratch-secret-message');

        if (!canvas) return;

        const scratchData = this.config.scratchCard || {};
        if (cardTitle) cardTitle.innerText = scratchData.title || "✨ Mystery Anniversary Surprise ✨";
        if (secretMsg) secretMsg.innerText = scratchData.secretMessage || "You are my forever love! ❤️";

        const ctx = canvas.getContext('2d');
        const container = canvas.parentElement;
        
        const width = container.clientWidth || 320;
        const height = container.clientHeight || 180;
        canvas.width = width;
        canvas.height = height;

        // Draw metallic silver scratch coating
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#cbd5e1');
        gradient.addColorStop(0.3, '#f1f5f9');
        gradient.addColorStop(0.5, '#94a3b8');
        gradient.addColorStop(0.7, '#e2e8f0');
        gradient.addColorStop(1, '#64748b');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Pattern / text on the scratch foil
        ctx.fillStyle = '#475569';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('✨ Scratch Here with Cursor/Touch ✨', width / 2, height / 2 - 5);
        ctx.font = '12px sans-serif';
        ctx.fillStyle = '#64748b';
        ctx.fillText('To reveal your secret anniversary promise', width / 2, height / 2 + 20);

        let isDrawing = false;
        let scratchedPixels = 0;
        let totalPixels = width * height;
        let isRevealed = false;

        const scratch = (x, y) => {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, Math.PI * 2, false);
            ctx.fill();

            if (!isRevealed) {
                checkScratchPercentage();
            }
        };

        const getPos = (e) => {
            const rect = canvas.getBoundingClientRect();
            let clientX = e.clientX;
            let clientY = e.clientY;

            if (e.touches && e.touches[0]) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            }

            return {
                x: clientX - rect.left,
                y: clientY - rect.top
            };
        };

        const checkScratchPercentage = () => {
            try {
                const imgData = ctx.getImageData(0, 0, width, height);
                let transparentCount = 0;
                // Sample every 8th pixel for fast performance
                for (let i = 3; i < imgData.data.length; i += 32) {
                    if (imgData.data[i] === 0) {
                        transparentCount++;
                    }
                }
                const percent = (transparentCount / (imgData.data.length / 32)) * 100;
                if (percent > 45 && !isRevealed) {
                    isRevealed = true;
                    canvas.style.transition = 'opacity 0.6s ease';
                    canvas.style.opacity = '0';
                    setTimeout(() => {
                        canvas.style.display = 'none';
                    }, 600);

                    if (this.audio) this.audio.playSuccessChime();
                    if (typeof confetti === 'function') {
                        confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
                    }
                }
            } catch (err) {
                // Ignore canvas security errors if any
            }
        };

        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            const pos = getPos(e);
            scratch(pos.x, pos.y);
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDrawing) return;
            const pos = getPos(e);
            scratch(pos.x, pos.y);
        });

        window.addEventListener('mouseup', () => { isDrawing = false; });

        canvas.addEventListener('touchstart', (e) => {
            isDrawing = true;
            const pos = getPos(e);
            scratch(pos.x, pos.y);
        }, { passive: true });

        canvas.addEventListener('touchmove', (e) => {
            if (!isDrawing) return;
            const pos = getPos(e);
            scratch(pos.x, pos.y);
        }, { passive: true });

        canvas.addEventListener('touchend', () => { isDrawing = false; });
    }

    /* -------------------------------------------------------------
     * 5. 💖 Love Reason Jar & Capsule Dispenser
     * ------------------------------------------------------------- */
    initLoveJar() {
        const pullBtn = document.getElementById('pull-reason-btn');
        const reasonCard = document.getElementById('reason-display-card');
        const reasonText = document.getElementById('reason-text');
        const reasonCounter = document.getElementById('reason-counter');
        const jarGraphic = document.getElementById('love-jar-graphic');

        if (!pullBtn) return;

        const reasons = this.config.reasonsWhyILoveYou || [
            "Your beautiful smile that brightens any room.",
            "Because you make me feel like the luckiest person on earth."
        ];

        let seenIndices = [];

        pullBtn.addEventListener('click', () => {
            if (seenIndices.length >= reasons.length) {
                seenIndices = []; // Reset after seeing all
            }

            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * reasons.length);
            } while (seenIndices.includes(randomIndex) && seenIndices.length < reasons.length);

            seenIndices.push(randomIndex);

            if (this.audio) this.audio.playSparkleEffect();

            // Jar shake animation
            if (jarGraphic) {
                jarGraphic.classList.remove('shake-animation');
                void jarGraphic.offsetWidth;
                jarGraphic.classList.add('shake-animation');
            }

            // Update text with cute animation
            if (reasonCard && reasonText) {
                reasonCard.classList.remove('hidden');
                reasonCard.classList.remove('animate-fadeInScale');
                void reasonCard.offsetWidth;
                reasonCard.classList.add('animate-fadeInScale');

                reasonText.innerText = reasons[randomIndex];
                if (reasonCounter) {
                    reasonCounter.innerText = `Reason #${randomIndex + 1} of ${reasons.length}`;
                }
            }
        });
    }
}

window.RomanticGiftsController = RomanticGiftsController;
