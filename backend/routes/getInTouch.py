from flask import Blueprint, jsonify, request
from db.message_db import Message  # Ensure this import is correct

message_bp = Blueprint('message', __name__)

@message_bp.route('/getInTouch', methods=['POST'])
def getInTouch():
    try:
        data = request.get_json()

        name = data.get("name")
        email = data.get("email")
        message = data.get("message")
        print(f"Received data: {data}") # Debugging line

        if not name or not email or not message:
            return jsonify({"error": "All fields are required"}), 400

        Message.save_message(name, email, message)

        return jsonify({"message": "Message received successfully"}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "An error occurred while processing your request"}), 500