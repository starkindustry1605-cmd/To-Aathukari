/**
 * ===================================================================
 * ⏳ LIVE ANNIVERSARY & RELATIONSHIP COUNTER
 * ===================================================================
 * Calculates precise years, months, days, hours, minutes, seconds
 * and cute metrics (total days, total seconds, estimated heartbeats).
 */

class RomanticRelationshipCounter {
    constructor() {
        this.config = window.appConfig || {};
        this.startDate = new Date(this.config.anniversaryDate || "2023-09-20T00:00:00");
        this.timerInterval = null;

        this.init();
    }

    init() {
        this.updateCounter();
        this.timerInterval = setInterval(() => this.updateCounter(), 1000);
    }

    updateCounter() {
        const now = new Date();
        const diffMs = now - this.startDate;

        if (diffMs < 0) {
            return; // Future date safeguard
        }

        // Detailed Date Breakdowns
        let start = new Date(this.startDate);
        let end = new Date(now);

        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        let days = end.getDate() - start.getDate();

        if (days < 0) {
            months--;
            const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
            days += prevMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        const totalSeconds = Math.floor(diffMs / 1000);
        const hours = Math.floor((totalSeconds / 3600) % 24);
        const minutes = Math.floor((totalSeconds / 60) % 60);
        const seconds = totalSeconds % 60;

        const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
        const estimatedHeartbeats = (totalMinutes) => (totalMinutes * 75).toLocaleString();

        // Update DOM elements
        this.setElemText('counter-years', years);
        this.setElemText('counter-months', months);
        this.setElemText('counter-days', days);
        this.setElemText('counter-hours', String(hours).padStart(2, '0'));
        this.setElemText('counter-minutes', String(minutes).padStart(2, '0'));
        this.setElemText('counter-seconds', String(seconds).padStart(2, '0'));

        // Detailed Stats
        this.setElemText('stat-total-days', `${totalDays.toLocaleString()} Days`);
        this.setElemText('stat-total-hours', `${totalHours.toLocaleString()} Hours`);
        this.setElemText('stat-heartbeats', `${estimatedHeartbeats(Math.floor(totalSeconds / 60))} Beats`);
    }

    setElemText(id, val) {
        const elem = document.getElementById(id);
        if (elem && elem.innerText !== String(val)) {
            elem.innerText = val;
        }
    }

    destroy() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }
}

window.RomanticRelationshipCounter = RomanticRelationshipCounter;
