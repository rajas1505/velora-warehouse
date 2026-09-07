# ============================================
# DATABASE CONFIG
# Reads from environment variables (.env), with the same
# XAMPP-friendly defaults the PHP version used: root user,
# empty password, localhost, port 3306.
# ============================================

import os
from dotenv import load_dotenv

load_dotenv()

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = int(os.getenv("DB_PORT", "3306"))
DB_NAME = os.getenv("DB_NAME", "velora_warehouse")
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
