from database import mongo

class FertilizerModel:
    @staticmethod
    def save_prediction(data, user_id):
        """
        Save fertilizer-related data to MongoDB, linked to the user.
        """
        prediction_data = {
            "user_id": user_id,  # Link the prediction to the user
            "Nitrogen": data.get("Nitrogen"),
            "Phosphorus": data.get("Phosphorus"),
            "Potassium": data.get("Potassium"),
            "pH": data.get("pH"),
            "Rainfall": data.get("Rainfall"),
            "Temperature": data.get("Temperature"),
            "recommended_fertilizer": data.get("recommended_fertilizer"),
            "created_at": data.get("created_at")  # Added timestamp for better tracking
        }
        return mongo.db.predictions.insert_one(prediction_data)

    @staticmethod
    def get_user_predictions(user_id):
        """
        Retrieve all predictions made by a specific user.
        """
        return list(mongo.db.predictions.find(
            {"user_id": user_id},  # Filter by user ID
            {'_id': 0}              # Exclude MongoDB's internal _id field
        ))
