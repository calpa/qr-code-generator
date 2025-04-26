# QR Code Generator 🚀

<p align="center">
  <a href="https://pages.cloudflare.com/"><img src="https://img.shields.io/badge/Cloudflare%20Pages-Build-brightgreen?logo=cloudflare" alt="Cloudflare Pages Build"></a>
  <a href="https://github.com/calpa/qr-code-generator/blob/main/LICENSE"><img src="https://img.shields.io/github/license/calpa/qr-code-generator?color=blue" alt="License"></a>
  <a href="https://github.com/calpa/qr-code-generator/pulls"><img src="https://img.shields.io/github/issues-pr/calpa/qr-code-generator?label=PRs" alt="Pull Requests"></a>
  <a href="https://github.com/calpa/qr-code-generator/stargazers"><img src="https://img.shields.io/github/stars/calpa/qr-code-generator?style=social" alt="GitHub stars"></a>
</p>

A modern web app to generate, customize, preview, and download QR codes with support for logo overlays and color customization.

> 🌩️ **Built & deployed with [Cloudflare Pages](https://pages.cloudflare.com/)!**

[![Edit in StackBlitz ⚡️](https://img.shields.io/badge/Edit%20in-StackBlitz-blue?logo=stackblitz)](https://stackblitz.com/~/github.com/calpa/qr-code-generator)

---

## ✨ Features
- 📱 Generate QR codes for any text or URL
- 🎨 Customize size, foreground/background color, error correction level, and margin
- 🖼️ Upload a logo to embed in the QR code
- 👀 Live preview of your QR code
- ⬇️ Download QR code as PNG
- 📋 Copy QR code to clipboard
- 💎 Built with a modern, responsive UI

## 🚀 Demo
[Live Demo on StackBlitz](https://stackblitz.com/~/github.com/calpa/qr-code-generator)

## ⚡ Installation

```bash
# Clone the repository
git clone https://github.com/calpa/qr-code-generator.git
cd qr-code-generator

# Install dependencies (using yarn or npm)
yarn install
# or
npm install
```

## 🛠️ Usage

### Development
```bash
yarn dev
# or
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) to view the app.

### Build for Production
```bash
yarn build
# or
npm run build
```

### Preview Production Build
```bash
yarn preview
# or
npm run preview
```

## 🧰 Tech Stack
- ⚛️ [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- ⚡ [Vite](https://vitejs.dev/)
- 💨 [Tailwind CSS](https://tailwindcss.com/)
- 🔳 [qrcode.react](https://github.com/zpao/qrcode.react) for QR code rendering
- 📂 [react-dropzone](https://react-dropzone.js.org/) for file uploads
- 🌈 [react-colorful](https://omgovich.github.io/react-colorful/) for color pickers

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 📝 License
[MIT](LICENSE)