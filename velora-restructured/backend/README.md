# VELORA – Backend (Python / Flask / MySQL)

Same backend, same API contract, no PHP. This is a drop-in replacement for
the PHP version — the React frontend doesn't need to change at all, because
every route, method, and JSON field name matches exactly.

```
backend/
├── app.py              Flask app factory, CORS, blueprint registration
├── config.py            Reads DB credentials from environment variables
├── db.py                 PyMySQL connection helper (dict cursor)
├── routes/
│   ├── inventory.py      Products CRUD   → /api/inventory.php
│   ├── orders.py         Orders CRUD     → /api/orders.php
│   ├── contact.py        Contact CRUD    → /api/contact.php
│   └── dashboard.py      Live stats      → /api/dashboard.php
├── database/
│   └── velora.sql         Same schema as before — run this first
├── requirements.txt
└── .env.example
```

Routes are still named `inventory.php`, `orders.php`, etc. — not because
Flask needs it, but because `src/services/*.js` in the frontend already
hardcodes those exact paths. Keeping them means **zero frontend changes**.
If you'd rather rename them (`/api/inventory`, no `.php`), update the
`@blueprint.route(...)` line in each file in `routes/` and the matching
call in the frontend's service file.

## 1. Install dependencies

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## 2. Database

Open `database/velora.sql` in MySQL Workbench (or phpMyAdmin) and run the
whole script — same as before, creates `velora_warehouse`, its 3 tables,
and sample rows.

Copy `.env.example` to `.env` and adjust if your MySQL setup isn't the
XAMPP defaults (`root` / empty password / `localhost:3306`):

```bash
cp .env.example .env
```

## 3. Run the backend

```bash
python app.py
```

This starts Flask on `http://localhost:8000`, so the API is reachable at
`http://localhost:8000/api/...` — identical to the PHP version.

(For production you'd run it behind `gunicorn` instead of the Flask dev
server — `pip install gunicorn` then `gunicorn -w 4 -b 0.0.0.0:8000 app:app`
— but `python app.py` is fine for local development.)

## 4. Point the React frontend at it

Nothing changes here from the PHP setup — same `.env` value in the
frontend project:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

Restart `npm run dev` after editing `.env` (Vite only reads it at
startup). CORS is handled in `app.py` via `flask-cors`, so the frontend
on `:3000` and this API on `:8000` talk to each other with no extra setup.

## Endpoint contract (unchanged from the PHP version)

| Frontend call                                   | Method | Endpoint                  |
|--------------------------------------------------|--------|-----------------------------|
| `dashboardService.getDashboardData()`            | GET    | `/dashboard.php`            |
| `inventoryService.getProducts()`                 | GET    | `/inventory.php`            |
| `inventoryService.addProduct(product)`           | POST   | `/inventory.php`            |
| `inventoryService.updateProduct(id, product)`    | PUT    | `/inventory.php?id={id}`    |
| `inventoryService.deleteProduct(id)`             | DELETE | `/inventory.php?id={id}`    |
| `ordersService.getOrders()`                      | GET    | `/orders.php`               |
| `ordersService.addOrder(order)`                  | POST   | `/orders.php`               |
| `ordersService.updateOrder(id, order)`           | PUT    | `/orders.php?id={id}`       |
| `ordersService.deleteOrder(id)`                  | DELETE | `/orders.php?id={id}`       |
| `contactService.getMessages()`                   | GET    | `/contact.php`              |
| `contactService.sendMessage(data)`               | POST   | `/contact.php`              |
| `contactService.deleteMessage(id)`               | DELETE | `/contact.php?id={id}`      |

## What's the same as the PHP version, and what changed under the hood

**Same:** table names and columns, JSON field names (`name`/`category`/
`stock`, `customer`/`status`/`order_date`/`order_code`, `full_name`/
`email`/`subject`/`message`), the computed `status` field on GET
`/inventory.php`, the camelCase + live `recentActivity` shape on
`/dashboard.php`, and the "honor a client-sent `order_code`, otherwise
auto-generate one" logic on `POST /orders.php`.

**Different (implementation only, not the contract):**
- **PDO prepared statements → PyMySQL parameterized queries.** Same SQL
  injection protection, different library. Every query still uses `%s`
  placeholders with a separate params tuple — never string-formatted SQL.
- **PHP's `switch` on `$_SERVER['REQUEST_METHOD']` → Flask route methods.**
  Each blueprint route lists its allowed HTTP methods explicitly; Flask
  returns a 405 automatically for anything else (`contact.php` correctly
  has no `PUT`, matching the original — messages were never editable,
  only created/deleted).
- **`header("Access-Control-Allow-Origin", ...)` → `flask-cors`.** Same
  headers, same wildcard-origin behavior for local dev, same pre-flight
  `OPTIONS` handling — just via a library instead of manual PHP headers.
- **Connection-per-request.** Like the PHP version, each request opens
  and closes its own MySQL connection (`db.get_db_connection()`) rather
  than pooling — fine for a project this size; swap in a connection pool
  (e.g. `PyMySQL` + `DBUtils`, or move to SQLAlchemy) if you outgrow it.

## Testing the CRUD

Same as before — Inventory Add/Edit/Delete, Orders Add/Edit
status/Delete, Contact form submit + delete, Dashboard live numbers and
activity feed — all read/write real rows in MySQL.
