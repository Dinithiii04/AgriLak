from flask import Flask
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from database import init_db
from dotenv import load_dotenv
import os
from flask_cors import CORS

from routes.disease_recognition import rice_disease_bp
from routes.fertilizer import fertilizer_bp
from routes.user import user_bp
from utils.auth import auth_bp

# Load environment variables
load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Set JWT Secret Key
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'your_secret_key')

    # Initialize DB and JWT
    init_db(app)
    jwt = JWTManager(app)
    bcrypt = Bcrypt(app)

    # Import and register Blueprints


    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(fertilizer_bp, url_prefix='/fertilizer')
    app.register_blueprint(user_bp, url_prefix='/user')
    app.register_blueprint(rice_disease_bp, url_prefix='/disease')


    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
