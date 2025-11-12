# 🔒 Site Password Protector

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Chrome](https://img.shields.io/badge/Chrome-Compatible-brightgreen.svg)
![Firefox](https://img.shields.io/badge/Firefox-Compatible-orange.svg)

**A powerful browser extension to password-protect specific websites**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Demo](demo.html) • [Contributing](#-contributing)

![Demo Screenshot](https://via.placeholder.com/800x400/667eea/ffffff?text=Site+Password+Protector+Demo)

</div>

---

A browser extension that allows you to password-protect specific websites in Chrome and Firefox.

## Features

- 🔒 Password protect any website
- ⏱️ 30-minute session timeout after successful login
- 🎨 Beautiful modern UI with gradient design
- 🚀 Works on both Chrome and Firefox
- 💾 Syncs protected sites across devices
- 🔄 Easy management of protected sites

## Installation

### Chrome Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked"
4. Select the extension folder (`site blocking extension`)
5. The extension icon should appear in your toolbar

### Firefox Installation

1. First, modify the `manifest.json` for Firefox compatibility:
   - Change `"manifest_version": 3` to `"manifest_version": 2`
   - Replace the `background` section with:
     ```json
     "background": {
       "scripts": ["background.js"]
     }
     ```
   - Change `"service_worker"` references to background scripts

2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Select the `manifest.json` file from the extension folder
5. The extension will be loaded (note: temporary installations are removed when Firefox closes)

**For permanent Firefox installation**, you need to sign your extension through Mozilla's Add-on Developer Hub.

## Usage

### Adding a Protected Site

1. Click the extension icon in your browser toolbar
2. Enter the website domain (e.g., `facebook.com`, `youtube.com`)
   - Don't include `http://`, `https://`, or `www`
3. Enter a password for that site
4. Click "Add Site"

### Accessing Protected Sites

1. Navigate to a password-protected website
2. You'll see a password prompt overlay
3. Enter the correct password
4. Click "Unlock" or press Enter
5. You'll have access for 30 minutes

### Managing Protected Sites

- **View all protected sites**: Open the extension popup
- **Delete protection**: Click the "Delete" button next to any site
- **Clear session**: Click "Clear Session" to require password re-entry immediately

## How It Works

1. **Background Script**: Monitors web navigation and manages password verification
2. **Content Script**: Injects password prompt overlay on protected sites
3. **Storage**: Uses Chrome/Firefox sync storage for protected sites list
4. **Sessions**: Grants 30-minute access after successful authentication

## Security Notes

- Passwords are stored in browser's sync storage (encrypted by browser)
- Sessions expire after 30 minutes of successful login
- Each domain can have its own unique password
- No data is sent to external servers

## Customization

You can customize the extension by modifying:

- **Session Duration**: Edit the timeout in `background.js` (line 42)
  ```javascript
  expires: Date.now() + (30 * 60 * 1000) // 30 minutes
  ```
- **UI Colors**: Modify gradients and colors in `popup.css` and `content.js`
- **Lock Icon**: Change the emoji or add a custom icon in `content.js`

## Troubleshooting

### Extension not blocking sites
- Make sure the domain format is correct (no http://, www, or trailing slashes)
- Try refreshing the page after adding a site

### Password not working
- Passwords are case-sensitive
- Check if the domain was entered correctly
- Try clearing the session and re-entering the password

### Extension not loading
- Check browser console for errors (F12 → Console)
- Ensure all files are in the correct directory
- Verify manifest.json syntax

## File Structure

```
site blocking extension/
├── manifest.json          # Extension configuration
├── background.js          # Background service worker
├── content.js            # Content script for password overlay
├── popup.html            # Extension popup interface
├── popup.css             # Popup styling
├── popup.js              # Popup functionality
├── icons/                # Extension icons (create these)
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md             # This file
```

## Creating Icons

You need to create three icon sizes:
- 16x16 pixels (icon16.png)
- 48x48 pixels (icon48.png)
- 128x128 pixels (icon128.png)

Place them in an `icons` folder. You can use any image editor or online icon generator.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request`

### Development Setup

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/site-password-protector.git
cd site-password-protector

# Load extension in Chrome
# 1. Open chrome://extensions/
# 2. Enable Developer mode
# 3. Click "Load unpacked" and select this folder

# For Firefox, use manifest_firefox.json
```

### Reporting Issues

Found a bug? Have a feature request? Please [open an issue](https://github.com/YOUR_USERNAME/site-password-protector/issues) with:
- Clear description of the problem/feature
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Browser and version information

## 📜 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2025 Site Password Protector Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🌟 Show Your Support

If you find this extension helpful:
- ⭐ Star this repository
- 🐛 Report bugs or suggest features
- 📢 Share with others who might benefit
- 💡 Contribute improvements

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/site-password-protector/issues)
- **Discussions**: [GitHub Discussions](https://github.com/YOUR_USERNAME/site-password-protector/discussions)
- **Email**: your.email@example.com

## 🗺️ Roadmap

Future features we're considering:
- [ ] Import/Export protected sites list
- [ ] Multiple password levels (guest/admin)
- [ ] Time-based access restrictions
- [ ] Usage statistics and analytics
- [ ] Password strength indicator
- [ ] Biometric authentication support
- [ ] Dark mode for password prompt
- [ ] Multi-language support

## 📊 Project Stats

- **Languages**: JavaScript, HTML, CSS
- **Size**: < 100KB
- **Platforms**: Chrome (Manifest V3), Firefox (Manifest V2)
- **No external dependencies**

## 🙏 Acknowledgments

- Icons generated using HTML5 Canvas
- Gradient design inspired by modern UI trends
- Built with ❤️ for privacy and security

---

<div align="center">

**Made with 🔒 by developers who care about privacy**

[⬆ Back to Top](#-site-password-protector)

</div>
