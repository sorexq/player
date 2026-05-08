# 🎬 Player - Local-First Video Player

A premium, local-first video player built with Go and SvelteKit. Upload local videos for one-time viewing with a beautiful Gruvbox-themed interface.

## ✨ Features

### Core Functionality
- **Local-First Upload** - Videos loaded via `URL.createObjectURL` (no server storage)
- **One-Time Viewing** - Blob URLs auto-revoke on navigate/exit
- **Plyr.js Engine** - Advanced video controls with custom features

### Video Controls
- **Long-Press Spacebar** - Hold for 2x speed, release to return to normal
- **Short Press Spacebar** - Play/Pause toggle
- **Resolution Badge** - Auto-detects and displays video quality (4K, 1080p, etc.)
- **Subtitle Upload** - Support for .vtt and .srt files
- **External Audio** - Sync external audio track URLs with video

### UI/UX
- **Gruvbox Theme** - Dark/Light toggle with glassmorphism effects
- **Premium Design** - Gradients, animations, smooth transitions
- **Settings Page** - Configure playback, metadata display, audio controls
- **Metadata Display** - Toggle file name, duration, subtitle info

## 🚀 Tech Stack

| Component | Technology |
|-----------|------------|
| Backend | Go (Golang) |
| Frontend | SvelteKit 5 + TypeScript |
| Video Engine | Plyr.js |
| Styling | Custom Gruvbox CSS + Glassmorphism |
| State Management | Svelte 5 Runes ($state, $derived, $effect) |

## 📋 Quick Start

### Prerequisites
- Go 1.21+ installed
- Node.js 18+ and npm installed

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sorexq/player.git
   cd player
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Build the frontend**
   ```bash
   npm run build
   ```

4. **Run the backend**
   ```bash
   cd ../backend
   go run main.go
   ```

5. **Open in browser**
   ```
   http://localhost:8080
   ```

### Development Mode

For frontend development with hot reload:
```bash
cd frontend
npm run dev
```
Access at `http://localhost:5173`

## 🎮 Usage

### Upload Video
1. Click "Select Video File" on the home page
2. Choose a local video file (any format supported by your browser)
3. Player page opens automatically

### Video Controls
- **Spacebar** (short press) - Play/Pause
- **Spacebar** (hold 500ms+) - 2x speed playback
- **CC Button** - Enable/disable subtitles
- **Settings** - Click gear icon to configure preferences

### Upload Subtitles
1. On the player page, click "Select Subtitle File"
2. Choose .vtt or .srt file
3. Click the **CC button** in player controls to enable

### Settings
Access via the gear icon (⚙️) in header:
- **Playback** - Set default initial state (Paused/Playing)
- **Metadata** - Toggle metadata display below video
- **External Audio** - Add audio track URLs to sync
- **Audio UI** - Toggle Ark UI dropdown for audio selection

## 🎨 Theme

The app features a beautiful **Gruvbox** color scheme:
- **Dark Mode** (default) - Warm, eye-friendly colors
- **Light Mode** - Clean, bright alternative

Theme toggle is in the header. Preference is persisted to localStorage.

## 📁 Project Structure

```
player/
├── backend/               # Go backend
│   ├── main.go        # Static file server + SPA fallback
│   └── go.mod
├── frontend/             # SvelteKit frontend
│   ├── src/
│   │   ├── routes/    # File-based routing
│   │   │   ├── +layout.svelte   # Root layout with theme
│   │   │   ├── +page.svelte     # Home/Upload page
│   │   │   ├── player/           # Player page
│   │   │   └── settings/         # Settings page
│   │   ├── components/        # Reusable UI components
│   │   ├── lib/
│   │   │   ├── stores/   # Svelte 5 state management
│   │   │   ├── styles/   # Gruvbox CSS
│   │   │   └── plyr-config.ts # Plyr configuration
│   │   └── static/
│   └── package.json
└── README.md
```

## 🔧 Build & Deploy

### Build Frontend
```bash
cd frontend
npm run build
```

### Run Production Server
```bash
cd backend
go run main.go
```

The Go server serves the static build from `frontend/build` with SPA fallback.

## 🐛 Troubleshooting

### Subtitles Not Showing
1. Click the **CC button** in player controls after uploading
2. Check browser console for errors
3. Ensure subtitle file is valid VTT/SRT format
4. Try hard refresh (Ctrl+Shift+R)

### Video Not Loading
- Ensure video file is in a browser-supported format
- Check Go backend logs for file serving errors
- Verify frontend build exists in `frontend/build/`

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!
- Open an issue on [GitHub](https://github.com/sorexq/player/issues)
- Fork and submit a pull request

## ⭐️ Acknowledgments

- [Plyr.js](https://plyr.io/) - Amazing HTML5 video player
- [SvelteKit](https://kit.svelte.dev/) - Modern web framework
- [Gruvbox](https://github.com/morhetz/gruvbox) - Retro groove color scheme
- [Ark UI](https://ark-ui.com/) - Headless UI components

---

**Made with ❤️ and lots of ☕**
