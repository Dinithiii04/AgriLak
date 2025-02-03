from flask import Blueprint, request, jsonify
import joblib
import pandas as pd
import numpy as np
from pymongo.errors import ServerSelectionTimeoutError
from sklearn.preprocessing import StandardScaler
from database import mongo
from db.fertilizer_model import FertilizerModel

fertilizer_bp = Blueprint('fertilizer', __name__)

# Load the Random Forest model and scaler
rf_model = joblib.load('models/fertilizer/rf_model.joblib')
scaler = joblib.load('models/fertilizer/scaler.pkl')


# Fertilizer mapping
fertilizer_mapping = {0: '50:26:26 NPK', 1: 'Urea'}

# Prediction function
def predict_fertilizer_rf(N, P, K, pH, Rainfall, Temperature):
    user_input = np.array([[N, P, K, pH, Rainfall, Temperature]])
    scaled_input = scaler.transform(user_input)
    predicted_class = rf_model.predict(scaled_input)[0]
    recommended_fertilizer = fertilizer_mapping[predicted_class]
    return recommended_fertilizer

# @fertilizer_bp.route('/ping', methods=['GET'])
# def ping():
#     try:
#         mongo.db.command("ping")  # Test database connection
#         return jsonify({'status': 'MongoDB connected successfully'}), 200
#     except ServerSelectionTimeoutError:
#         return jsonify({'error': 'Cannot connect to MongoDB. Check your connection.'}), 500
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500


@fertilizer_bp.route('/predict', methods=['POST'])
def predict_fertilizer():
    try:
        data = request.get_json()

        # Extract features
        Nitrogen = data.get('Nitrogen')
        Phosphorus = data.get('Phosphorus')
        Potassium = data.get('Potassium')
        pH = data.get('pH')
        Rainfall = data.get('Rainfall')
        Temperature = data.get('Temperature')

        # Validate inputs
        if None in [Nitrogen, Phosphorus, Potassium, pH, Rainfall, Temperature]:
            return jsonify({'error': 'All fields are required.'}), 400

        # Perform prediction
        fertilizer = predict_fertilizer_rf(Nitrogen, Phosphorus, Potassium, pH, Rainfall, Temperature)

        # Return the response
        return jsonify({'recommended_fertilizer': fertilizer}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

