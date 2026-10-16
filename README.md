# InterVue AI — Voice-First Multilingual AI Interview Web Application

Inspired by HCL Berri Bot, **InterVue AI** is a real-time, voice-first mock interview web application. Candidates speak directly into their microphone without typing, while **ARIA**—an animated digital human interviewer built with layered SVG and CSS—asks questions aloud, analyzes answers with conversational AI, and gives instantaneous performance ratings.

---

## 🌟 Key Features

1. **Mandatory Voice Interaction in Three Languages**
   - **Telugu (`te-IN`)**: Speech recognition in Telugu script with spoken Telugu output.
   - **English (`en-IN` & `en-US`)**: Indian English accent default with US English alternative.
   - **Hindi (`hi-IN`)**: Native Devanagari script speech recognition and spoken Hindi output.
   - Real microphone capture using Web Speech API (`webkitSpeechRecognition` fallback) with live interim transcription and editable candidate transcript before submission.

2. **Layered SVG Virtual Interviewer (ARIA)**
   - Custom digital human with expressive facial features, blinking eyes, synchronized mouth movement for speech, and headset.
   - Real-time animated visual states:
     - `IDLE`: Subtle breathing and periodic blinking.
     - `SPEAKING`: Animated mouth movement and sound waves.
     - `LISTENING`: Glowing cyan halo and reactive audio waveform.
     - `THINKING`: Orbiting particles while processing answers.
     - `COMPLETED`: Success glow.

3. **Role-Specific & Multilingual Question Banks**
   - Software Developer (OOP, REST APIs, Arrays vs Linked Lists, Project challenges).
   - Data Analyst (Data cleaning, SQL JOINs, Missing data, Correlation vs Causation).
   - AI/ML Engineer (Supervised vs Unsupervised, Overfitting, Precision vs Recall, Imbalance).
   - Web Developer & HR Executive.
   - Fully translated question banks in English, Telugu, and Hindi.

4. **Conversational AI & Semantic Evaluation**
   - Integrates with Google Gemini API (`gemini-1.5-flash`) via an Express backend.
   - Built-in multi-parameter semantic fallback engine with genuine, non-random evaluations in Telugu, Hindi, and English when offline or without API keys.
   - Evaluation breakdown: Overall Score / 100, Answer Relevance, Communication Clarity, and Technical Depth.
   - Question-by-question review with model answers and actionable improvement suggestions.

5. **Local Storage Session History**
   - Persists all completed interviews with date, role, language, score, and questions.
   - Privacy-friendly: zero raw audio retention.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher, tested on v24)
- npm (v9 or higher)
- Modern browser with Web Speech API support (Google Chrome or Microsoft Edge recommended)

### 2. Installation
```bash
# Clone or navigate to the project directory
cd d:/Chatbot

# Install dependencies (already installed)
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory (a template `.env.example` is provided):
```env
PORT=3001

# Optional: Google Gemini API Key for conversational AI
# If not provided, InterVue AI will automatically run in intelligent semantic evaluation mode
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Running the Application
To run both the backend server and Vite frontend concurrently:
```bash
npm run dev
```

Or run them individually:
```bash
# Terminal 1: Backend Express Server (Port 3001)
npm run server

# Terminal 2: Vite React Frontend (Port 5173)
npm run client
```

Open your browser at:
```
http://localhost:5173
```

---

## 📁 Project Architecture

```
├── server/
│   └── index.js                 # Express backend, Gemini API proxy, semantic fallback
├── src/
│   ├── components/
│   │   ├── Avatar/
│   │   │   └── ARIAAvatar.tsx   # Layered SVG digital human with states & blinking
│   │   ├── AudioControls/
│   │   │   ├── MicrophoneButton.tsx  # Voice recording button with pulse & timer
│   │   │   ├── WaveformVisualizer.tsx # Live audio frequency visualizer
│   │   │   └── MicTestModal.tsx       # Microphone level test & voice preview
│   │   ├── LanguageSelector.tsx # English / తెలుగు / हिंदी selector
│   │   ├── Navbar.tsx           # Branding, navigation, and language switch
│   │   └── Footer.tsx           # Academic attribution and links
│   ├── data/
│   │   ├── questions.ts         # Multilingual question banks for 5+ domains
│   │   └── translations.ts      # Native UI translations (en, te, hi)
│   ├── pages/
│   │   ├── HomePage.tsx         # Landing page with hero, features, workflow
│   │   ├── SetupPage.tsx        # Candidate configuration & audio testing
│   │   ├── InterviewPage.tsx    # Live two-panel voice interview room
│   │   ├── ResultsPage.tsx      # Comprehensive performance dashboard
│   │   └── HistoryPage.tsx      # Stored interview records & review
│   ├── services/
│   │   ├── speechRecognition.ts # Web Speech API service (te-IN, hi-IN, en-IN)
│   │   ├── speechSynthesis.ts   # Browser speech synthesis voice orchestrator
│   │   ├── audioVisualizer.ts   # Web Audio API AnalyserNode volume listener
│   │   ├── aiService.ts         # Backend & client semantic evaluation
│   │   └── storageService.ts    # LocalStorage history and preferences
│   ├── types/
│   │   └── index.ts             # Core TypeScript interfaces
│   ├── App.tsx                  # Main application router and state
│   ├── index.css                # Tailwind CSS and typography
│   └── main.tsx                 # React DOM mount
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## ⚙️ Technical Limitations & Browser Notes

- **Web Speech API**: Browser-based speech recognition requires Chrome or Edge on desktop/mobile for optimal Telugu (`te-IN`) and Hindi (`hi-IN`) phonetic accuracy.
- **Microphone Permissions**: The browser will request microphone permission on the first recording click. Ensure permission is granted.
- **Voice Availability**: Telugu and Hindi SpeechSynthesis voices depend on the operating system voice packs installed on your system. If an OS does not have a native Telugu voice installed, the browser automatically falls back to an Indian English or standard voice without stopping the interview.
- **No API Key Required for Demo**: If no `GEMINI_API_KEY` is specified, InterVue AI runs in transparent local evaluation mode with realistic scoring and contextual advice in Telugu, Hindi, or English.
