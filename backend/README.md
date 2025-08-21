# Pablo Leyva's AI Agent Backend

Simple Flask backend for the portfolio AI assistant.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY
```

3. Run locally:
```bash
python main.py
```

## Deployment

Deploy to Railway, Render, or any Python hosting platform.

Environment variables needed:
- `OPENAI_API_KEY`: Your OpenAI API key
- `PORT`: Port number (usually set automatically by hosting platform)