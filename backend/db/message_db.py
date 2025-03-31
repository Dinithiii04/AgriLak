from database import mongo


class Message:
    @staticmethod
    def save_message(name,email,message):
        saved_message={
            "name":name,
            "email":email,
            "message":message
        }
        return mongo.db.messages.insert_one(saved_message)
