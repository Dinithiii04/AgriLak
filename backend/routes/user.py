from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import mongo
from bson import ObjectId

from db.fertilizer_model import FertilizerModel
from db.irrgation_db import Irrigation
from db.disease_db import DiseaseModel

user_bp = Blueprint('user', __name__)

# Get the current user's profile with prediction histories
@user_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()

    try:
        user = mongo.db.users.find_one({'_id': ObjectId(user_id)})
    except:
        return jsonify({'error': 'Invalid user ID format.'}), 400

    if not user:
        return jsonify({'error': 'User not found.'}), 404

    # Get prediction histories from all 3 models
    predictions = FertilizerModel.get_user_predictions(user_id)
    irrigationHistory = Irrigation.get_user_irrigation_predictions(user_id)
    diseaseHistory = DiseaseModel.get_user_disease_predictions(user_id)

    # Include diseaseHistory in the response
    user_data = {
        'username': user.get('username'),
        'email': user.get('email'),
        'created_at': user.get('created_at'),
        'predictions': predictions,
        'irrigationHistory': irrigationHistory,
        'diseaseHistory': diseaseHistory
    }

    return jsonify({'profile': user_data}), 200
