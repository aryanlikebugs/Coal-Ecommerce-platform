from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI = "mongodb://localhost:27017"
DATABASE_NAME = "mydatabase"

client = AsyncIOMotorClient(MONGO_URI)
db = client[DATABASE_NAME]

async def create_mongo_collection(collection_name: str):
    """Creates a collection in MongoDB."""
    if collection_name not in await db.list_collection_names():
        await db.create_collection(collection_name)
        return f"Collection '{collection_name}' created successfully."
    return f"Collection '{collection_name}' already exists."

# Ensure the collection exists
async def create_products_collection():
    collections = await db.list_collection_names()
    if "products" not in collections:
        await db.create_collection("products")