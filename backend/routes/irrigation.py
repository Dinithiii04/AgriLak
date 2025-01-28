from flask import Blueprint, jsonify, request

irrigation_bp = Blueprint('irrigation', __name__)

@irrigation_bp.route('/call', methods=['GET'])
def get_items():
    return jsonify('irrigationEnds')