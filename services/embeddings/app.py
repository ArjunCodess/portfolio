"""Text-only EmbeddingGemma 2 service; keep model weights outside Next.js."""
import hmac
import os
from contextlib import asynccontextmanager
from threading import Lock

from fastapi import FastAPI, Header, HTTPException
from pydantic import BaseModel, Field
from sentence_transformers import SentenceTransformer

MODEL = "google/embeddinggemma-2"
lock = Lock()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # float16 is unsupported by this model. CPU uses float32.
    app.state.model = SentenceTransformer(
        MODEL, config_kwargs={"vision_config": None, "audio_config": None}
    )
    yield


app = FastAPI(lifespan=lifespan)


class EmbeddingRequest(BaseModel):
    model: str
    input: list[str] = Field(min_length=1, max_length=8)


@app.get("/health")
def health():
    return {"model": MODEL, "dimensions": 768}


@app.post("/embed")
def embed(body: EmbeddingRequest, authorization: str = Header(default="")):
    token = os.environ.get("EMBEDDING_SERVICE_TOKEN")
    if not token or not hmac.compare_digest(authorization, f"Bearer {token}"):
        raise HTTPException(401, "Invalid service token")
    if body.model != MODEL or any(not text.strip() or len(text) > 8000 for text in body.input):
        raise HTTPException(400, "Invalid model or input")
    # Inputs already carry task-specific prefixes; suppress the default prompt.
    with lock:
        vectors = app.state.model.encode(body.input, prompt="", normalize_embeddings=True)
    return {"model": MODEL, "embeddings": vectors.tolist()}
