import { initAudio } from './engine/audio-mixer.js';
import { initCanvas } from './engine/canvas-fx.js';
import { initScrollStory } from './engine/scroll-story.js';
import { initGallery } from './components/gallery.js';
import { initLetter } from './components/letter.js';
import { initEasterEggs } from './components/easter-eggs.js';
import { populateAllData } from './components/data-populate.js';

const app = document.getElementById('app');
const preloader = document.getElementById('preloader');
const openBtn = document.getElementById('open-story');
const manualMusic = document.getElementById('manual-music');
const manualBtn = document.getElementById('manual-music-button');

// Initial Setup
window.addEventListener('load', async () => {
    document.body.classList.add('no-scroll');

    populateAllData();
    initCanvas();
    initGallery();
    initLetter();
    initEasterEggs();
    initAudio();

    setTimeout(async () => {
        preloader.classList.remove('active');
        preloader.classList.add('hidden');

        const audio = document.getElementById('bgm');
        try {
            await audio.play();
            if (window.audioAPI) {
                window.audioAPI.syncState(true);
            }
            app.classList.remove('hidden');
            document.body.classList.remove('no-scroll');
            initScrollStory();
        } catch (error) {
            manualMusic.classList.remove('hidden');
            app.classList.remove('hidden');
            initScrollStory();
        }
    }, 1500);
});

manualBtn.addEventListener('click', async () => {
    const audio = document.getElementById('bgm');
    try {
        await audio.play();
        if (window.audioAPI) {
            window.audioAPI.syncState(true);
        }
    } catch (error) {
    }
    manualMusic.classList.add('hidden');
    app.classList.remove('hidden');
    document.body.classList.remove('no-scroll');
});

// Opening Scene Interaction
openBtn.addEventListener('click', () => {
    // Scroll to first chapter
    document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
});
