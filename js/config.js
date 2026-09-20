/**
 * ===================================================================
 * 💖 ANNIVERSARY WEBSITE CONFIGURATION & DATA STORE
 * ===================================================================
 * You can customize any of these values!
 * Everything can also be edited live through the in-browser Settings Modal.
 */

const DEFAULT_CONFIG = {
    // 👫 Couple Names
    yourName: "Sanjay",
    partnerName: "My Love",
    nicknames: "Babe, Sweetheart, Cutie Pie",

    // 🗓️ Relationship Start Date (September 21, 2023)
    anniversaryDate: "2023-09-21T00:00:00",

    // 🔐 Lock Screen Security
    passcode: "051605", // Secret passcode (updated)
    passcodeHint: "Our date of birth ❤️",

    // 🎵 Audio Settings
    defaultMusicVolume: 0.5,
    autoPlayOnUnlock: true,

    // 💌 The Romantic Love Letter (Revealed inside the wax-sealed envelope)
    loveLetter: {
        salutation: "To My Dearest Girlfriend,",
        badge: "Celebrating 3 Magical Years Together",
        paragraphs: [
            "Three years ago today, on September 21, 2023, my world changed in the most beautiful way imaginable. From the moment you walked into my life, you brought a warmth, laughter, and light that I never knew I was missing.",
            "Looking back over these past 3 years, every single memory with you feels like a priceless treasure. From the first time we met at the flash mob, to the magical moment at 11:30 when you accepted my love, to every sweet smile, every late-night conversation, and every journey together — I have fallen deeper and deeper in love with you every single day.",
            "You are not just my partner; you are my best friend, my safe haven, and my favorite person in the whole universe. Your kindness, your radiant smile, and your gentle soul inspire me endlessly.",
            "Thank you for loving me, for believing in us, and for making these three years the most wonderful chapter of my life. I promise to keep making you laugh, to stand by your side through every season, and to love you more with every sunrise.",
            "Happy 3rd Anniversary, my forever love."
        ],
        signOff: "Forever & Always Yours,",
        signature: "Loveable KD ❤️"
    },

    // 📸 Polaroid Photo Gallery (Use only existing files from assets/images/)
    gallery: [
        {
            title: "Shopping & Silly Smiles 🛍️",
            date: "Our Favourite Outing",
            caption: "You browsing through racks while I browse your smile — the best shopping I ever did was falling for you.",
            image: "assets/images/media_1789904908363.jpg",
            rotation: "-2deg",
            sticker: "✨ Cutest Couple"
        },
        {
            title: "Mirror Selfie, My Queen 💕",
            date: "Stolen Glances",
            caption: "Every mirror we stand in front of shows the same thing — the most beautiful girl and the luckiest guy.",
            image: "assets/images/media_1789904908318.jpg",
            rotation: "2.5deg",
            sticker: "💖 Soulmates"
        },
        {
            title: "Our Special Cafe Date ☕",
            date: "Sweet Stolen Hours",
            caption: "Hours flew by like minutes — talking, laughing, and getting lost in your gorgeous smile across the table.",
            image: "assets/images/media_1789904999457.jpg",
            rotation: "-1.5deg",
            sticker: "🍽️ Date Vibes"
        },
        {
            title: "Two Idiots, One Heart 😂",
            date: "Partner in Crime",
            caption: "Nobody makes me laugh the way you do. Life with you is the greatest comedy and romance combined.",
            image: "assets/images/media_1789904999454.jpg",
            rotation: "3deg",
            sticker: "🕶️ Pure Joy"
        },
        {
            title: "Late Night Cozy Calls 🌙",
            date: "Sleepy Sweet Dreams",
            caption: "Video calls until the phone went dark — you are the last thought I had and the sweetest dream I woke into.",
            image: "assets/images/media_1789904999445.jpg",
            rotation: "-2.5deg",
            sticker: "🌙 Cozy Vibes"
        },
        {
            title: "Framed With Love 💛",
            date: "Our Little World",
            caption: "This frame could never hold all the love between us — but it tries its best, just like I do every day for you.",
            image: "assets/images/media_1789904908325.jpg",
            rotation: "1.5deg",
            sticker: "🎨 Masterpiece"
        },
        {
            title: "Wherever You Are, Home 🏡",
            date: "My Safe Haven",
            caption: "They say home is a place — I say home is being anywhere on earth as long as you are right beside me.",
            image: "assets/images/media_1789904908321.jpg",
            rotation: "-2deg",
            sticker: "👑 My Queen"
        },
        {
            title: "Rainy Streetlamp Laughs",
            date: "Captured Moment",
            caption: "Laughing under the rainy streetlamp — a small adventure that became ours.",
            image: "assets/images/media_1789905490954.jpg",
            rotation: "-1deg",
            sticker: "✨ Memory"
        },
        {
            title: "Sunset Drive",
            date: "Captured Moment",
            caption: "Sunset drives with your head on my shoulder — quiet, perfect moments.",
            image: "assets/images/media_1789905490956.jpg",
            rotation: "2deg",
            sticker: "✨ Memory"
        },
        {
            title: "Candid Smile",
            date: "Captured Moment",
            caption: "That candid where your smile lit the whole room — my favorite sight.",
            image: "assets/images/media_1789905490959.jpg",
            rotation: "-2deg",
            sticker: "✨ Memory"
        },
        {
            title: "Midnight Kitchen Dances",
            date: "Captured Moment",
            caption: "Midnight kitchen dances — warm tea, warmer hugs, and whispers.",
            image: "assets/images/media_1789905490962.jpg",
            rotation: "1deg",
            sticker: "✨ Memory"
        },
        {
            title: "Bridge Handhold",
            date: "Captured Moment",
            caption: "Holding hands on the bridge — every heartbeat felt like home.",
            image: "assets/images/media_1789905490993.jpg",
            rotation: "0deg",
            sticker: "✨ Memory"
        }
    ],

    // 🎁 Mystery Box Surprise Offer
    mysterySurprise: {
        title: "👑 The Ultimate Anniversary Surprise Offer 👑",
        tagline: "Specially prepared for the love of my life",
        offers: [
            "🛍️ Unlimited Shopping Spree (Pick whatever your heart loves!)",
            "🍽️ Special Romantic Dinner & Dessert Date on Loveable KD",
            "🎁 A Secret Handcrafted Anniversary Gift waiting for you",
            "🛵 Long Ride & Late Night Quality Time with infinite cuddles"
        ],
        footerNote: "✨ Valid for redemption immediately and honored forever! ❤️"
    },

    // 🎫 3 Date Options (She Selects 1)
    dateOptions: [
        {
            id: "bike-ride",
            title: "Cozy Bike Ride 🛵",
            icon: "🛵",
            subtitle: "Wind in our hair, music playing & holding you tight",
            description: "A romantic scenic bike ride through the coolest roads with your arms wrapped around me and endless peaceful vibes.",
            color: "from-pink-500 to-rose-600",
            glow: "rgba(244,63,94,0.4)"
        },
        {
            id: "dinner-date",
            title: "Romantic Dinner Date 🍽️",
            icon: "🍽️",
            subtitle: "Delicious food, sweet desserts & candlelight talks",
            description: "A fancy or cozy dinner date at our favorite food spot, featuring all your favorite dishes, drinks, desserts, and quiet quality time.",
            color: "from-purple-500 to-indigo-600",
            glow: "rgba(168,85,247,0.4)"
        },
        {
            id: "night-walk",
            title: "Peaceful Night Walk 🌙",
            icon: "🌙",
            subtitle: "Holding hands under the moonlight & deep talks",
            description: "A calm, dreamy night walk under the stars holding hands, sharing laughs, whispering secrets, and making new memories.",
            color: "from-amber-500 to-rose-500",
            glow: "rgba(251,191,36,0.4)"
        }
    ],

    selectedDateOption: null,

    // Control whether selections (like chosen date option) persist to localStorage
    // Set to false for demo mode so choices do not persist across refreshes
    persistSelections: false,

    // 🪙 Scratch-Off Secret Card
    scratchCard: {
        title: "✨ Mystery Anniversary Surprise ✨",
        instruction: "Use your finger or mouse cursor to scratch the silver foil!",
        secretMessage: "💍 My Forever Promise: You are my greatest gift, and I promise to love, protect, and cherish you today, tomorrow, and for all our years ahead! - Loveable KD ❤️",
        giftCode: "ANNIVERSARY-YEAR-3-SPECIAL"
    },

    // 💖 40+ Reasons Why I Love You (For the Love Jar)
    reasonsWhyILoveYou: [
        "The way your eyes sparkle whenever you smile genuinely.",
        "How you make even the simplest moments feel like a dream.",
        "Your contagious laugh that instantly brightens my worst days.",
        "The warm feeling I get every time your hand slips into mine.",
        "The magical memory of 11:30 when you accepted my love.",
        "The way we locked eyes at the flash mob on day one.",
        "Your sweet forehead kisses and warm hugs.",
        "Your kindness, empathy, and huge golden heart.",
        "The way we can communicate with just a single look across a room.",
        "How you always remember the tiniest details about us.",
        "The sweet way you call me Loveable KD.",
        "Because you are my biggest support and believe in me always.",
        "The silly jokes and laughs we share when we are together.",
        "How beautiful you look in every outfit with your glowing smile.",
        "The way your hugs can melt away all my stress in seconds.",
        "Because being with you feels like home.",
        "The memories of our first kiss on Swetha's birthday.",
        "How proud I feel whenever I see you wearing your silver bangle.",
        "Because you are my best friend and soulmate all in one.",
        "The cute excitement in your voice when you talk about things you love.",
        "Because 3 years later, my heart still beats faster whenever I see you.",
        "The way you make every journey unforgettable.",
        "Because loving you is the easiest and best decision I've ever made.",
        "How we balance each other out like two puzzle pieces.",
        "Because you are my favorite person in the entire world.",
        "The way you look at me like I am your whole universe.",
        "Because our future together is the brightest thing I can ever dream of.",
        "How we have built 3 years of pure trust, respect, and unconditional love.",
        "Because you are my forever and always, my love."
    ],

    // 🧩 4 Custom Anniversary Quiz Questions (Exact details)
    quizQuestions: [
        {
            question: "When did we meet at first?",
            options: [
                "College",
                "Mess",
                "Flash mob",
                "FET"
            ],
            correctIndex: 2, // Flash mob
            sweetNote: "Flash mob! The moment our eyes met and our magical love story began! ✨❤️"
        },
        {
            question: "What's the time that you accepted my love?",
            options: [
                "10:45",
                "11:30",
                "11:45",
                "11:20"
            ],
            correctIndex: 1, // 11:30
            sweetNote: "11:30! The exact magical minute that made me the happiest guy on earth! ⏰💖"
        },
        {
            question: "When was our first kiss?",
            options: [
                "Kanchana birthday",
                "Your birthday",
                "Sanjay birthday",
                "Swetha birthday"
            ],
            correctIndex: 3, // Swetha birthday
            sweetNote: "Swetha's birthday! A sweet moment filled with butterflies and pure magic! 💋✨"
        },
        {
            question: "What was the first gift that I have given to you?",
            options: [
                "Dolls",
                "Silver bangle",
                "Ring",
                "Watch"
            ],
            correctIndex: 1, // Silver bangle
            sweetNote: "The Silver Bangle! A timeless piece for the most precious girl in my life! 💍💖"
        }
    ]
};

