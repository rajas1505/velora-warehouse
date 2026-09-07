# ============================================
# CONTACT API  (Create, Read, Delete)
# Talks to the "contact_messages" table.
# Route: /api/contact.php  (see src/services/contactService.js)
# ============================================

from flask import Blueprint, request, jsonify
from db import get_db_connection

contact_bp = Blueprint("contact", __name__)


@contact_bp.route("/contact.php", methods=["GET", "POST", "DELETE"])
def contact():
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:

            # ---------- READ (list all messages, newest first) ----------
            if request.method == "GET":
                cur.execute("SELECT * FROM contact_messages ORDER BY id DESC")
                return jsonify(cur.fetchall())

            # ---------- CREATE (submit the contact form) ----------
            elif request.method == "POST":
                data = request.get_json(silent=True) or {}
                full_name = data.get("full_name")
                email = data.get("email")
                message = data.get("message")

                if not full_name or not email or not message:
                    return jsonify({"error": "Name, email and message are required"}), 400

                subject = data.get("subject") or "(No subject)"

                cur.execute(
                    "INSERT INTO contact_messages (full_name, email, subject, message) VALUES (%s, %s, %s, %s)",
                    (full_name, email, subject, message),
                )
                return jsonify({"success": True, "id": cur.lastrowid})

            # ---------- DELETE (admin removes a message) ----------
            elif request.method == "DELETE":
                message_id = request.args.get("id")
                if not message_id:
                    return jsonify({"error": "Message id is required"}), 400

                cur.execute("DELETE FROM contact_messages WHERE id = %s", (message_id,))
                return jsonify({"success": True})
    finally:
        conn.close()
