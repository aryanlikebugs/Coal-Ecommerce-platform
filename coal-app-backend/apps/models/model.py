from pydantic import BaseModel, EmailStr, HttpUrl, Field
from typing import Literal
from typing import Optional, Any, List


class User(BaseModel):
    email: EmailStr
    password: str
    userType: Literal["admin", "customer"]


class LoginRequest(BaseModel):
    email: EmailStr
    password: str



class Product(BaseModel):
    name: str
    quantity: int
    price: float
    imageUrl: str  # Change from `Url` to `str`


class Address(BaseModel):
    line_1: str
    line_2: Optional[str] = None
    city: str
    state: str
    pincode: str

class Order(BaseModel):
    name: Any = Field(...)
    quantity: Any = Field(...)
    price: Any = Field(...)
    imageUrl: Any = Field(...)
    address: Any = Field(...)
    mobileNumber: Any = Field(...)
    email: Any = Field(...)
    status: Any = Field(...)

    


class CartOrders(BaseModel):
    cartOrders: List[Order]  # Accepts a list of Order objects