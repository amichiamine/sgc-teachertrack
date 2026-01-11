// capacitor-loader.js - Charge et initialise Capacitor de manière fiable
// Ce script doit être chargé après les scripts Capacitor vendor

(function () {
    console.log("📱 Initialisation Capacitor...");

    // Vérifier que Capacitor est chargé (via les scripts natifs injectés par l'APK)
    if (typeof Capacitor !== 'undefined') {
        window.Capacitor = Capacitor;
        console.log("✅ Capacitor disponible");
    }

    // Les plugins Filesystem et Preferences sont exposés globalement par l'APK
    // via le bridge natif, pas via les fichiers JS vendor
    // On attend que le bridge soit prêt

    if (window.Capacitor && window.Capacitor.Plugins) {
        window.Filesystem = window.Capacitor.Plugins.Filesystem;
        window.Preferences = window.Capacitor.Plugins.Preferences;

        // Directory et Encoding sont des constantes
        window.Directory = {
            Documents: 'DOCUMENTS',
            Data: 'DATA',
            Library: 'LIBRARY',
            Cache: 'CACHE',
            External: 'EXTERNAL',
            ExternalStorage: 'EXTERNAL_STORAGE'
        };

        window.Encoding = {
            UTF8: 'utf8',
            ASCII: 'ascii',
            UTF16: 'utf16'
        };

        console.log("✅ Plugins Capacitor configurés");
    }

    window.CapacitorReady = true;

    // Signaler que Capacitor est prêt
    window.dispatchEvent(new CustomEvent('capacitor-ready'));
    console.log("✅ Capacitor prêt - événement dispatché");
})();
