from flask import Flask, request, jsonify

app = Flask(__name__)



def create_app():
    app = Flask(__name__)

    # Import Blueprints
    from routes.irrigation import irrigation_bp

    # Register Blueprints
    app.register_blueprint(irrigation_bp, url_prefix='/irrigation')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)