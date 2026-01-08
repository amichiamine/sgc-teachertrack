const fs = require('fs');
const path = require('path');

// 1. Liste des fichiers "Source" (Racine) à envoyer vers "Android" (www)
const filesToCopy = [
    'index.html',
    'tailwind.css',
    'xlsx.full.min.js',
    'vue.global.js',
    'fontawesome.min.css'
];

// 2. Copie des fichiers
if (!fs.existsSync('www')) fs.mkdirSync('www');

filesToCopy.forEach(f => {
    if (fs.existsSync(f)) {
        fs.copyFileSync(f, `www/${f}`);
        console.log(`✅ Copié vers www: ${f}`);
    }
});

// 3. Copie des dossiers (vendor, webfonts...)
const copyDir = (src, dest) => {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    let entries = fs.readdirSync(src, { withFileTypes: true });
    for (let entry of entries) {
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);
        entry.isDirectory() ? copyDir(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
    }
};

if (fs.existsSync('vendor')) copyDir('vendor', 'www/vendor');
if (fs.existsSync('webfonts')) copyDir('webfonts', 'www/webfonts');
if (fs.existsSync('icons')) copyDir('icons', 'www/icons'); // Si vous avez des icônes

console.log("🚀 Build terminé ! Vous pouvez lancer 'npx cap sync'");
