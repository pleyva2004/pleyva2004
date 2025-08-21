# Pablo Leyva's Portfolio with AI Agent

Personal portfolio website with AI agent showcasing my experience, skills, and projects. Built with React, TypeScript, Tailwind CSS (frontend) and Python Flask (backend).

## Project Structure

```
├── frontend/          # React portfolio website
├── backend/           # Python Flask AI agent
├── package.json       # Root deployment scripts
└── README.md
```

## Setup

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

### Backend Development
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY
python main.py
```

### Environment Variables

**Backend (.env):**
- `OPENAI_API_KEY`: Your OpenAI API key

**Frontend (.env):**
- `VITE_API_URL`: Backend API URL (default: http://localhost:5000)

## Deployment

### Frontend (GitHub Pages)
```bash
npm run deploy
```

### Backend
Deploy to Railway, Render, or similar platform with Python support.
