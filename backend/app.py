from flask import Flask
from flask_cors import CORS
from config import Config
from models import db
from routes import register_blueprints

app = Flask(__name__)
CORS(app)

app.config.from_object(Config)

app.secret_key = 'nhjebcwhse4543545435tjkncvdcjkcverhjrfnh2434r6565rnhfrnfJNECDIKUWer354r'

db.init_app(app)

register_blueprints(app)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, host="0.0.0.0")





