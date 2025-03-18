from database import mongo
from datetime import datetime

class Irrigation:
    @staticmethod
    def saved_data(data,user_id):
        saving_data={
            "user_id":user_id,
            "Input_date":data.get("date"),
            "Temperature":data.get("T2M"),
            "Temperature_Range":data.get("T2M_RANGE"),
            "Relative_humidity":data.get("RH2M"),
            "Soil_moisture":data.get("GWETTOP"),
            "Rainfall":data.get("Rainfall"),
            "Dew_point":data.get("T2MDEW"),
            "Recommended_Irrigation_plan":data.get("result"),
            "Confidence":data.get("confidence")

        }
        return mongo.db.predictions.insert_one(saving_data)

    @staticmethod
    def get_user_predictions(user_id):

        return list(mongo.db.predictions.find(
            {"user_id": user_id},
            {'_id': 0}
        ))