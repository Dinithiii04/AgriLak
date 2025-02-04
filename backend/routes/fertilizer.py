from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import joblib
import numpy as np
from db.fertilizer_model import FertilizerModel

fertilizer_bp = Blueprint('fertilizer', __name__)

# Load Model and Scaler
try:
    rf_model = joblib.load('models/fertilizer/rf_model.joblib')
    scaler = joblib.load('models/fertilizer/scaler.pkl')
except Exception as e:
    print(f"Error loading model/scaler: {e}")
    rf_model, scaler = None, None

fertilizer_mapping = {0: '50:26:26 NPK', 1: 'Urea'}


def predict_fertilizer_rf(N, P, K, pH, Rainfall, Temperature):
    try:
        user_input = np.array([[N, P, K, pH, Rainfall, Temperature]])
        scaled_input = scaler.transform(user_input)
        predicted_class = rf_model.predict(scaled_input)[0]
        return fertilizer_mapping[predicted_class]
    except Exception as e:
        print(f"Prediction error: {e}")
        return None


@fertilizer_bp.route('/predict', methods=['POST'])
@jwt_required()
def predict_fertilizer():
    user_id = get_jwt_identity()
    data = request.get_json()

    required_fields = ["Nitrogen", "Phosphorus", "Potassium", "pH", "Rainfall", "Temperature"]
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing field: {field}'}), 400

    if not rf_model or not scaler:
        return jsonify({'error': 'Model not loaded correctly.'}), 500

    fertilizer = predict_fertilizer_rf(
        data["Nitrogen"], data["Phosphorus"], data["Potassium"],
        data["pH"], data["Rainfall"], data["Temperature"]
    )

    if not fertilizer:
        return jsonify({'error': 'Prediction failed.'}), 500

    prediction_data = {
        "user_id": user_id,
        **data,
        "recommended_fertilizer": fertilizer
    }

    FertilizerModel.save_prediction(prediction_data, user_id)

    return jsonify({'recommended_fertilizer': fertilizer}), 200
