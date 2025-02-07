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


@irrigation_bp.route('/predict', methods=['POST'])
def pred():
    try:
        data = request.get_json()
        T2M = data['T2M']
        T2M_RANGE = data['T2M_RANGE']
        T2MDEW = data['T2MDEW']
        RH2M = data['RH2M']
        GWETTOP = data['GWETTOP']
        Rainfall = data['Rainfall']
        Month = data['Month']

        print('Received Input:', T2M, T2M_RANGE, T2MDEW, RH2M, GWETTOP, Rainfall, Month)

        pca_features = pd.DataFrame([[Rainfall, T2MDEW, Month]],
                                    columns=['1_month_rainfall_aggregate', 'T2MDEW', 'Month'])

        scaled_pca_features = scaler.transform(pca_features)
        pca_transformed = pca.transform(scaled_pca_features)

        other_features = np.array([[T2M, T2M_RANGE, RH2M, GWETTOP]])
        combined_features = np.hstack((other_features, pca_transformed))

        feature_columns = ['T2M', 'T2M_RANGE', 'RH2M', 'GWETTOP', 'PCACOMP1', 'PCACOMP2', 'PCACOMP3']
        input_df = pd.DataFrame(combined_features, columns=feature_columns)

        prediction = model.predict(input_df)[0]
        if prediction == 0:
            result = "Irrigate"
        elif prediction == 1:
            result = "Do Not Irrigate"
        else:
            result = "Error"
        return jsonify({'prediction': result}), 200

    except Exception as e:
        return jsonify({'error': f'Error during prediction: {str(e)}'}), 500
