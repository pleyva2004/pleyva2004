import os
from langchain_openai import ChatOpenAI
from langchain_community.llms import Ollama


def _llm():
    # Prefer OpenAI if key present, else try Ollama
    if os.getenv("OPENAI_API_KEY"):
        return ChatOpenAI(model=os.getenv("OPENAI_MODEL", "gpt-4o-mini"))
    # Fallback to local Ollama (pull a model like mistral or llama3)
    return Ollama(model=os.getenv("OLLAMA_MODEL", "mistral"))