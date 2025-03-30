from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
from dotenv import load_dotenv

from app.api.v1.api import api_router
from app.core.config import settings
from app.db.base import init_db

load_dotenv()

app = FastAPI(
    title=os.getenv("PROJECT_NAME", "Bueiro Digital"),
    openapi_url=f"{os.getenv('API_V1_STR', '/api/v1')}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configurar CORS
origins = os.getenv("BACKEND_CORS_ORIGINS", "").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rotas da API
app.include_router(api_router, prefix=os.getenv("API_V1_STR", "/api/v1"))

# Middleware para tratamento de erros
@app.middleware("http")
async def errors_handling(request, call_next):
    try:
        return await call_next(request)
    except Exception as exc:
        return JSONResponse(
            status_code=500,
            content={"detail": "Internal Server Error"}
        )

# Eventos de inicialização
@app.on_event("startup")
async def startup_event():
    init_db()

# Rota de healthcheck
@app.get("/health")
def health_check():
    return {"status": "ok"} 