// Fichier : copy-libs.js
const fs = require('fs');
const path = require('path');

const libs = [
    // Capacitor Core
    { src: 'node_modules/@capacitor/core/dist/index.js', dest: 'www/vendor/capacitor-core.js' },
    // Plugin Filesystem
    { src: 'node_modules/@capacitor/filesystem/dist/plugin.js', dest: 'www/vendor/capacitor-filesystem.js' },
    // Plugin Preferences
    { src: 'node_modules/@capacitor/preferences/dist/plugin.js', dest: 'www/vendor/capacitor-preferences.js' }
];

if (!fs.existsSync('www/vendor')) fs.mkdirSync('www/vendor', { recursive: true });

libs.forEach(lib => {
    if (fs.existsSync(lib.src)) {
        fs.copyFileSync(lib.src, lib.dest);
        console.log(`✅ Copié : ${lib.dest}`);
    } else {
        console.error(`❌ ERREUR : Fichier source introuvable ${lib.src}`);
    }
});
