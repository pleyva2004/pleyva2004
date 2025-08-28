import uvicorn

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from graph import build_graph

from utils import _llm

app = FastAPI(title="Pablo Leyva Portfolio API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for GitHub Pages frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

llm_client = _llm()

# Pablo's information for the system prompt
PABLO_INFO = """
You are Pablo Leyva's AI assistant. Here's information about Pablo:

EXPERIENCE:
- Apple: AI Product & Strategy Intern - Led team of 3 interns to build MVP for Agentic Payment flow, prototyped agentic workflows with LLM-based product recommendations and Apple Pay checkout using TypeScript and Model Context Protocol
- Radical AI: AI Engineer - Integrated modern LLMs into web applications using Python, worked with OpenAI's GPT-4o and Google's Gemini, developed Rex web app that helped students improve Calculus grades to 93%
- Caterpillar: Software Engineer - Retrieved engineer data via Python scripts using Azure DevOps API and GitHub REST API, analyzed software development efficiency using Generative AI, optimized SDLC by visualizing data in PowerBI
- NJIT: Research Assistant - Data analysis and FinTech research

SKILLS: TypeScript, Python, React, AI/ML, data analysis, web development, APIs, product strategy

PROJECTS: Portfolio website (React, TypeScript, Tailwind CSS, Framer Motion), Rex learning app, Apple Pay MVP with agentic workflows, data analysis projects

EDUCATION: Computer Science at NJIT

CONTACT: Available through this portfolio website

Be helpful, professional, and knowledgeable about Pablo's background. You can help with questions about his experience, draft emails to Pablo, suggest meeting times, and provide his contact information.

Format: If it is a simple and quick answer, write the response as a Markdown bullet list, with each item on a new line. Ensure that the bullet points are indented.
If it is a long answer, write 2-3 sentences, and bullet points if more information is needed. Use minimal Markdown. Only for headers and bullet points and italics if needed.
"""

# Pydantic models
class ChatRequest(BaseModel):
    message: str    

class ChatResponse(BaseModel):
    message: str

graph = build_graph()

class AskRequest(BaseModel):
    question: str

class AskResponse(BaseModel):
    answer: str

@app.post("/ask", response_model=AskResponse)
def ask(req: AskRequest):

    print("/ask called")
    print("--------------------------------")
    print(req.question)
    print("--------------------------------")

    # state = {"question": req.question, "context": [], "answer": None}
    prompt = f"""
    You are Pablo Leyva's AI assistant. Here's information about Pablo:

    {PABLO_INFO}

    Question: {req.question}

    Answer:
    """

    out = llm_client(prompt)

    print(out)
    print("--------------------------------")

    return AskResponse(answer=out)

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)