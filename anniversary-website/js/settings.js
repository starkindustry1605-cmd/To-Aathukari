/**
 * ===================================================================
 * ⚙️ IN-BROWSER CUSTOMIZATION & SETTINGS MODAL
 * ===================================================================
 * Allows Sanjay to customize couple names, anniversary date, passcode,
 * love letter text, and gifts directly in the browser!
 */

class RomanticSettingsController {
    constructor() {
        this.config = window.appConfig || {};
        this.modal = document.getElementById('settings-modal');
        this.openBtn = document.getElementById('settings-open-btn');
        this.closeBtn = document.getElementById('settings-close-btn');
        this.saveBtn = document.getElementById('settings-save-btn');
        this.resetBtn = document.getElementById('settings-reset-btn');

        // Form Fields
        this.yourNameInput = document.getElementById('setting-your-name');
        this.partnerNameInput = document.getElementById('setting-partner-name');
        this.dateInput = document.getElementById('setting-anniversary-date');
        this.passcodeInput = document.getElementById('setting-passcode');
        this.passcodeHintInput = document.getElementById('setting-passcode-hint');
        this.letterInput = document.getElementById('setting-love-letter');
        this.scratchInput = document.getElementById('setting-scratch-msg');

        this.init();
    }

    init() {
        if (this.openBtn) {
            this.openBtn.addEventListener('click', () => this.openModal());
        }

        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeModal());
        }

        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) this.closeModal();
            });
        }

        if (this.saveBtn) {
            this.saveBtn.addEventListener('click', () => this.saveSettings());
        }

        if (this.resetBtn) {
            this.resetBtn.addEventListener('click', () => this.resetSettings());
        }
    }

    openModal() {
        this.populateFields();
        if (this.modal) {
            this.modal.classList.remove('hidden');
            this.modal.classList.add('flex', 'animate-fadeIn');
        }
    }

    closeModal() {
        if (this.modal) {
            this.modal.classList.add('hidden');
            this.modal.classList.remove('flex');
        }
    }

    populateFields() {
        const c = window.appConfig || {};

        if (this.yourNameInput) this.yourNameInput.value = c.yourName || "Sanjay";
        if (this.partnerNameInput) this.partnerNameInput.value = c.partnerName || "My Love";
        
        if (this.dateInput && c.anniversaryDate) {
            // Format YYYY-MM-DD for date input
            const d = new Date(c.anniversaryDate);
            if (!isNaN(d.getTime())) {
                this.dateInput.value = d.toISOString().split('T')[0];
            }
        }

        if (this.passcodeInput) this.passcodeInput.value = c.passcode || "love3";
        if (this.passcodeHintInput) this.passcodeHintInput.value = c.passcodeHint || "";

        if (this.letterInput && c.loveLetter && c.loveLetter.paragraphs) {
            this.letterInput.value = c.loveLetter.paragraphs.join("\n\n");
        }

        if (this.scratchInput && c.scratchCard) {
            this.scratchInput.value = c.scratchCard.secretMessage || "";
        }
    }

    saveSettings() {
        const c = { ...window.appConfig };

        if (this.yourNameInput) c.yourName = this.yourNameInput.value.trim() || "Sanjay";
        if (this.partnerNameInput) c.partnerName = this.partnerNameInput.value.trim() || "My Love";
        if (this.dateInput && this.dateInput.value) {
            c.anniversaryDate = `${this.dateInput.value}T00:00:00`;
        }
        if (this.passcodeInput) c.passcode = this.passcodeInput.value.trim() || "love3";
        if (this.passcodeHintInput) c.passcodeHint = this.passcodeHintInput.value.trim();

        if (this.letterInput && this.letterInput.value.trim()) {
            const paras = this.letterInput.value.split("\n\n").map(p => p.trim()).filter(p => p.length > 0);
            if (!c.loveLetter) c.loveLetter = {};
            c.loveLetter.paragraphs = paras;
            c.loveLetter.signature = `${c.yourName} ❤️`;
        }

        if (this.scratchInput && this.scratchInput.value.trim()) {
            if (!c.scratchCard) c.scratchCard = {};
            c.scratchCard.secretMessage = this.scratchInput.value.trim();
        }

        if (saveAppConfig(c)) {
            window.appConfig = c;
            alert("💖 Settings saved successfully! Refreshing page to update all memories...");
            window.location.reload();
        } else {
            alert("⚠️ Could not save settings to local browser storage.");
        }
    }

    resetSettings() {
        if (confirm("Are you sure you want to reset all custom names and memories back to default?")) {
            resetAppConfig();
            alert("Defaults restored! Reloading...");
            window.location.reload();
        }
    }
}

window.RomanticSettingsController = RomanticSettingsController;
