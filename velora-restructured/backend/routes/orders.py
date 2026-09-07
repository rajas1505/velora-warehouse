# ============================================
# ORDERS API  (Create, Read, Update, Delete)
# Talks to the "orders" table.
# Route: /api/orders.php  (see src/services/ordersService.js)
# ============================================

from flask import Blueprint, request, jsonify
from db import get_db_connection

orders_bp = Blueprint("orders", __name__)


@orders_bp.route("/orders.php", methods=["GET", "POST", "PUT", "DELETE"])
def orders():
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:

            # ---------- READ ----------
            if request.method == "GET":
                order_id = request.args.get("id")
                if order_id:
                    cur.execute("SELECT * FROM orders WHERE id = %s", (order_id,))
                    row = cur.fetchone()
                    return jsonify(row)
                else:
                    cur.execute("SELECT * FROM orders ORDER BY id DESC")
                    return jsonify(cur.fetchall())

            # ---------- CREATE ----------
            elif request.method == "POST":
                data = request.get_json(silent=True) or {}
                customer = data.get("customer")
                order_date = data.get("order_date")

                if not customer or not order_date:
                    return jsonify({"error": "Customer and order date are required"}), 400

                # OrderModal.jsx generates its own order_code client-side
                # (e.g. ORD-8921) and sends it along. Honor it if present;
                # otherwise fall back to a simple server-generated one so
                # the API still works when called directly.
                order_code = data.get("order_code")
                if not order_code:
                    cur.execute("SELECT COUNT(*) AS count FROM orders")
                    count = cur.fetchone()["count"]
                    order_code = f"ORD-{8000 + count + 1}"

                status = data.get("status") or "Pending"

                cur.execute(
                    "INSERT INTO orders (order_code, customer, status, order_date) VALUES (%s, %s, %s, %s)",
                    (order_code, customer, status, order_date),
                )
                return jsonify({
                    "success": True,
                    "id": cur.lastrowid,
                    "order_code": order_code,
                })

            # ---------- UPDATE ----------
            elif request.method == "PUT":
                order_id = request.args.get("id")
                if not order_id:
                    return jsonify({"error": "Order id is required"}), 400

                data = request.get_json(silent=True) or {}

                cur.execute("SELECT order_code FROM orders WHERE id = %s", (order_id,))
                existing = cur.fetchone()
                if not existing:
                    return jsonify({"error": "Order not found"}), 404

                # Keep the existing order_code unless the client sends a new one.
                order_code = data.get("order_code") or existing["order_code"]

                cur.execute(
                    "UPDATE orders SET order_code = %s, customer = %s, status = %s, order_date = %s WHERE id = %s",
                    (order_code, data.get("customer"), data.get("status"), data.get("order_date"), order_id),
                )
                return jsonify({"success": True})

            # ---------- DELETE ----------
            elif request.method == "DELETE":
                order_id = request.args.get("id")
                if not order_id:
                    return jsonify({"error": "Order id is required"}), 400

                cur.execute("DELETE FROM orders WHERE id = %s", (order_id,))
                return jsonify({"success": True})
    finally:
        conn.close()
