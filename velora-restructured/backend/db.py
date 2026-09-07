# ============================================
# DATABASE CONNECTION (PyMySQL)
# One connection per request, opened and closed by each route --
# same pattern the PHP/PDO version used. Rows come back as plain
# dicts (DictCursor) so they serialize straight to JSON with the
# exact same field names as before (name, category, stock, ...).
# ============================================

import pymysql
import pymysql.cursors

from config import DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD


def get_db_connection():
    """Open a fresh MySQL connection. Raises pymysql.MySQLError on
    failure, which app.py's error handler turns into a 500 JSON
    response -- mirroring the PHP config/db.php behavior."""
    return pymysql.connect(
        host=DB_HOST,
        port=DB_PORT,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME,
        charset="utf8mb4",
        cursorclass=pymysql.cursors.DictCursor,
        autocommit=True,
    )
