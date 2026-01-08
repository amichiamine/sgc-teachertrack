# Génération APK via GitHub Actions

## 📋 Configuration Actuelle

| Composant | Version |
|-----------|---------|
| Node.js | 22 |
| Java | 21 (Zulu) |
| Capacitor CLI | 8.0.0 |
| Capacitor Android | 8.0.0 |
| Gradle | 8.11.1 |
| Android SDK | 35 (compileSdk) |
| Android minSdk | 23 |

---

## 🚀 Génération Automatique

L'APK se génère **automatiquement** à chaque `git push` sur la branche `main`.

### Récupérer l'APK :
1. Aller sur [GitHub Actions](https://github.com/amichiamine/sgc-teachertrack/actions)
2. Cliquer sur le dernier workflow réussi (✅)
3. Télécharger l'artifact `sgc-teachertrack-debug` en bas de page
4. Extraire le ZIP → `app-debug.apk`

### Génération manuelle :
- Aller sur GitHub Actions → "Générer APK (Debug)" → "Run workflow"

---

## 📝 Mises à Jour de l'Application

### ✅ Modifications simples (UI, fonctionnalités)

Pour les mises à jour qui ne touchent que le **contenu web** :

| Fichier à modifier | Description |
|-------------------|-------------|
| `index.html` | Interface principale, logique JavaScript, styles |
| `tailwind.css` | Styles CSS |
| `fontawesome.min.css` | Icônes FontAwesome |

**Procédure :**
```bash
# 1. Modifier index.html (ou autres fichiers web)
# 2. Commit et push
git add .
git commit -m "feat: description de la modification"
git push
# 3. L'APK sera généré automatiquement
```

> **Note :** Le script `build.js` copie automatiquement les fichiers vers `www/` puis `cap sync` les synchronise vers Android.

---

### ⚠️ Modifications avancées

#### Changer le nom de l'application
| Fichier | Modification |
|---------|--------------|
| `capacitor.config.json` | Modifier `appName` |
| `android/app/src/main/res/values/strings.xml` | Modifier `app_name` |

#### Changer l'icône de l'application
| Fichier | Résolution |
|---------|------------|
| `android/app/src/main/res/mipmap-mdpi/` | 48x48 px |
| `android/app/src/main/res/mipmap-hdpi/` | 72x72 px |
| `android/app/src/main/res/mipmap-xhdpi/` | 96x96 px |
| `android/app/src/main/res/mipmap-xxhdpi/` | 144x144 px |
| `android/app/src/main/res/mipmap-xxxhdpi/` | 192x192 px |

Fichiers à remplacer : `ic_launcher.png`, `ic_launcher_round.png`, `ic_launcher_foreground.png`

#### Changer la version de l'application
| Fichier | Modification |
|---------|--------------|
| `android/app/build.gradle` | `versionCode` (numéro incrémental) et `versionName` (ex: "1.1") |

#### Ajouter des permissions Android
| Fichier | Modification |
|---------|--------------|
| `android/app/src/main/AndroidManifest.xml` | Ajouter les permissions nécessaires |

#### Ajouter un nouveau plugin Capacitor
```bash
npm install @capacitor/plugin-name
npx cap sync android
git add .
git commit -m "feat: ajout plugin-name"
git push
```

---

## 📁 Structure des Fichiers Clés

```
sgc-teachertrack/
├── index.html              ← Source principale (modifier ici)
├── build.js                ← Script de copie vers www/
├── capacitor.config.json   ← Config Capacitor
├── package.json            ← Dépendances npm
├── www/                    ← Assets web (généré par build.js)
├── android/                ← Projet Android natif
│   ├── app/
│   │   ├── build.gradle    ← Version app, SDK
│   │   └── src/main/
│   │       ├── AndroidManifest.xml
│   │       ├── res/        ← Icônes, splash screens
│   │       └── assets/public/  ← Web assets (généré par cap sync)
│   └── variables.gradle    ← Versions SDK Android
└── .github/workflows/
    └── build-apk.yml       ← Workflow GitHub Actions
```

---

## 🔧 Workflow GitHub Actions

Fichier : `.github/workflows/build-apk.yml`

```yaml
name: Générer APK (Debug)

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Setup Node.js 22
      - Setup Java 21 (Zulu)
      - npm ci
      - node build.js
      - npx cap sync android
      - ./gradlew assembleDebug
      - Upload artifact
```

---

## 📱 Publication Play Store (Futur)

Pour publier sur le Play Store, modifications nécessaires :

1. **Créer un keystore** :
   ```bash
   keytool -genkey -v -keystore release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias release
   ```

2. **Configurer la signature** dans `android/app/build.gradle` :
   ```gradle
   signingConfigs {
       release {
           storeFile file('release.jks')
           storePassword System.getenv('KEYSTORE_PASSWORD')
           keyAlias 'release'
           keyPassword System.getenv('KEY_PASSWORD')
       }
   }
   ```

3. **Ajouter les secrets GitHub** :
   - `KEYSTORE_PASSWORD`
   - `KEY_PASSWORD`
   - `KEYSTORE_BASE64` (keystore encodé en base64)

4. **Modifier le workflow** pour utiliser `assembleRelease` au lieu de `assembleDebug`

---

## 📅 Historique

- **2026-01-08** : Configuration initiale GitHub Actions
  - Node.js 22, Java 21
  - Capacitor 8.0.0
  - Build Debug automatique
