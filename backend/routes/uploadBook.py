import os
from flask import Blueprint, request, jsonify
from models import db, Book

upload_bp = Blueprint('upload', __name__)

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@upload_bp.route('/upload-book', methods=['POST'])
def upload_book():
    try:
        book_name = request.form.get('bookName')
        price = request.form.get('price')
        author_name = request.form.get('authorName')
        publisher_company = request.form.get('publisherCompany')
        release_date = request.form.get('releaseDate')
        description = request.form.get('description')

        photo = request.files.get('photo')
        photo_url = request.form.get('photoUrl')
        photo_path = None

        if photo:
            photo_filename = f"{book_name.replace(' ', '_')}_{photo.filename}"
            photo_path = os.path.join(UPLOAD_FOLDER, photo_filename)
            photo.save(photo_path)
            print(f"Photo saved to: {photo_path}")
        elif photo_url:
            photo_path = photo_url
            print(f"Using photo URL: {photo_url}")

        new_book = Book(
            book_name=book_name,
            price=price,
            author_name=author_name,
            publisher_company=publisher_company,
            release_date=release_date,
            description=description,
            photo_path=photo_path
        )

        db.session.add(new_book)
        db.session.commit()

        return jsonify({"success": True, "message": "Book uploaded successfully"})
    
    except Exception as e:
        db.session.rollback()
        print(f"Error during book upload: {e}")
        return jsonify({"success": False, "message": str(e)})
    
@upload_bp.route('/api/books', methods=['GET'])
def get_books():
    try:
        books = Book.query.all()
        book_list = [
            {
                'id': book.id,
                'book_name': book.book_name,
                'price': str(book.price) if book.price is not None else None,
                'author_name': book.author_name,
                'publisher_company': book.publisher_company,
                'release_date': book.release_date.isoformat() if book.release_date else None,
                'description': book.description,
                'photo_path': book.photo_path
            } for book in books
        ]
        return jsonify(book_list), 200
    except Exception as e:
        print(f"Error retrieving books: {e}")
        return jsonify({"success": False, "message": "An error occurred while retrieving books"}), 500
    
    
@upload_bp.route('/api/books/search', methods=['GET'])
def search_books():
    try:
        query = request.args.get('query', '')
        if not query:
            return jsonify({"success": False, "message": "No search query provided"}), 400
        
        books = Book.query.filter(
            Book.book_name.ilike(f'%{query}%') |
            Book.author_name.ilike(f'%{query}%')
        ).all()
        
        book_list = [
            {
                'id': book.id,
                'book_name': book.book_name,
                'price': str(book.price) if book.price is not None else None,
                'author_name': book.author_name,
                'publisher_company': book.publisher_company,
                'release_date': book.release_date.isoformat() if book.release_date else None,
                'description': book.description,
                'photo_path': book.photo_path
            } for book in books
        ]
        return jsonify(book_list), 200
    except Exception as e:
        print(f"Error searching books: {e}")
        return jsonify({"success": False, "message": "An error occurred while searching books"}), 500












