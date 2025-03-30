from database import mongo
from datetime import datetime, timezone

class YieldPrediction:
    @staticmethod
    def save_prediction(data, user_id):
        # Format date to just YYYY-MM-DD
        date_str = data.get("date")
        try:
            prediction_time = datetime.strptime(date_str, "%Y-%m-%d").strftime("%Y-%m-%d") if date_str else datetime.now(timezone.utc).date().isoformat()
        except ValueError:
            prediction_time = datetime.now(timezone.utc).date().isoformat()

        saving_data = {
            "user_id": user_id,
            "input_features": {
                "Aug_Tmax": data.get("Aug_Tmax"),
                "Aug_RH": data.get("Aug_RH"),
                "Sep_RH": data.get("Sep_RH"),
                "Oct_SRAD": data.get("Oct_SRAD"),
                "Nov_SRAD": data.get("Nov_SRAD"),
                "Dec_SRAD": data.get("Dec_SRAD"),
                "Dec_RH": data.get("Dec_RH"),
                "Dec_Rain": data.get("Dec_Rain")
            },
            "prediction_result": data.get("predicted_class"),
            "confidence": data.get("confidence"),
            "prediction_time": prediction_time  # saved as "YYYY-MM-DD"
        }

        return mongo.db.yield_predictions.insert_one(saving_data)

    @staticmethod
    def get_user_yield_predictions(user_id):
        return list(mongo.db.yield_predictions.find(
            {"user_id": user_id},
            {"_id": 0}
        ))
