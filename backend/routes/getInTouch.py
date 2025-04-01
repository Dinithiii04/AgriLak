import smtplib
from email.mime.text import MIMEText
import os
from flask import Blueprint, request, jsonify
from db.message_db import Message

message_bp = Blueprint('message', __name__)

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_SENDER = "agrilak0@gmail.com"
EMAIL_PASSWORD = "veqm zzsd mlma qfqx"

def send_confirmation_email(recipient_email, name):
    subject = "Message Received - Thank You!"
    body = f"Dear {name},\n\nThank you for contacting us. We have received your message and will get back to you shortly.\n\nBest regards,\nYour Team"

    # Create the email message
    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = EMAIL_SENDER
    msg['To'] = recipient_email

    try:

        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL_SENDER, EMAIL_PASSWORD)
            server.send_message(msg)

        print(f"Confirmation email sent to {recipient_email}")
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False


@message_bp.route('/getInTouch', methods=['POST'])
def submit_message():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    if not name or not email or not message:
        return jsonify({'error': 'Missing data'}), 400

    try:
        Message.save_message(name, email, message)

        if send_confirmation_email(email, name):
            return jsonify({'message': 'Message saved and confirmation email sent'}), 200
        else:
            return jsonify({'message': 'Message saved, but email sending failed'}), 200
    except Exception as e:
        return jsonify({'error': f'An unexpected error occured: {e}'}), 500