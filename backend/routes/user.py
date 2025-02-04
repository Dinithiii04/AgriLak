from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import mongo
from db.fertilizer_model import FertilizerModel
from bson import ObjectId  #  Import ObjectId for MongoDB

user_bp = Blueprint('user', __name__)

# Get the current user's profile
@user_bp.route('/profile', methods=['GET'])
@jwt_required()  # Protect the route with JWT
def get_profile():
    user_id = get_jwt_identity()  # Get the user ID from the token

    try:
        user = mongo.db.users.find_one({'_id': ObjectId(user_id)})  # Convert to ObjectId
    except:
        return jsonify({'error': 'Invalid user ID format.'}), 400

    if not user:
        return jsonify({'error': 'User not found.'}), 404

    user_data = {
        'username': user.get('username'),
        'email': user.get('email'),
        'created_at': user.get('created_at')
    }
    return jsonify({'profile': user_data}), 200

# Get all predictions made by the current user
@user_bp.route('/predictions', methods=['GET'])
@jwt_required()
def get_user_predictions():
    user_id = get_jwt_identity()

    try:
        predictions = FertilizerModel.get_user_predictions(ObjectId(user_id))  # Ensure ObjectId is used
    except:
        return jsonify({'error': 'Invalid user ID format.'}), 400

    return jsonify({'predictions': predictions}), 200
