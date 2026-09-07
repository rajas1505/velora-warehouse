# ============================================
# INVENTORY API  (Create, Read, Update, Delete)
# Talks to the "products" table.
# Route: /api/inventory.php  (path kept to match the frontend's
# existing service calls -- see src/services/inventoryService.js)
# ============================================

from flask import Blueprint, request, jsonify
from db import get_db_connection

inventory_bp = Blueprint("inventory", __name__)


def compute_status(stock):
    if stock == 0:
        return "Out of Stock"
    elif stock < 20:
        return "Low Stock"
    return "In Stock"


@inventory_bp.route("/inventory.php", methods=["GET", "POST", "PUT", "DELETE"])
def inventory():
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:

            # ---------- READ (all products, or one by ?id=) ----------
            if request.method == "GET":
                product_id = request.args.get("id")
                if product_id:
                    cur.execute("SELECT * FROM products WHERE id = %s", (product_id,))
                    row = cur.fetchone()
                    return jsonify(row)
                else:
                    cur.execute("SELECT * FROM products ORDER BY id DESC")
                    products = cur.fetchall()
                    # Computed "status" for the frontend (in / low / out of stock)
                    for p in products:
                        p["status"] = compute_status(p["stock"])
                    return jsonify(products)

            # ---------- CREATE ----------
            elif request.method == "POST":
                data = request.get_json(silent=True) or {}
                name = data.get("name")
                category = data.get("category")

                if not name or not category:
                    return jsonify({"error": "Name and category are required"}), 400

                stock = data.get("stock") or 0
                cur.execute(
                    "INSERT INTO products (name, category, stock) VALUES (%s, %s, %s)",
                    (name, category, stock),
                )
                return jsonify({"success": True, "id": cur.lastrowid})

            # ---------- UPDATE ----------
            elif request.method == "PUT":
                product_id = request.args.get("id")
                if not product_id:
                    return jsonify({"error": "Product id is required"}), 400

                data = request.get_json(silent=True) or {}
                cur.execute(
                    "UPDATE products SET name = %s, category = %s, stock = %s WHERE id = %s",
                    (data.get("name"), data.get("category"), data.get("stock"), product_id),
                )
                return jsonify({"success": True})

            # ---------- DELETE ----------
            elif request.method == "DELETE":
                product_id = request.args.get("id")
                if not product_id:
                    return jsonify({"error": "Product id is required"}), 400

                cur.execute("DELETE FROM products WHERE id = %s", (product_id,))
                return jsonify({"success": True})
    finally:
        conn.close()
