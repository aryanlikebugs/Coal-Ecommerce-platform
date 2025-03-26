import uvicorn
from fastapi import FastAPI
#from apps.coal_routes import api_routes
from coal_routes import api_routes
from fastapi.middleware.cors import CORSMiddleware




apps = FastAPI()

apps.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

apps.include_router(api_routes.router)


@apps.get("/test")
def testapi():
    return {"data": "Hello World This is Coal India"}


if __name__ == "__main__":
    uvicorn.run("main:apps", host="localhost", port=5000)
