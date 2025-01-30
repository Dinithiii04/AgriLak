from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

def create_app():
    app = Flask(__name__)

    # Import Blueprints
    from routes.irrigation import irrigation_bp
    from routes.fertilizer import fertilizer_bp

    # Register Blueprints
    app.register_blueprint(irrigation_bp, url_prefix='/irrigation')
    app.register_blueprint(fertilizer_bp, url_prefix='/fertilizer')



    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)