// Helper to get active configuration (merged with any saved in localStorage)
function getAppConfig() {
    try {
        const saved = localStorage.getItem("anniversary_config_v4");
        if (saved) {
            const parsed = JSON.parse(saved);
            return { ...DEFAULT_CONFIG, ...parsed };
        }
    } catch (e) {
        console.warn("Using default config due to error reading storage", e);
    }
    return { ...DEFAULT_CONFIG };
}

// Helper to save configuration updates
function saveAppConfig(newConfig) {
    try {
        localStorage.setItem("anniversary_config_v4", JSON.stringify(newConfig));
        return true;
    } catch (e) {
        console.error("Error saving config", e);
        return false;
    }
}

// Helper to reset configuration to defaults
function resetAppConfig() {
    try {
        localStorage.removeItem("anniversary_config_v4");
        return true;
    } catch (e) {
        return false;
    }
}

window.appConfig = getAppConfig();

// Enforce updated core settings requested by user (ensure saved config matches defaults for these keys)
(() => {
    const keysToEnforce = ['anniversaryDate', 'passcode', 'persistSelections'];
    let changed = false;
    keysToEnforce.forEach(k => {
        if (window.appConfig[k] !== DEFAULT_CONFIG[k]) {
            window.appConfig[k] = DEFAULT_CONFIG[k];
            changed = true;
        }
    });
    if (changed) {
        try {
            saveAppConfig(window.appConfig);
        } catch (e) {
            console.warn('Could not save enforced config', e);
        }
    }
})();

// If selections are disabled for demo, clear any previously saved selection
(() => {
    if (window.appConfig.persistSelections === false && window.appConfig.selectedDateOption) {
        window.appConfig.selectedDateOption = null;
        try { saveAppConfig(window.appConfig); } catch (e) { /* ignore */ }
    }
})();
