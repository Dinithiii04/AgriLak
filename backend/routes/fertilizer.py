from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import joblib
import numpy as np
from db.fertilizer_model import FertilizerModel

# Create a Blueprint for routes
fertilizer_bp = Blueprint('fertilizer', __name__)

# Load Model and Scaler
try:
    rf_model = joblib.load('models/fertilizer/fertilizer_rf_model.joblib')
    scaler = joblib.load('models/fertilizer/fertilizer_Scaler.pkl')
except Exception as e:
    print(f"Error loading model/scaler: {e}")
    rf_model, scaler = None, None

# Mapping from model output class to fertilizer name
fertilizer_mapping = {0: '50:26:26 NPK', 1: 'Urea'}

def predict_fertilizer_rf(N, P, K, pH, Rainfall, Temperature):
    try:
        # Convert inputs to NumPy array and scale it
        user_input = np.array([[N, P, K, pH, Rainfall, Temperature]])
        scaled_input = scaler.transform(user_input)

        # Get predicted class and probabilities
        probabilities = rf_model.predict_proba(scaled_input)[0]
        predicted_class = np.argmax(probabilities)
        confidence = round(probabilities[predicted_class] * 100, 2)

        # Confidence check - threshold
        if confidence < 72:
            return "No recommendation due to low confidence.", confidence

        return fertilizer_mapping[predicted_class], confidence

    except Exception as e:
        print(f"Prediction error: {e}")
        return None, None

@fertilizer_bp.route('/predict', methods=['POST'])
@jwt_required()
def predict_fertilizer():
    user_id = get_jwt_identity()
    data = request.get_json()

    # Check for any missing required fields
    required_fields = ["Nitrogen", "Phosphorus", "Potassium", "pH", "Rainfall", "Temperature"]
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({'error': f'Missing fields: {', '.join(missing_fields)}'}), 400

    if not rf_model or not scaler:
        return jsonify({'error': 'Model not loaded correctly.'}), 500

    # Perform prediction using input data
    fertilizer, confidence = predict_fertilizer_rf(
        data["Nitrogen"],
        data["Phosphorus"],
        data["Potassium"],
        data["pH"],
        data["Rainfall"],
        data["Temperature"]
    )

    if fertilizer is None:
        return jsonify({'error': 'Prediction failed.'}), 500

    # Prepare and save prediction data
    prediction_data = {
        "user_id": user_id,
        **data,
        "recommended_fertilizer": fertilizer,
        "confidence": confidence
    }

    FertilizerModel.save_prediction(prediction_data, user_id)

    # Send response with prediction result
    return jsonify({
        'recommended_fertilizer': fertilizer,
        'confidence': f"{confidence}%"
    }), 200


