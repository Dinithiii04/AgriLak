from flask import Flask, jsonify
from flask_pymongo import PyMongo
from pymongo.errors import ServerSelectionTimeoutError


# Initialize Flask App
def create_app():
    app = Flask(__name__)

    # Setup MongoDB Connection with a specific database
    app.config[
        'MONGO_URI'] = 'mongodb+srv://smartpaddy:MsgRuU4dHZ7pJQ5d@cluster0.wbakw.mongodb.net/smartpaddy?retryWrites=true&w=majority&appName=Cluster0'

    # Initialize PyMongo
    mongo = PyMongo(app)

    if mongo.db is None:
        raise Exception("MongoDB connection failed. Check your URI or database setup.")

    # Test MongoDB Connection Endpoint
    @app.route('/ping', methods=['GET'])
    def ping():
        try:
            mongo.db.command("ping")  # Test database connection
            return jsonify({'status': 'MongoDB connected successfully'}), 200
        except ServerSelectionTimeoutError:
            return jsonify({'error': 'Cannot connect to MongoDB. Check your connection.'}), 500
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    # Import and register Blueprints
    from routes.irrigation import irrigation_bp
    from routes.fertilizer import fertilizer_bp

    app.register_blueprint(irrigation_bp, url_prefix='/irrigation')
    app.register_blueprint(fertilizer_bp, url_prefix='/fertilizer')

    return app

# Run the application
if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)