from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import joblib
import numpy as np
import pandas as pd

# Define Blueprint
yield_bp = Blueprint('yield', __name__)

# Load Model
try:
    model = joblib.load('models/yield_prediction/best-rf-yield.pkl')
    print("Yield prediction model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

# Feature names used in model
feature_names = ['Aug_Tmax', 'Aug_RH', 'Sep_RH', 'Oct_SRAD', 'Nov_SRAD', 'Dec_SRAD', 'Dec_RH', 'Dec_Rain']

# Prediction function with threshold check
def predict_yield_rf(data, threshold=0.55):
    try:
        # Convert input to DataFrame
        X_input_df = pd.DataFrame([data], columns=feature_names)

        # Predict class probabilities
        probabilities = model.predict_proba(X_input_df)[0]
        predicted_class = model.classes_[np.argmax(probabilities)]
        confidence = np.max(probabilities)

        if confidence < threshold:
            return {
                "predicted_class": "Uncertain",
                "confidence": round(confidence * 100, 2)
            }
        else:
            return {
                "predicted_class": predicted_class,
                "confidence": round(confidence * 100, 2)
            }

    except Exception as e:
        print(f"Prediction error: {e}")
        return None

# Route to handle predictions
@yield_bp.route('/predict', methods=['POST'])
# @jwt_required()
def predict_yield():
    data = request.get_json()

    # Check all required fields are present
    for field in feature_names:
        if field not in data:
            return jsonify({'error': f'Missing field: {field}'}), 400

    if not model:
        return jsonify({'error': 'Model not loaded correctly.'}), 500

    # Create ordered input array
    input_data = [data[field] for field in feature_names]

    # Predict
    prediction_result = predict_yield_rf(input_data)

    if prediction_result is None:
        return jsonify({'error': 'Prediction failed.'}), 500

    return jsonify(prediction_result), 200
