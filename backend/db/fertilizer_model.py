# Import the MongoDB instance
from database import mongo

class FertilizerModel:
    @staticmethod
    def save_prediction(data):
        #Save fertilizer-related data to MongoDB
        prediction_data = {
            "Nitrogen": data.get("Nitrogen"),
            "Phosphorus": data.get("Phosphorus"),
            "Potassium": data.get("Potassium"),
            "pH": data.get("pH"),
            "Rainfall": data.get("Rainfall"),
            "Temperature": data.get("Temperature")
        }
        return mongo.db.predictions.insert_one(prediction_data)


    @staticmethod
    def get_predictions():
        #Retrieve all stored fertilizer data from MongoDB
        return list(mongo.db.predictions.find({}, {'_id': 0}))