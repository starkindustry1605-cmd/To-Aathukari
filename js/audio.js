/**
 * ===================================================================
 * 🎵 ROMANTIC AUDIO & SOUND FX ENGINE
 * ===================================================================
 * Provides background romantic melody (Web Audio API Synthesizer + Audio stream)
 * and interactive sound effects (sparkle chime, stamp, envelope unwrap).
 */

class RomanticAudioController {
    constructor() {
        this.isPlaying = false;
        this.volume = (window.appConfig && window.appConfig.defaultMusicVolume) || 0.4;
        this.audioCtx = null;
        this.synthTimer = null;
        this.bgAudio = null;
        this.trackIndex = 0;

        // Mild, soft romantic background tracks
        this.tracks = [
            {
                title: "Uploaded Anniversary Song",
                artist: "Personal Upload",
                url: "assets/audio/song.mp3"
            }
        ];

        this.initUI();
    }

    initAudioContext() {
        if (!this.audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.audioCtx = new AudioContext();
            }
        }
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
    }

    initUI() {
        const playBtn = document.getElementById('music-toggle-btn');
        const vinyl = document.getElementById('vinyl-disc');
        const volumeSlider = document.getElementById('music-volume-slider');

        if (playBtn) {
            playBtn.addEventListener('click', () => this.togglePlay());
        }

        if (volumeSlider) {
            volumeSlider.value = this.volume * 100;
            volumeSlider.addEventListener('input', (e) => {
                this.setVolume(e.target.value / 100);
            });
        }
    }

    togglePlay() {
        this.initAudioContext();
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        this.initAudioContext();
        this.isPlaying = true;

        const vinyl = document.getElementById('vinyl-disc');
        const musicIcon = document.getElementById('music-icon');
        const statusText = document.getElementById('music-status-text');

        if (vinyl) vinyl.classList.add('spin-animation');
        if (musicIcon) {
            musicIcon.innerHTML = `<svg class="w-5 h-5 text-rose-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
        }
        if (statusText) statusText.innerText = `Playing: ${this.tracks[this.trackIndex].title}`;

        // Attempt HTML5 audio first; fallback to Web Audio Synth if blocked
        if (!this.bgAudio) {
            this.bgAudio = new Audio(this.tracks[this.trackIndex].url);
            this.bgAudio.loop = true;
            this.bgAudio.volume = this.volume;
            this.bgAudio.crossOrigin = "anonymous";
        }

        const playPromise = this.bgAudio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Audio started successfully
            }).catch(error => {
                console.log("Audio URL playback restricted/unavailable, switching to crystal synth melody:", error);
                this.startSynthMelody();
            });
        }
    }

    pause() {
        this.isPlaying = false;
        const vinyl = document.getElementById('vinyl-disc');
        const musicIcon = document.getElementById('music-icon');
        const statusText = document.getElementById('music-status-text');

        if (vinyl) vinyl.classList.remove('spin-animation');
        if (musicIcon) {
            musicIcon.innerHTML = `<svg class="w-5 h-5 text-rose-300" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
        }
        if (statusText) statusText.innerText = "Paused";

        if (this.bgAudio) {
            this.bgAudio.pause();
        }
        this.stopSynthMelody();
    }

    setVolume(vol) {
        this.volume = Math.max(0, Math.min(1, vol));
        if (this.bgAudio) {
            this.bgAudio.volume = this.volume;
        }
    }

    /**
     * Web Audio API Romantic Music Box / Piano Synthesizer
     * Plays a soothing, loopable romantic arpeggio in F-Major / D-Minor
     */
    startSynthMelody() {
        if (this.synthTimer) return;
        this.initAudioContext();
        if (!this.audioCtx) return;

        // F Major 7th & C Major arpeggio notes in Hz
        const notes = [
            349.23, // F4
            440.00, // A4
            523.25, // C5
            659.25, // E5
            523.25, // C5
            440.00, // A4
            392.00, // G4
            493.88, // B4
            587.33, // D5
            698.46, // F5
            587.33, // D5
            493.88  // B4
        ];

        let noteStep = 0;
        this.synthTimer = setInterval(() => {
            if (!this.isPlaying) return;
            const freq = notes[noteStep % notes.length];
            this.playTone(freq, 1.2, 'triangle', this.volume * 0.35);
            
            // Add subtle bass root note every 6 steps
            if (noteStep % 6 === 0) {
                const bassFreq = (noteStep % 12 === 0) ? 174.61 : 130.81; // F3 or C3
                this.playTone(bassFreq, 2.0, 'sine', this.volume * 0.25);
            }
            
            noteStep++;
        }, 550);
    }

    stopSynthMelody() {
        if (this.synthTimer) {
            clearInterval(this.synthTimer);
            this.synthTimer = null;
        }
    }

    playTone(freq, duration = 0.5, type = 'sine', gainVal = 0.2) {
        if (!this.audioCtx) return;
        try {
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

            gain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(Math.max(0.001, gainVal), this.audioCtx.currentTime + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

            osc.connect(gain);
            gain.connect(this.audioCtx.destination);

            osc.start();
            osc.stop(this.audioCtx.currentTime + duration);
        } catch (e) {
            // Context not ready
        }
    }

    /**
     * Sound Effect: Magical Success / Unlock Chime
     */
    playSuccessChime() {
        this.initAudioContext();
        if (!this.audioCtx) return;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            setTimeout(() => {
                this.playTone(freq, 0.7, 'sine', 0.25);
            }, idx * 120);
        });
    }

    /**
     * Sound Effect: Heart Sparkle / Coupon Stamp
     */
    playSparkleEffect() {
        this.initAudioContext();
        if (!this.audioCtx) return;
        const notes = [880, 1174.66, 1396.91, 1760];
        notes.forEach((freq, idx) => {
            setTimeout(() => {
                this.playTone(freq, 0.35, 'triangle', 0.2);
            }, idx * 70);
        });
    }

    /**
     * Sound Effect: Error Shake
     */
    playErrorBuzzer() {
        this.initAudioContext();
        if (!this.audioCtx) return;
        this.playTone(180, 0.25, 'sawtooth', 0.15);
        setTimeout(() => this.playTone(140, 0.3, 'sawtooth', 0.15), 120);
    }
}

window.RomanticAudioController = RomanticAudioController;
