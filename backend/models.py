from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

from sqlalchemy.dialects.postgresql import JSON

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True)
    phone = db.Column(db.String(20))
    cart_items = db.Column(db.JSON, default=[])
    address = db.Column(db.String(200), nullable=True)
    password_hash = db.Column(db.Text, nullable=False)  

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        print(self.password_hash, password)
        return check_password_hash(self.password_hash, password)
        

    def add_to_cart(self, book_id):
        self.cart_items.append(book_id)

    def remove_from_cart(self, book_id):
        if book_id in self.cart_items:
            self.cart_items.remove(book_id)

    def clear_cart(self):
        self.cart_items.clear()

class Book(db.Model):
    __tablename__ = 'books'

    id = db.Column(db.Integer, primary_key=True)
    book_name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Numeric(10, 2))
    author_name = db.Column(db.String(255), nullable=False)
    publisher_company = db.Column(db.String(255))
    release_date = db.Column(db.Date)
    description = db.Column(db.Text)
    photo_path = db.Column(db.String(255))
