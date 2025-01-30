from flask import Blueprint, request, jsonify
import joblib
import pandas as pd

fertilizer_bp = Blueprint('fertilizer', __name__)

# Load the trained model
model_filename = 'backend/models/Fertilizer_Prediction.pkl'
loaded_model = joblib.load(model_filename)

@fertilizer_bp.route('/predict', methods=['POST'])
def predict_fertilizer():
    try:
        # Get the input data from the request
        data = request.get_json()

        # Extract features from the input data
        pH = data['pH']
        Rainfall = data['Rainfall']
        Temperature = data['Temperature']
        Nitrogen = data['Nitrogen']
        Phosphorus = data['Phosphorus']
        Potassium = data['Potassium']

        # Create a DataFrame for the input features
        user_input = pd.DataFrame({
            'pH': [pH],
            'Rainfall': [Rainfall],
            'Temperature': [Temperature],
            'Nitrogen': [Nitrogen],
            'Phosphorus': [Phosphorus],
            'Potassium': [Potassium],
        })

        # Add missing columns to align with the training data
        missing_cols = list(set(loaded_model.feature_names_in_) - set(user_input.columns))
        user_input = pd.concat([user_input, pd.DataFrame(columns=missing_cols)], axis=1).fillna(0)

        # Convert object dtype columns to numeric to avoid FutureWarning
        user_input = user_input.infer_objects(copy=False)

        # Reorder columns to match the training data
        user_input = user_input[loaded_model.feature_names_in_]

        # Predict the NPK ratio using the loaded model
        predicted_npk = loaded_model.predict(user_input.values)

        # Convert NumPy float32 to Python float before returning JSON
        return jsonify({
            'Nitrogen': float(predicted_npk[0][0]),
            'Phosphorus': float(predicted_npk[0][1]),
            'Potassium': float(predicted_npk[0][2])
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400
