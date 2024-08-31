from flask import Blueprint, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User
from flask_cors import CORS

user_bp = Blueprint('user', __name__)
CORS(user_bp) 

@user_bp.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        print(email)
        
        if not username or not password:
            return jsonify({'error': 'Username and password are required'}), 400

        if User.query.filter_by(username=username).first():
            return jsonify({'error': 'Username already exists'}), 409
        
        hashed_password = generate_password_hash(password)
        
        new_user = User(username=username, password_hash=hashed_password, email=email) 

        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User registered successfully'}), 201
    
    except Exception as e:
        db.session.rollback()
        print(f"Error during signup: {e}")
        return jsonify({'error': 'Signup failed'}), 500
    
    
@user_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return jsonify({'error': 'Username and password are required'}), 400
        
        user = User.query.filter_by(username=username).first()

        if user is None:
            return jsonify({'error': 'Invalid username or password'}), 401

        if not check_password_hash(user.password_hash, password):
            return jsonify({'error': 'Invalid username or password'}), 401

        # Set session or return some token if needed
        session['user_id'] = user.id
        return jsonify({'message': 'Login successful'}), 200

    except Exception as e:
        print(f"Error during login: {e}")
        return jsonify({'error': 'Login failed'}), 500
    

@user_bp.route('/logout', methods=['POST'])
def logout():
    try:
        session.pop('user_id', None)
        return jsonify({'message': 'Logout successful'}), 200
    except Exception as e:
        print(f"Error during logout: {e}")
        return jsonify({'error': 'Logout failed'}), 500
