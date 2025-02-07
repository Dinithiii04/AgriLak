from flask import Blueprint, request, jsonify, render_template
import os
import numpy as np
import tensorflow as tf
from PIL import Image

# Initialize Blueprint
rice_disease_bp = Blueprint('rice_disease', __name__)

# Load Model
MODEL_PATH = "models/pest_disease/rice_disease_model.h5"
if not os.path.exists(MODEL_PATH):
    model = None
    print("Model file not found. Ensure 'rice_disease_model.h5' is in the models folder.")
else:
    model = tf.keras.models.load_model(MODEL_PATH)
    print("Model loaded successfully!")

# Class labels
CLASS_LABELS = ['bacterial_leaf_blight', 'healthy', 'leaf_blast', 'leaf_scald']

@rice_disease_bp.route('/predict', methods=['POST'])
def predict():
    print("Received POST request at /rice_disease/predict")  # Debug log
    file = request.files.get('file')

    if file is None or file.filename == '':
        return jsonify({'error': 'No file provided'}), 400

    try:
        img = Image.open(file.stream).convert("RGB")
        img = img.resize((150, 150))
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        if model is None:
            return jsonify({'error': 'Model is not loaded. Please check the server logs.'}), 500

        predictions = model.predict(img_array)
        confidence = np.max(predictions)
        predicted_class = CLASS_LABELS[np.argmax(predictions)]

        return jsonify({
            'predicted_class': predicted_class,
            'confidence': f"{confidence * 100:.2f}%"
        })
    except Exception as e:
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500
