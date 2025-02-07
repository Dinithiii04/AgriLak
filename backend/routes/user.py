from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import mongo
from db.fertilizer_model import FertilizerModel
from bson import ObjectId  # Import ObjectId for MongoDB

user_bp = Blueprint('user', __name__)

# Get the current user's profile with fertilizer prediction history
@user_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()  # Get the user ID from the token

    try:
        user = mongo.db.users.find_one({'_id': ObjectId(user_id)})  # Convert to ObjectId
    except:
        return jsonify({'error': 'Invalid user ID format.'}), 400

    if not user:
        return jsonify({'error': 'User not found.'}), 404

    # Retrieve user's past fertilizer predictions
    predictions = FertilizerModel.get_user_predictions(user_id)

    user_data = {
        'username': user.get('username'),
        'email': user.get('email'),
        'created_at': user.get('created_at'),
        'predictions': predictions  # Include user's prediction history
    }

    return jsonify({'profile': user_data}), 200
