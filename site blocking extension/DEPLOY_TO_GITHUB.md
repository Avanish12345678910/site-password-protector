# Deploying Site Password Protector to GitHub

## Step-by-Step Guide to Deploy Your Extension on GitHub

### Prerequisites
- Git installed on your system
- GitHub account created
- Your extension files ready (already done ✓)

---

## Method 1: Using GitHub Web Interface (Easiest)

### Step 1: Create a New Repository on GitHub
1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon in the top-right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `site-password-protector`
   - **Description**: "Browser extension to password-protect websites for Chrome and Firefox"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README (we already have one)
5. Click **"Create repository"**

### Step 2: Upload Files via Web Interface
1. On your new repository page, click **"uploading an existing file"**
2. Drag and drop all your extension files
3. Write a commit message: "Initial commit - Site Password Protector v1.0.0"
4. Click **"Commit changes"**

---

## Method 2: Using Git Command Line (Recommended)

### Step 1: Initialize Git Repository Locally
```bash
cd "/home/cse/Desktop/site blocking extension"
git init
git add .
git commit -m "Initial commit - Site Password Protector v1.0.0"
```

### Step 2: Create Repository on GitHub
1. Go to [github.com](https://github.com) and create a new repository
2. **DO NOT** initialize with README, .gitignore, or license
3. Copy the repository URL (looks like: `https://github.com/username/site-password-protector.git`)

### Step 3: Connect and Push to GitHub
```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/site-password-protector.git
git push -u origin main
```

---

## Method 3: Using GitHub Desktop (User-Friendly)

### Step 1: Install GitHub Desktop
- Download from [desktop.github.com](https://desktop.github.com)
- Install and sign in with your GitHub account

### Step 2: Publish Repository
1. Open GitHub Desktop
2. Click **File** → **Add Local Repository**
3. Browse to your extension folder
4. Click **"Create a repository"** or **"Publish repository"**
5. Fill in repository details
6. Click **"Publish repository"**

---

## Post-Deployment: Enhance Your GitHub Repository

### Add Topics/Tags
On your GitHub repository page:
1. Click the gear icon next to "About"
2. Add topics: `browser-extension`, `chrome-extension`, `firefox-addon`, `password-protection`, `security`, `javascript`

### Enable GitHub Pages (for demo.html)
1. Go to repository **Settings** → **Pages**
2. Under "Source", select **main** branch
3. Select **/ (root)** folder
4. Click **Save**
5. Your demo will be available at: `https://username.github.io/site-password-protector/demo.html`

### Add a LICENSE File
1. Click **Add file** → **Create new file**
2. Name it `LICENSE`
3. Click **Choose a license template**
4. Select **MIT License** (recommended for open source)
5. Commit the file

### Create Releases
1. Go to your repository
2. Click **"Releases"** → **"Create a new release"**
3. Tag version: `v1.0.0`
4. Release title: `Site Password Protector v1.0.0`
5. Description: Add changelog and features
6. Attach a .zip file of your extension (optional)
7. Click **"Publish release"**

---

## What to Share

### Repository URL
```
https://github.com/YOUR_USERNAME/site-password-protector
```

### Demo Page URL (after enabling GitHub Pages)
```
https://YOUR_USERNAME.github.io/site-password-protector/demo.html
```

### Installation Instructions for Users
```markdown
## Installation from GitHub

1. Download or clone this repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/site-password-protector.git
   ```

2. **For Chrome:**
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the downloaded folder

3. **For Firefox:**
   - Rename `manifest_firefox.json` to `manifest.json`
   - Open `about:debugging#/runtime/this-firefox`
   - Click "Load Temporary Add-on"
   - Select the `manifest.json` file
```

---

## Maintaining Your Repository

### Update Your Extension
```bash
# Make changes to your files
git add .
git commit -m "Description of changes"
git push origin main
```

### Create New Versions
```bash
# Update version in manifest.json
git add manifest.json
git commit -m "Bump version to 1.1.0"
git tag v1.1.0
git push origin main --tags
```

---

## Bonus: Publishing to Chrome Web Store & Firefox Add-ons

### Chrome Web Store
1. Go to [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Pay one-time $5 developer fee
3. Click **"New Item"**
4. Upload a .zip of your extension
5. Fill in store listing details
6. Submit for review

### Firefox Add-ons (AMO)
1. Go to [addons.mozilla.org/developers](https://addons.mozilla.org/developers)
2. Sign in with Firefox Account
3. Click **"Submit a New Add-on"**
4. Upload your extension .zip
5. Choose distribution channel
6. Submit for review

---

## Need Help?

- **Git Issues**: Check [git-scm.com/docs](https://git-scm.com/docs)
- **GitHub Help**: Visit [docs.github.com](https://docs.github.com)
- **Extension Issues**: Open an issue on your GitHub repository

---

Good luck with your deployment! 🚀
