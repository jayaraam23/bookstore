from flask import Blueprint
from routes.login import admin_bp
from routes.uploadBook import upload_bp
from routes.user import user_bp 

def register_blueprints(app):
    app.register_blueprint(admin_bp)
    app.register_blueprint(upload_bp)
    app.register_blueprint(user_bp, url_prefix='/user')
