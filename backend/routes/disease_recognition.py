import os
import io
import numpy as np
from flask import Blueprint, request, jsonify
import tensorflow as tf
from PIL import Image

# Initialize Blueprint
rice_disease_bp = Blueprint("rice_disease", __name__)

# Load Model with absolute path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "..", "models", "pest_disease", "rice_disease_model.keras")

try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print("✅ Model loaded successfully!")
except Exception as e:
    raise RuntimeError(f"❌ Failed to load model: {e}")

# Define classes based on dataset
class_labels = ["bacterial_leaf_blight", "healthy", "leaf_blast", "leaf_scald"]

def preprocess_image(image):
    """Preprocess image for model prediction"""
    try:
        image = image.convert("RGB")  # Ensure image is in RGB mode
        image = image.resize((96, 96))  # Resize to match model input
        img_array = np.array(image) / 255.0  # Normalize pixel values
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
        return img_array
    except Exception as e:
        raise ValueError(f"Image preprocessing failed: {e}")

@rice_disease_bp.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    try:
        # Read and preprocess image
        image_bytes = file.read()
        image = Image.open(io.BytesIO(image_bytes))
        img_array = preprocess_image(image)

        # Predict with model
        predictions = model.predict(img_array)
        confidence = np.max(predictions)
        predicted_class = class_labels[np.argmax(predictions)]

        # Set a threshold for confidence
        if confidence < 0.60:
            return jsonify({"error": "Model is unsure. Low confidence."}), 400

        # Return prediction result
        return jsonify({
            "disease": predicted_class,
            "confidence": f"{confidence:.4f}"
        }), 200

    except Exception as e:
        return jsonify({"error": f"Prediction error: {str(e)}"}), 500
