from flask import Blueprint, request, jsonify
import joblib
import numpy as np
from pymongo.errors import ServerSelectionTimeoutError
from database import mongo
from db.fertilizer_model import FertilizerModel

fertilizer_bp = Blueprint('fertilizer', __name__)

# Load the Random Forest model and scaler
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
def predict_fertilizer():
    try:
        data = request.get_json()

        # Validate inputs
        required_fields = ["Nitrogen", "Phosphorus", "Potassium", "pH", "Rainfall", "Temperature"]
        for field in required_fields:
            if field not in data or not isinstance(data[field], (int, float)):
                return jsonify({'error': f'Invalid or missing value for {field}'}), 400

        # Extract inputs
        Nitrogen = data['Nitrogen']
        Phosphorus = data['Phosphorus']
        Potassium = data['Potassium']
        pH = data['pH']
        Rainfall = data['Rainfall']
        Temperature = data['Temperature']

        if not rf_model or not scaler:
            return jsonify({'error': 'Model not loaded correctly.'}), 500

        # Predict fertilizer
        fertilizer = predict_fertilizer_rf(Nitrogen, Phosphorus, Potassium, pH, Rainfall, Temperature)
        if not fertilizer:
            return jsonify({'error': 'Prediction failed'}), 500

        # Save prediction in MongoDB using FertilizerModel
        prediction_data = {
            "Nitrogen": Nitrogen,
            "Phosphorus": Phosphorus,
            "Potassium": Potassium,
            "pH": pH,
            "Rainfall": Rainfall,
            "Temperature": Temperature,
            "recommended_fertilizer": fertilizer
        }
        result_id = FertilizerModel.save_prediction(prediction_data)

        return jsonify({'recommended_fertilizer': fertilizer, 'id': str(result_id.inserted_id)}), 200

    except ServerSelectionTimeoutError:
        return jsonify({'error': 'Cannot connect to MongoDB. Check your connection.'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500
