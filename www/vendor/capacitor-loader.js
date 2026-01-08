// capacitor-loader.js - Charge et initialise Capacitor de manière fiable
import { Capacitor } from './capacitor-core.js';
import { Filesystem, Directory, Encoding } from './capacitor-filesystem.js';
import { Preferences } from './capacitor-preferences.js';

// Exposer sur window pour l'application
window.Capacitor = Capacitor;
window.Filesystem = Filesystem;
window.Directory = Directory;
window.Encoding = Encoding;
window.Preferences = Preferences;
window.CapacitorReady = true;

console.log("✅ Capacitor chargé via capacitor-loader.js");

// Signaler que Capacitor est prêt
window.dispatchEvent(new CustomEvent('capacitor-ready'));
