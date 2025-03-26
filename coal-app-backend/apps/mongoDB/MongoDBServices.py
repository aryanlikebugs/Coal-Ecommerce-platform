from database.database import db  # Import database instance
from models.model import User, LoginRequest  # Import Pydantic model
from fastapi import HTTPException

async def create_user(user_data: User):
    print(user_data, '++++++++++++++++++')
    """Insert a new user into MongoDB, ensuring email uniqueness."""
    existing_user = await db.users.find_one({"email": user_data.email})
    print(existing_user, '88888888888888888888888888')
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists.")
    user_dict = user_data.dict()
    new_user = await db.users.insert_one(user_dict)
    print(new_user, '+====================')
    return {"id": str(new_user.inserted_id)}


async def get_all_products():
    try:
        # Fetch all products and exclude the `_id` field
        products_cursor = db.products.find({}, {"_id": 0})
        products = await products_cursor.to_list(length=None)

        return products

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def login_user(login_data: LoginRequest):
    """Authenticate user by checking email and password in MongoDB."""
    user = await db.users.find_one({"email": login_data.email})

    if not user or user["password"] != login_data.password:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {"message": "Login successful", "email": login_data.email, "userType": user["userType"]}