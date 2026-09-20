/**
 * ===================================================================
 * 📸 POLAROID MEMORY WALL & LIGHTBOX CONTROLLER
 * ===================================================================
 * Displays vintage polaroid cards and handles full-screen romantic lightbox.
 */

class RomanticGalleryController {
    constructor() {
        this.config = window.appConfig || {};
        this.container = document.getElementById('gallery-container');
        this.modal = document.getElementById('lightbox-modal');
        this.lightboxImg = document.getElementById('lightbox-image');
        this.lightboxCaption = document.getElementById('lightbox-caption');
        this.lightboxDate = document.getElementById('lightbox-date');
        this.closeBtn = document.getElementById('lightbox-close-btn');
        this.prevBtn = document.getElementById('lightbox-prev-btn');
        this.nextBtn = document.getElementById('lightbox-next-btn');

        this.currentIndex = 0;
        this.items = this.config.gallery || [];

        this.init();
    }

    init() {
        if (!this.container) return;
        this.renderGallery();
        this.initLightboxEvents();
    }

    renderGallery() {
        this.container.innerHTML = '';
        this.items.forEach((item, index) => {
            const polaroid = document.createElement('div');
            polaroid.className = `polaroid-card group relative bg-white/95 p-4 pb-6 rounded-2xl shadow-2xl transition-all duration-500 hover:scale-105 hover:z-20 cursor-pointer border border-rose-100`;
            polaroid.style.transform = `rotate(${item.rotation || '0deg'})`;

            polaroid.innerHTML = `
                <!-- Washi Tape Pin -->
                <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-gradient-to-r from-rose-200/90 via-pink-200/90 to-rose-200/90 backdrop-blur-md shadow-md border border-rose-300/60 rotate-1 z-10 rounded-sm"></div>
                
                <!-- Sticker Tag -->
                ${item.sticker ? `
                    <div class="absolute top-2 right-2 z-10 px-2.5 py-0.5 rounded-full bg-rose-500/90 text-white text-[10px] font-bold shadow-md tracking-wider">
                        ${item.sticker}
                    </div>
                ` : ''}

                <!-- Photo Container (Ideal 3:4 portrait ratio for couple pictures) -->
                <div class="overflow-hidden rounded-xl bg-gray-900 aspect-[3/4] mb-3 relative shadow-inner">
                    <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity"></div>
                </div>

                <!-- Handwritten Style Caption -->
                <div class="text-center px-1">
                    <p class="font-handwriting text-2xl text-rose-950 font-bold tracking-wide">
                        ${item.title}
                    </p>
                    <p class="text-xs text-rose-800/90 mt-1 font-sans font-medium italic leading-snug">
                        ${item.caption}
                    </p>
                </div>
            `;

            polaroid.addEventListener('click', () => {
                this.openLightbox(index);
            });

            this.container.appendChild(polaroid);
        });
    }

    initLightboxEvents() {
        if (!this.modal) return;

        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeLightbox());
        }

        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.prevPhoto();
            });
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.nextPhoto();
            });
        }

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (!this.modal.classList.contains('hidden')) {
                if (e.key === 'Escape') this.closeLightbox();
                if (e.key === 'ArrowLeft') this.prevPhoto();
                if (e.key === 'ArrowRight') this.nextPhoto();
            }
        });
    }

    openLightbox(index) {
        this.currentIndex = index;
        this.updateLightboxContent();
        this.modal.classList.remove('hidden');
        this.modal.classList.add('flex', 'animate-fadeIn');
    }

    closeLightbox() {
        this.modal.classList.add('hidden');
        this.modal.classList.remove('flex');
    }

    prevPhoto() {
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.updateLightboxContent();
    }

    nextPhoto() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.updateLightboxContent();
    }

    updateLightboxContent() {
        const item = this.items[this.currentIndex];
        if (!item) return;

        if (this.lightboxImg) {
            this.lightboxImg.src = item.image;
        }
        if (this.lightboxCaption) {
            this.lightboxCaption.innerText = item.caption || item.title;
        }
        if (this.lightboxDate) {
            this.lightboxDate.innerText = item.date || "Anniversary Memory";
        }
    }
}

window.RomanticGalleryController = RomanticGalleryController;
