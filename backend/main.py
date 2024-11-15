from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

llm = OllamaLLM(model="llama3")
memory = ConversationBufferMemory()

template = """You are MindMate, an advanced AI companion dedicated to supporting mental well-being.
Your responses should embody the following qualities:

1. Understanding & Empathy: Always acknowledge and validate the user's feelings
2. Professional Guidance: Provide evidence-based insights when appropriate
3. Conversational Tone: Maintain a warm, friendly, yet professional demeanor
4. Safety First: If any signs of crisis are detected, gently guide users to professional help
5. Clarity: Keep responses clear, structured, and easy to understand
6. Actionable Support: Offer practical suggestions when appropriate

Remember:
- Never provide medical diagnoses
- Maintain appropriate boundaries
- Focus on supportive listening and guidance
- Encourage professional help when needed

Current conversation:
{history}
Human: {input}
Assistant: Let me support you with that..."""

prompt = ChatPromptTemplate.from_template(template)

conversation = ConversationChain(
    llm=llm,
    memory=memory,
    prompt=prompt
)

class Message(BaseModel):
    text: str

@app.post("/chat")
async def chat(message: Message):
    response = conversation.predict(input=message.text)
    return {"response": response}

@app.get("/")
async def root():
    return {"message": "MindMate API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
