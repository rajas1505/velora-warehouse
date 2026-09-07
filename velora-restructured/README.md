# VELORA – Warehouse Management System

Restructured into two independent apps:

```
velora-warehouse/
├── frontend/                    <- static HTML/CSS/JS, its own app
│   ├── index.html                (landing page — static)
│   ├── dashboard.html            (live stats)
│   ├── inventory.html            (Products CRUD)
│   ├── orders.html               (Orders CRUD)
│   ├── contact.html              (Contact form + message list)
│   ├── analytics.html            (static overview page)
│   ├── reports.html              (static overview page)
│   └── assets/
│       ├── style.css
│       └── config.js             <- sets API_BASE_URL, the one place
│                                     the frontend points at the backend
│
└── backend/                     <- PHP JSON API, its own app
    ├── api/
    │   ├── inventory.php
    │   ├── orders.php
    │   ├── contact.php
    │   └── dashboard.php
    ├── config/
    │   ├── db.php                (MySQL connection settings)
    │   └── cors.php              (CORS headers, shared by every endpoint)
    └── database/
        └── velora.sql            (run this first)
```

## What changed from the single-folder version

The original project worked because everything lived under one Apache
document root, so `fetch("api/inventory.php")` from `inventory.html`
just happened to resolve correctly. That's fine, but it isn't a real
frontend/backend *separation* — the two can't be hosted independently,
and there's no CORS handling, so moving them to different origins would
silently break every fetch call with a CORS error in the browser console.

Two changes make the split real:

1. **`frontend/assets/config.js`** — a single `API_BASE_URL` constant.
   Every page that talks to the API loads this script and builds its
   request URL from it (e.g. `` `${API_BASE_URL}/api/inventory.php` ``)
   instead of a bare relative path. Change this one line and the whole
   frontend points at a different backend (a different port locally, a
   staging server, production, etc).

2. **`backend/config/cors.php`** — included at the top of every
   endpoint. It sends `Access-Control-Allow-Origin` / `-Methods` /
   `-Headers` and answers the browser's pre-flight `OPTIONS` request
   (which fires automatically before `PUT`/`DELETE`/JSON `POST`
   requests once frontend and backend are on different origins).
   Without this, the CRUD buttons on Inventory/Orders/Contact would
   fail as soon as the frontend wasn't served from the same origin as
   the API.

Nothing else changed — same tables, same PHP logic, same PDO prepared
statements, same field names. `index.html`, `analytics.html`, and
`reports.html` don't call the API at all, so they don't load
`config.js`.

## Full endpoint map (nothing missing)

| Page             | Method | Endpoint              | Purpose                          |
|-------------------|--------|------------------------|-----------------------------------|
| dashboard.html    | GET    | `/api/dashboard.php`   | Live summary stats (read-only)    |
| inventory.html    | GET    | `/api/inventory.php`   | List all products (or `?id=`)     |
| inventory.html    | POST   | `/api/inventory.php`   | Create a product                  |
| inventory.html    | PUT    | `/api/inventory.php?id=` | Update a product                |
| inventory.html    | DELETE | `/api/inventory.php?id=` | Delete a product                |
| orders.html       | GET    | `/api/orders.php`      | List all orders (or `?id=`)       |
| orders.html       | POST   | `/api/orders.php`      | Create an order                   |
| orders.html       | PUT    | `/api/orders.php?id=`  | Update an order                   |
| orders.html       | DELETE | `/api/orders.php?id=`  | Delete an order                   |
| contact.html      | GET    | `/api/contact.php`     | List messages                     |
| contact.html      | POST   | `/api/contact.php`     | Submit the contact form           |
| contact.html      | DELETE | `/api/contact.php?id=` | Delete a message                  |

`index.html`, `analytics.html`, `reports.html` are static — no
endpoints, same as before.

## Running it as two separate services

**1. Database** — same as before: open `backend/database/velora.sql`
in MySQL Workbench (or phpMyAdmin) and run it. Check the 4 values in
`backend/config/db.php` match your MySQL setup (defaults are correct
for a fresh XAMPP/MySQL install: `root` / empty password).

**2. Backend** — serve the `backend/` folder with PHP on its own port:

```bash
cd backend
php -S localhost:8000
```

(Or point an XAMPP/Apache vhost at `backend/` — either way, the API
should now be reachable at `http://localhost:8000/api/...`.)

**3. Frontend** — serve the `frontend/` folder with *any* static
server, on a different port:

```bash
cd frontend
php -S localhost:5500
# or: npx serve .   or the VS Code "Live Server" extension, etc.
```

Open `http://localhost:5500/index.html` and click through to
Dashboard / Inventory / Orders / Contact — each now makes a real
cross-origin request to `http://localhost:8000`, and CORS is already
handled on the backend side.

If you'd rather deploy backend and frontend to different real hosts
later, just update `API_BASE_URL` in `frontend/assets/config.js` to
the backend's real URL, and swap the `*` in
`backend/config/cors.php` for that frontend's exact origin.

## Testing the CRUD

Same as before — Inventory "Add/Edit/Delete", Orders "Add/Edit
status/Delete", Contact form submit + delete, Dashboard numbers —
all read/write real rows in MySQL, now over a real HTTP boundary
between two independently-run apps.
