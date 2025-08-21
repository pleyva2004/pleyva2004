from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for GitHub Pages frontend

# Set OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY')
print(openai.api_key)

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
"""

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy"})

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({"error": "No message provided"}), 400
        
        # Create chat completion using OpenAI
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": PABLO_INFO},
                {"role": "user", "content": user_message}
            ],
            max_tokens=500,
            temperature=0.7
        )
        
        ai_response = response.choices[0].message.content
        return jsonify({"message": ai_response})
        
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Sorry, I'm having trouble right now. Please try again."}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)