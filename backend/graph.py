from typing import TypedDict, List, Optional
from langgraph.graph import START, END, StateGraph
from langchain.schema import Document

from retriever import get_retriever
from utils import _llm

class RAGState(TypedDict):
    question: str
    context: List[Document]
    answer: Optional[str]

def retrieve_node(state: RAGState) -> RAGState:
    retriever = get_retriever(k=4)
    docs = retriever.get_relevant_documents(state["question"])
    return {"question": state["question"], "context": docs, "answer": state.get("answer")}

def generate_node(state: RAGState) -> RAGState:
    llm = _llm()
    context_str = "\n\n".join([f"[{i+1}] {d.page_content}" for i, d in enumerate(state["context"] or [])])
    prompt = (
        "You are a helpful website assistant. Answer the user using ONLY the context. "
        "If the answer is not in context, say you don't know.\n\n"
        f"Question: {state['question']}\n\n"
        f"Context:\n{context_str}\n\n"
        "Answer:"
    )
    result = llm.invoke(prompt)
    return {"question": state["question"], "context": state["context"], "answer": str(result)}

def build_graph():

    graph = StateGraph(RAGState)

    graph.add_node("retrieve", retrieve_node)
    graph.add_node("generate", generate_node)
    graph.add_edge(START, "retrieve")
    graph.add_edge("retrieve", "generate")
    graph.add_edge("generate", END)

    return graph.compile()
