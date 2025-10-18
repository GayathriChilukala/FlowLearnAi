# FlowLearn AI - Visual Learning Platform

An interactive educational tool that generates animated flowcharts with voice-guided tours for any technical topic.

## 📁 Project Structure

```
flowlearn-ai/
├── index.html          # Main HTML file
├── css/
│   └── styles.css     # All CSS styles and animations
├── js/
│   ├── config.js      # API configuration
│   ├── state.js       # Global state management
│   ├── navigation.js  # Navigation functions
│   ├── flowchart.js   # Flowchart generation logic
│   ├── tour.js        # Tour control functions
│   └── utils.js       # Utility functions
└── README.md          # This file
```

## 🚀 Deployment to Netlify

### Method 1: Drag & Drop (Easiest)

1. Create a folder named `flowlearn-ai`
2. Copy all files maintaining the folder structure shown above
3. Go to [Netlify](https://app.netlify.com)
4. Drag and drop the `flowlearn-ai` folder onto Netlify
5. Done! Your site is live

### Method 2: GitHub + Netlify

1. Create a new GitHub repository
2. Push all files to the repository
3. Go to [Netlify](https://app.netlify.com)
4. Click "New site from Git"
5. Connect your GitHub repository
6. Deploy settings:
   - Build command: (leave empty)
   - Publish directory: `/`
7. Click "Deploy site"

### Method 3: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Navigate to your project folder
cd flowlearn-ai

# Deploy
netlify deploy --prod
```

## 🔧 Configuration

### API Key Setup

1. Open `js/config.js`
2. Replace the `GITHUB_TOKEN` with your own API key:
   ```javascript
   const GITHUB_TOKEN = "your-api-key-here";
   ```

### Customization

- **Colors**: Edit `css/styles.css` for theme colors
- **Complexity Levels**: Modify `js/config.js` > `complexityGuide`
- **Example Topics**: Edit topic buttons in `index.html`

## 📦 Dependencies (CDN-loaded)

- Tailwind CSS (v3)
- Mermaid.js (v10)

No build process required!

## 🌟 Features

- ✅ Three complexity levels (Simple, Detailed, Advanced)
- ✅ AI-powered flowchart generation
- ✅ Voice-guided tours with text-to-speech
- ✅ Animated pointer and highlighting
- ✅ Sub-steps for detailed explanations
- ✅ Responsive design
- ✅ No backend required

## 🎯 Usage

1. Enter a technical topic or process
2. Choose complexity level (Simple/Detailed/Advanced)
3. Wait for AI to generate the flowchart
4. Click "Start Tour" for guided explanation
5. Use controls to pause, skip, or restart

## 📝 Notes

- Works best with technical processes, algorithms, and scientific concepts
- Requires internet connection for AI generation and CDN resources
- Speech synthesis requires browser support (works in Chrome, Edge, Safari)

## 🐛 Troubleshooting

**Flowchart not rendering?**
- Check browser console for errors
- Ensure internet connection is stable
- Try a different topic or complexity level

**Voice not working?**
- Enable audio in browser
- Check if browser supports Web Speech API
- Adjust volume settings

## 📄 License

Free to use and modify for personal and educational purposes.

---

Built with ❤️ for visual learners everywhere!