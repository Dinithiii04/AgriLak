from flask import Blueprint, request, jsonify
import pickle
import numpy as np
import pandas as pd

irrigation_bp = Blueprint('irrigation', __name__)


try:
    with open('models/irrigation/pca.pkl', 'rb') as f:
        pca = pickle.load(f)
    print("PCA model loaded successfully!")
except Exception as e:
    print(f"Error loading PCA model: {e}")
    pca = None


try:
    with open('models/irrigation/irrigation_optimization_model.pkl', 'rb') as f:
        model = pickle.load(f)
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None


try:
    with open('models/irrigation/StandardScaler.pkl', 'rb') as f:
        scaler = pickle.load(f)
    print("Scaler loaded successfully!")
except Exception as e:
    print(f"Error loading scaler: {e}")
    scaler = None

month_mapping = {
    "January": 1, "February": 2, "March": 3, "April": 4,
    "May": 5, "June": 6, "July": 7, "August": 8,
    "September": 9, "October": 10, "November": 11, "December": 12
}



@irrigation_bp.route('/predict', methods=['POST'])
def pred():
    try:
        data = request.get_json()
        T2M = float(data.get('T2M', 0))
        T2M_RANGE = float(data.get('T2M_RANGE', 0))
        T2MDEW = float(data.get('T2MDEW', 0))
        RH2M = float(data.get('RH2M', 0))
        GWETTOP = float(data.get('soil_moisture', 0))
        Rainfall = float(data.get('Rainfall', 0))
        Month = data.get('Month', "January")

        if isinstance(Month, str):
            Month = month_mapping.get(Month, 1)

        print('Received Input:', T2M, T2M_RANGE, T2MDEW, RH2M, GWETTOP, Rainfall, Month)

        pca_features = pd.DataFrame([[Rainfall, T2MDEW, Month]],
                                    columns=['1_month_rainfall_aggregate', 'T2MDEW', 'Month'])

        scaled_pca_features = scaler.transform(pca_features)
        pca_transformed = pca.transform(scaled_pca_features)


        other_features = np.array([[T2M, T2M_RANGE, RH2M, GWETTOP]])
        combined_features = np.hstack((other_features, pca_transformed))

        feature_columns = ['T2M', 'T2M_RANGE', 'RH2M', 'GWETTOP', 'PCACOMP1', 'PCACOMP2', 'PCACOMP3']
        input_df = pd.DataFrame(combined_features, columns=feature_columns)


        prediction_probs = model.predict_proba(input_df)[0]
        confidence = np.max(prediction_probs)
        predicted_class = np.argmax(prediction_probs)

        threshold = 0.90
        if confidence >= threshold:
            if predicted_class == 0:
                result="Irrigate"
            else:
                result="Do Not Irrigate"
        else:
            result = "Uncertain Decision"

        return jsonify({
            'prediction': result,
            'confidence': round(confidence * 100, 2)
        }), 200

    except Exception as e:
        return jsonify({'error': f'Error during prediction: {str(e)}'}), 500
