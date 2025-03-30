from database import mongo
from datetime import datetime

class DiseaseModel:
    @staticmethod
    def save_prediction(data, user_id):
        # Ensure created_at is added if missing
        prediction_data = {
            "user_id": user_id,  # Link the prediction to the user
            "disease": data.get("disease"),
            "confidence": data.get("confidence"),
            "created_at": data.get("created_at") if data.get("created_at") else datetime.utcnow().isoformat()
        }
        return mongo.db.disease_predictions.insert_one(prediction_data)

    @staticmethod
    def get_user_disease_predictions(user_id):
        # Retrieve all predictions made by a specific user
        return list(mongo.db.disease_predictions.find(
            {"user_id": user_id},  # Filter by user ID
            {'_id': 0}  # Exclude MongoDB's internal _id field
        ))
