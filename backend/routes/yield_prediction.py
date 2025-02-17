from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import joblib
import numpy as np
import pandas as pd
# from db.yield_model import YieldModel

# Define Blueprint
yield_bp = Blueprint('yield', __name__)

# Load Model and Scaler
try:
    model = joblib.load('models/yield_prediction/yield_prediction_model.pkl')
    scaler = joblib.load('models/yield_prediction/yield-scaler.pkl')
    print("Yield prediction model and scaler loaded successfully!")

except Exception as e:
    print(f"Error loading model/scaler: {e}")
    model, scaler = None, None

# Feature names used in model
feature_names = ["Tmax", "Tmin", "Wind", "SRAD", "RH", "Tmax_Tmin", "SRAD_RH",
                 "District_AMPARA", "District_ANURADHAPURA", "District_HAMBANTOTA", "District_POLONNARUWA"]


def predict_yield_rf(data):
    try:
        # Convert input to DataFrame
        X_input_df = pd.DataFrame([data], columns=feature_names)

        # Separate numerical and categorical columns
        numerical_columns = ['RH', 'SRAD', 'SRAD_RH', 'Tmax', 'Tmax_Tmin', 'Tmin', 'Wind']
        X_input_numerical = X_input_df[numerical_columns]
        X_input_categorical = X_input_df.iloc[:, 7:]

        # Scale numerical features
        X_input_numerical_scaled = scaler.transform(X_input_numerical)

        # Combine scaled numerical and categorical features
        X_input_scaled_df = pd.DataFrame(np.hstack((X_input_numerical_scaled, X_input_categorical)),
                                         columns=feature_names)

        # Get predictions from all trees in the forest
        tree_predictions = np.array([tree.predict(X_input_scaled_df) for tree in model.estimators_])

        # Mean prediction
        mean_prediction = tree_predictions.mean()

        # Standard deviation (as an uncertainty estimate)
        std_prediction = tree_predictions.std()

        # Confidence Interval (95% CI using 1.96 * std)
        lower_bound = mean_prediction - (1.96 * std_prediction)
        upper_bound = mean_prediction + (1.96 * std_prediction)

        # Calculate uncertainty percentage
        uncertainty_percentage = (std_prediction / mean_prediction) * 100 if mean_prediction != 0 else 0

        # Calculate confidence percentage
        confidence_percentage = 100 - uncertainty_percentage

        return {
            "predicted_yield": round(mean_prediction, 2),
            "confidence_interval": [round(lower_bound, 2), round(upper_bound, 2)],
            "uncertainty": round(std_prediction, 2),
            "confidence_percentage": round(confidence_percentage, 2)
        }

    except Exception as e:
        print(f"Prediction error: {e}")
        return None


@yield_bp.route('/predict', methods=['POST'])
# @jwt_required()

def predict_yield():
    data = request.get_json()

    required_fields = feature_names
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing field: {field}'}), 400

    if not model or not scaler:
        return jsonify({'error': 'Model not loaded correctly.'}), 500

    input_data = [data[field] for field in feature_names]

    prediction_result = predict_yield_rf(input_data)

    if prediction_result is None:
        return jsonify({'error': 'Prediction failed.'}), 500

    return jsonify(prediction_result), 200


