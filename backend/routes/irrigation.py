from datetime import datetime

from flask import Blueprint, request, jsonify
import pickle
import joblib
import numpy as np
import pandas as pd
import requests
from flask_jwt_extended import jwt_required, get_jwt_identity
from db.irrgation_db import Irrigation

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
@jwt_required()
def pred():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        date = data.get('date')
        Rainfall = float(data.get('Rainfall', 0))

        date_obj = datetime.strptime(date, '%Y-%m-%d')
        Month = date_obj.month

        structured_date=date.replace("-","")
        print(structured_date)

        url = "https://power.larc.nasa.gov/api/temporal/daily/point"


        params = {
            "parameters": "T2M,RH2M,T2MDEW,T2M_RANGE,GWETTOP",
            "community": "AG",
            "longitude": 81.0001,
            "latitude": 7.9147,
            "start":structured_date,
            "end": structured_date,
            "format": "JSON",
        }

        response = requests.get(url, params=params)

        print("Response Status Code:", response.status_code)
        try:
            json_data = response.json()
            env_data = json_data["properties"]
            variable_data = env_data.values()
            val_dict = {}
            for variable in variable_data:
                for env in ['T2M', 'RH2M', 'T2M_RANGE', 'GWETTOP', 'T2MDEW']:
                    feature = variable[env]
                    value = feature[structured_date]
                    val_dict[env] = value

            T2M=val_dict['T2M']
            RH2M=val_dict['RH2M']
            T2M_RANGE=val_dict['T2M_RANGE']
            GWETTOP=val_dict['GWETTOP']
            T2MDEW=val_dict['T2MDEW']

        except requests.exceptions.JSONDecodeError:
            print("Error: Response is not valid JSON")

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

        threshold = 0.79
        if confidence >= threshold:
            if predicted_class == 0:
                result="Irrigate"
            else:
                result="Do Not Irrigate"
        else:
            result = "Uncertain Decision"

        prediction_result={
            "user_id": user_id,
            "date": date,
            "T2M": T2M,
            "T2M_RANGE": T2M_RANGE,
            "RH2M": RH2M,
            "GWETTOP": GWETTOP,
            "Rainfall": Rainfall,
            "T2MDEW": T2MDEW,
            "result": result,
            "confidence": round(confidence*100, 2)
        }
        Irrigation.saved_data(prediction_result,user_id)


        return jsonify({
            'prediction': result,
            'confidence': round(confidence * 100, 2)
        }), 200

    except Exception as e:
        return jsonify({'error': f'Error during prediction: {str(e)}'}), 500
