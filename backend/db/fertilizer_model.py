from database import mongo
from datetime import datetime

class FertilizerModel:
    @staticmethod
    def save_prediction(data, user_id):
        # Ensure created_at is added if missing
        prediction_data = {
            "user_id": user_id,  # Link the prediction to the user
            "Nitrogen": data.get("Nitrogen"),
            "Phosphorus": data.get("Phosphorus"),
            "Potassium": data.get("Potassium"),
            "pH": data.get("pH"),
            "Rainfall": data.get("Rainfall"),
            "Temperature": data.get("Temperature"),
            "recommended_fertilizer": data.get("recommended_fertilizer"),
            "confidence": data.get("confidence"),
            "created_at": data.get("created_at") if data.get("created_at") else datetime.utcnow().isoformat()
        }
        return mongo.db.predictions.insert_one(prediction_data)

    @staticmethod
    def get_user_predictions(user_id):
        # Retrieve all predictions made by a specific user.
        return list(mongo.db.predictions.find(
            {"user_id": user_id},  # Filter by user ID
            {'_id': 0}  # Exclude MongoDB's internal _id field
        ))
