import bcrypt
from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from database import mongo
import datetime

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'error': 'All fields are required.'}), 400

    if mongo.db.users.find_one({'email': email}):
        return jsonify({'error': 'Email already exists.'}), 400

    if mongo.db.users.find_one({'username': username}):
        return jsonify({'error': 'Username already exists.'}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    user = {
        'username': username,
        'email': email,
        'password': hashed_password.decode('utf-8'),
        'created_at': datetime.datetime.utcnow()
    }

    result = mongo.db.users.insert_one(user)
    access_token = create_access_token(identity=str(result.inserted_id), expires_delta=datetime.timedelta(days=1))

    return jsonify(
        {'message': 'User registered successfully!', 'user_id': str(result.inserted_id), 'token': access_token}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = mongo.db.users.find_one({'email': email})

    if not user or not bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        return jsonify({'error': 'Invalid credentials.'}), 401

    access_token = create_access_token(identity=str(user['_id']), expires_delta=datetime.timedelta(days=1))

    return jsonify({'access_token': access_token}), 200
