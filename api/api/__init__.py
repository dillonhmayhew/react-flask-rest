from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_httpauth import HTTPBasicAuth

db = SQLAlchemy()
migrate = Migrate()
auth_ = HTTPBasicAuth()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)

    from api.errors import bp as errors_bp
    app.register_blueprint(errors_bp)

    from api.auth import bp as auth_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')

    from api.main import bp as main_bp
    app.register_blueprint(main_bp)

    return app

from api import models