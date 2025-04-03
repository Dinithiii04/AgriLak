from database import mongo
from datetime import datetime

class DiseaseModel:
    @staticmethod
    def save_prediction(data, user_id):
        prediction_data = {
            "user_id": user_id,
            "disease": data.get("disease"),
            "confidence": data.get("confidence"),
            "created_at": data.get("created_at") if data.get("created_at") else datetime.utcnow().isoformat()
        }
        return mongo.db.disease_predictions.insert_one(prediction_data)

    @staticmethod
    def get_user_disease_predictions(user_id):

        return list(mongo.db.disease_predictions.find(
            {"user_id": user_id},
            {'_id': 0} 
        ))
