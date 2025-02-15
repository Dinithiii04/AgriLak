import os
from flask import Blueprint, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
import io

# Initialize Blueprint
rice_disease_bp = Blueprint('rice_disease', __name__)

# Load Model with absolute path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, '..', 'models', 'pest_disease', 'rice_disease_model.h5')

try:
    model = tf.keras.models.load_model(MODEL_PATH)
except Exception as e:
    raise RuntimeError(f"Failed to load model: {e}")

# Define classes based on your dataset
class_labels = ['bacterial_leaf_blight', 'healthy', 'leaf_blast', 'leaf_scald']


def classify_image(img, model, class_labels, threshold=0.75):
    # Resize and normalize the image
    img = img.resize((150, 150))
    img_array = np.array(img) / 255.0  # Normalize
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

    # Get predictions
    predictions = model.predict(img_array)
    confidence = np.max(predictions)
    predicted_class = class_labels[np.argmax(predictions)]

    # Threshold check
    if confidence < threshold:
        return f"Cannot recognize or not a trained disease. Confidence: {confidence * 100:.2f}%"

    return f"Predicted class: {predicted_class} ({confidence * 100:.2f}%)"


@rice_disease_bp.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        # Read image file as bytes
        image_bytes = file.read()
        image = Image.open(io.BytesIO(image_bytes))

        # Call classify_image function for prediction
        result = classify_image(image, model, class_labels)

        # Return result in the required format
        return jsonify({
            'result': result
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500
