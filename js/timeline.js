/**
 * ===================================================================
 * 📖 3-YEAR LOVE STORY TIMELINE CONTROLLER
 * ===================================================================
 * Renders interactive milestone roadmap from Day 1 to Year 3 & Forever.
 */

class RomanticTimelineController {
    constructor() {
        this.config = window.appConfig || {};
        this.container = document.getElementById('timeline-container');
        this.init();
    }

    init() {
        if (!this.container) return;
        this.renderTimeline();
    }

    renderTimeline() {
        const items = this.config.timeline || [];
        this.container.innerHTML = '';

        items.forEach((item, index) => {
            const isEven = index % 2 === 0;
            const card = document.createElement('div');
            card.className = `relative flex items-center justify-between md:justify-normal ${
                isEven ? 'md:flex-row-reverse' : ''
            } group is-active`;

            const iconSvg = this.getIconSvg(item.icon);

            card.innerHTML = `
                <!-- Milestone Center Node -->
                <div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-rose-900/60 bg-gradient-to-tr from-rose-500 to-pink-500 shadow-[0_0_20px_rgba(244,63,94,0.5)] z-10 shrink-0 md:order-1 md:mx-auto group-hover:scale-110 transition-transform duration-300">
                    <div class="text-white text-lg">
                        ${iconSvg}
                    </div>
                </div>

                <!-- Timeline Content Box -->
                <div class="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] glass-card p-6 rounded-2xl border border-rose-300/20 shadow-xl backdrop-blur-md hover:border-rose-400/40 transition-all duration-300 transform group-hover:-translate-y-1">
                    <div class="flex items-center justify-between mb-2">
                        <span class="px-3 py-1 text-xs font-semibold tracking-wider text-rose-300 uppercase rounded-full bg-rose-950/60 border border-rose-500/30">
                            ${item.tag || item.year}
                        </span>
                        <span class="text-xs text-rose-200/70 font-medium">
                            ${item.date}
                        </span>
                    </div>
                    
                    <h3 class="text-xl font-bold text-white font-serif mb-2 group-hover:text-rose-300 transition-colors">
                        ${item.title}
                    </h3>
                    
                    <p class="text-sm text-rose-100/80 leading-relaxed mb-4">
                        ${item.description}
                    </p>

                    ${item.image ? `
                        <div class="overflow-hidden rounded-xl border border-rose-500/20 shadow-inner group/img relative">
                            <img src="${item.image}" alt="${item.title}" class="w-full h-44 object-cover transform group-hover/img:scale-105 transition-transform duration-500" loading="lazy">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                        </div>
                    ` : ''}
                </div>
            `;

            this.container.appendChild(card);
        });
    }

    getIconSvg(iconName) {
        switch (iconName) {
            case 'sparkles':
                return `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.2L21.6 12l-7.2 2.8L12 22l-2.4-7.2L2.4 12l7.2-2.8z"/></svg>`;
            case 'compass':
                return `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`;
            case 'heart-handshake':
                return `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
            case 'crown':
            default:
                return `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/></svg>`;
        }
    }
}

window.RomanticTimelineController = RomanticTimelineController;
