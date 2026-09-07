# ============================================
# VELORA BACKEND (Python / Flask / MySQL)
# App entry point: creates the Flask app, wires up CORS,
# and registers the four route blueprints (one per resource,
# mirroring the old PHP api/ folder one-for-one).
# ============================================

import os

from flask import Flask, jsonify
import pymysql

from routes.inventory import inventory_bp
from routes.orders import orders_bp
from routes.contact import contact_bp
from routes.dashboard import dashboard_bp

try:
    from flask_cors import CORS
    HAS_FLASK_CORS = True
except ImportError:
    HAS_FLASK_CORS = False


def create_app():
    app = Flask(__name__)

    # ---------- CORS ----------
    # The React frontend (Vite, usually :3000) and this API (usually :8000)
    # run on different origins, so the browser sends real cross-origin
    # requests including a pre-flight OPTIONS before PUT/DELETE/JSON POST.
    if HAS_FLASK_CORS:
        CORS(
            app,
            resources={r"/api/*": {"origins": "*"}},
            methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            allow_headers=["Content-Type"],
        )
    else:
        # Fallback if flask-cors isn't installed: add the headers by hand.
        @app.after_request
        def add_cors_headers(response):
            response.headers["Access-Control-Allow-Origin"] = "*"
            response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
            response.headers["Access-Control-Allow-Headers"] = "Content-Type"
            return response

    # ---------- Route registration ----------
    # Mounted under /api so the endpoints are /api/inventory.php,
    # /api/orders.php, /api/contact.php, /api/dashboard.php --
    # exactly what src/services/*.js in the React frontend calls,
    # via VITE_API_BASE_URL=http://localhost:8000/api.
    app.register_blueprint(inventory_bp, url_prefix="/api")
    app.register_blueprint(orders_bp, url_prefix="/api")
    app.register_blueprint(contact_bp, url_prefix="/api")
    app.register_blueprint(dashboard_bp, url_prefix="/api")

    # ---------- Error handlers ----------
    @app.errorhandler(pymysql.MySQLError)
    def handle_db_error(e):
        return jsonify({"error": f"Database connection failed: {str(e)}"}), 500

    @app.errorhandler(404)
    def handle_404(e):
        return jsonify({"error": "Not found"}), 404

    @app.errorhandler(405)
    def handle_405(e):
        return jsonify({"error": "Method not allowed"}), 405

    return app


app = create_app()

if __name__ == "__main__":
    # Railway (and most PaaS hosts) inject the port to bind to via the
    # PORT env var at runtime -- it's NOT fixed to 8000 in production.
    # Locally it still falls back to 8000 to match the setup docs.
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port, debug=False)
