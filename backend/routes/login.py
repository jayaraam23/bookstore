from flask import Blueprint, request, jsonify

admin_bp = Blueprint('admin', __name__)

credentials = {
    "username": "admin",
    "password": "admin@123"
}

@admin_bp.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if username == credentials["username"] and password == credentials["password"]:
        return jsonify({"success": True})
    else:
        return jsonify({"success": False})

