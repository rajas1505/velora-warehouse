# ============================================
# DASHBOARD API  (Read-only summary statistics)
# Pulls live numbers from products + orders tables.
# Route: /api/dashboard.php  (see src/services/dashboardService.js)
#
# Response shape matches what src/pages/Dashboard.jsx destructures:
# totalProducts, ordersToday, totalStockUnits, totalOrders,
# storageUsage, ordersProcessed, dispatchRate, lowStockItems,
# recentActivity[]
# ============================================

import time
from datetime import datetime, date, timedelta

from flask import Blueprint, jsonify
from db import get_db_connection

dashboard_bp = Blueprint("dashboard", __name__)


def relative_time(timestamp):
    """timestamp: a datetime (as returned by PyMySQL for DATETIME/TIMESTAMP columns)."""
    if timestamp is None:
        return "unknown"
    diff = (datetime.now() - timestamp).total_seconds()
    if diff < 60:
        return "just now"
    if diff < 3600:
        mins = int(diff // 60)
        return f"{mins} min{'s' if mins > 1 else ''} ago"
    if diff < 86400:
        hrs = int(diff // 3600)
        return f"{hrs} hour{'s' if hrs > 1 else ''} ago"
    days = int(diff // 86400)
    return f"{days} day{'s' if days > 1 else ''} ago"


@dashboard_bp.route("/dashboard.php", methods=["GET"])
def dashboard():
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:

            # ---------- Core counts ----------
            cur.execute("SELECT COUNT(*) AS c FROM products")
            total_products = cur.fetchone()["c"]

            cur.execute("SELECT COALESCE(SUM(stock), 0) AS c FROM products")
            total_stock_units = int(cur.fetchone()["c"])

            cur.execute("SELECT COUNT(*) AS c FROM products WHERE stock > 0 AND stock < 20")
            low_stock_items = cur.fetchone()["c"]

            cur.execute("SELECT COUNT(*) AS c FROM products WHERE stock = 0")
            out_of_stock = cur.fetchone()["c"]

            cur.execute("SELECT COUNT(*) AS c FROM orders")
            total_orders = cur.fetchone()["c"]

            cur.execute("SELECT COUNT(*) AS c FROM orders WHERE status = 'Completed'")
            completed_orders = cur.fetchone()["c"]

            cur.execute("SELECT COUNT(*) AS c FROM orders WHERE status = 'Cancelled'")
            cancelled_orders = cur.fetchone()["c"]

            cur.execute("SELECT COUNT(*) AS c FROM orders WHERE order_date = CURDATE()")
            orders_today = cur.fetchone()["c"]

            # ---------- Percentages for the progress bars ----------
            dispatch_rate = round((completed_orders / total_orders) * 100) if total_orders > 0 else 0
            storage_usage = round(((total_products - out_of_stock) / total_products) * 100) if total_products > 0 else 0
            orders_processed = round(((completed_orders + cancelled_orders) / total_orders) * 100) if total_orders > 0 else 0

            # ---------- Recent activity feed ----------
            # Built live from the most recent orders and any low-stock
            # products, merged and sorted by time.
            activity = []

            cur.execute(
                "SELECT id, order_code, customer, status, created_at FROM orders "
                "ORDER BY created_at DESC, id DESC LIMIT 4"
            )
            status_map = {"Completed": "success", "Pending": "info", "Cancelled": "warning"}
            for o in cur.fetchall():
                activity.append({
                    "id": f"order-{o['id']}",
                    "type": "order",
                    "text": f"Order #{o['order_code']} for {o['customer']} is {o['status']}",
                    "time": relative_time(o["created_at"]),
                    "status": status_map.get(o["status"], "info"),
                    "_sort": o["created_at"] or datetime.min,
                })

            cur.execute(
                "SELECT id, name, category, stock, created_at FROM products "
                "WHERE stock > 0 AND stock < 20 ORDER BY stock ASC LIMIT 3"
            )
            for p in cur.fetchall():
                activity.append({
                    "id": f"stock-{p['id']}",
                    "type": "stock",
                    "text": f"Restock required: {p['name']} ({p['stock']} units left)",
                    "time": relative_time(p["created_at"]),
                    "status": "warning",
                    "_sort": p["created_at"] or datetime.min,
                })

            activity.sort(key=lambda a: a["_sort"], reverse=True)
            activity = activity[:5]
            for a in activity:
                del a["_sort"]

            return jsonify({
                "totalProducts": total_products,
                "ordersToday": orders_today,
                "totalStockUnits": total_stock_units,
                "totalOrders": total_orders,
                "storageUsage": storage_usage,
                "ordersProcessed": orders_processed,
                "dispatchRate": dispatch_rate,
                "lowStockItems": low_stock_items,
                "recentActivity": activity,
            })
    finally:
        conn.close()
