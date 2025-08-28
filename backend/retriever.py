from pathlib import Path
from typing import Optional

from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.docstore.document import Document
from langchain.embeddings import SentenceTransformerEmbeddings

DATA_DIR = Path(__file__).resolve().parents[1] / "data"
INDEX_DIR = Path(__file__).resolve().parents[1] / "index"
INDEX_DIR.mkdir(exist_ok=True)
INDEX_PATH = INDEX_DIR / "faiss.index"
META_PATH = INDEX_DIR / "faiss.pkl"

EMBED_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

def load_documents() -> list[Document]:
    docs = []
    for p in DATA_DIR.glob("**/*"):
        if p.is_file() and p.suffix.lower() in {".md", ".txt"}:
            text = TextLoader(str(p), autodetect_encoding=True).load()
            docs.extend(text)
    return docs

def build_or_load_vectorstore() -> FAISS:
    embedding = SentenceTransformerEmbeddings(model_name=EMBED_MODEL)
    if INDEX_PATH.exists() and META_PATH.exists():
        return FAISS.load_local(str(INDEX_DIR), embeddings=embedding, allow_dangerous_deserialization=True)

    docs = load_documents()
    splitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=150)
    chunks = splitter.split_documents(docs)
    vs = FAISS.from_documents(chunks, embedding)
    vs.save_local(str(INDEX_DIR))
    return vs

def get_retriever(k: int = 4):
    vs = build_or_load_vectorstore()
    return vs.as_retriever(search_kwargs={"k": k})
