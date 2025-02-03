from flask import Flask
from database import init_db


# Initialize Flask App
def create_app():
    app = Flask(__name__)
    init_db(app)


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
