from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import joblib
import numpy as np
from db.fertilizer_model import FertilizerModel

fertilizer_bp = Blueprint('fertilizer', __name__)

# Load Model and Scaler
try:
    rf_model = joblib.load('models/fertilizer/fertilizer_model.joblib')
    scaler = joblib.load('models/fertilizer/Scaler.pkl')
except Exception as e:
    print(f"Error loading model/scaler: {e}")
    rf_model, scaler = None, None

fertilizer_mapping = {0: '50:26:26 NPK', 1: 'Urea'}

# Function to determine adaptive threshold dynamically
def determine_threshold():
    past_confidences = FertilizerModel.get_past_confidences()

    if not past_confidences:
        return 70  # Default if no past data

    avg_confidence = np.mean(past_confidences)
    std_dev = np.std(past_confidences)

    # Ensure threshold is reasonable, avoiding too low values
    dynamic_threshold = max(60, avg_confidence - std_dev)

    return round(dynamic_threshold, 2)

def predict_fertilizer_rf(N, P, K, pH, Rainfall, Temperature):
    try:
        user_input = np.array([[N, P, K, pH, Rainfall, Temperature]])
        scaled_input = scaler.transform(user_input)

        probabilities = rf_model.predict_proba(scaled_input)[0]
        predicted_class = np.argmax(probabilities)
        confidence = round(probabilities[predicted_class] * 100, 2)

        # Get a truly dynamic threshold
        best_threshold = determine_threshold()

        if confidence < best_threshold:
            return "No recommendation due to low confidence.", confidence, best_threshold

        return fertilizer_mapping[predicted_class], confidence, best_threshold
    except Exception as e:
        print(f"Prediction error: {e}")
        return None, None, None

@fertilizer_bp.route('/predict', methods=['POST'])
@jwt_required()
def predict_fertilizer():
    user_id = get_jwt_identity()
    data = request.get_json()

    required_fields = ["Nitrogen", "Phosphorus", "Potassium", "pH", "Rainfall", "Temperature"]
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({'error': f'Missing fields: {", ".join(missing_fields)}'}), 400

    if not rf_model or not scaler:
        return jsonify({'error': 'Model not loaded correctly.'}), 500

    fertilizer, confidence, best_threshold = predict_fertilizer_rf(
        data["Nitrogen"],
        data["Phosphorus"],
        data["Potassium"],
        data["pH"],
        data["Rainfall"],
        data["Temperature"]
    )

    if fertilizer is None:
        return jsonify({'error': 'Prediction failed.'}), 500

    prediction_data = {
        "user_id": user_id,
        **data,
        "recommended_fertilizer": fertilizer,
        "confidence": confidence,
        "best_threshold_used": best_threshold
    }

    FertilizerModel.save_prediction(prediction_data, user_id)

    return jsonify({
        'recommended_fertilizer': fertilizer,
        'confidence': f"{confidence}%",
        'best_threshold_used': best_threshold
    }), 200
