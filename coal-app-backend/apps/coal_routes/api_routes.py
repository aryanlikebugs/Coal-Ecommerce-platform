from fastapi import Form, APIRouter, Response, HTTPException
from typing import List
from pydantic import EmailStr


from database.database import create_mongo_collection, db, create_products_collection
from models.model import CartOrders, User, LoginRequest, Product
from mongoDB.MongoDBServices import create_user, login_user, get_all_products
from bson import ObjectId


router = APIRouter(prefix="/coal-india")


@router.post("/create-collection/{collection_name}")
async def create_collection(collection_name: str):
    message = await create_mongo_collection(collection_name)
    return {"message": message}


@router.post("/sign-up")
async def add_user(user: User):
    print(user, '++++++++++++++++++')
    response = await create_user(user)
    return response


@router.post("/login")
async def login(login_data: LoginRequest):
    response = await login_user(login_data)
    return response


@router.post("/add-product")
async def add_products(products: List[Product]):
    try:
        # Ensure the 'products' collection exists before inserting data
        await create_products_collection()

        # Convert list of product objects to dictionaries
        product_dicts = [product.model_dump() for product in products]

        # Convert `imageUrl` field to string (if necessary)
        for product in product_dicts:
            product["imageUrl"] = str(product["imageUrl"])

        # Check for duplicate names
        existing_names = {p["name"] for p in await db.products.find({}, {"name": 1}).to_list(length=None)}
        duplicate_names = [p["name"] for p in product_dicts if p["name"] in existing_names]

        if duplicate_names:
            raise HTTPException(status_code=400, detail=f"Duplicate products found: {', '.join(duplicate_names)}")

        # Insert all products in bulk
        result = await db.products.insert_many(product_dicts)

        return {"inserted_ids": [str(id) for id in result.inserted_ids], "message": "Products added successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/delete-product/{product_id}")
async def delete_product(product_id: str):
    try:
        # Validate if the product_id is a valid ObjectId
        if not ObjectId.is_valid(product_id):
            raise HTTPException(status_code=400, detail="Invalid product ID format")
        # Delete the document from MongoDB
        result = await db.products.delete_one({"_id": ObjectId(product_id)})
        # Check if any document was deleted
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Product not found")
        return {"message": "Product deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@router.get("/get-all-products", response_model=list)
async def get_all_productsList():
    response = await get_all_products()
    return response

@router.post("/place-order")
async def place_order(cart_orders: CartOrders):
    try:
        # Convert list of orders to dictionaries
        orders_data = [order.model_dump() for order in cart_orders.cartOrders]

        # Insert multiple orders into MongoDB
        result = await db.order_table.insert_many(orders_data)

        return {
            "order_ids": [str(oid) for oid in result.inserted_ids], 
            "message": "Orders placed successfully"
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    
    
@router.get("/get-orders/{email}")
async def get_orders(email: EmailStr):
    try:

        print(email, 'MMMMMMMMMMMMMMM')
        # Fetch all orders related to the provided email
        orders = await db.order_table.find({"email": email}).to_list(length=None)
        print(orders, 'orders')
        if not orders:
            raise HTTPException(status_code=404, detail="No orders found for this email")
        
        # Convert ObjectId to string
        for order in orders:
            order["_id"] = str(order["_id"])
        
        return {"orders": orders}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    


@router.get("/get-allOrders")
async def get_allOrders():
    try:
        # Fetch all orders
        orders = await db.order_table.find().to_list(length=None)
        
        if not orders:
            raise HTTPException(status_code=404, detail="No orders found")
        
        # Convert ObjectId to string
        for order in orders:
            order["_id"] = str(order["_id"])
        
        total_orders = len(orders)
        
        return {"total_orders": total_orders, "orders": orders}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

