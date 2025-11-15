# API Documentation

This documentation describes the main API endpoints and data models for the Helpdesk Payload CMS backend.

---

## Authentication

- **POST** `/api/users/login`
  - **Body:** `{ email, password }`
  - **Response:** `{ user, token }`
  - **Description:** Login and receive JWT token for authenticated requests.

- **POST** `/api/users/refresh-token`
  - **Body:** `{ refreshToken }`
  - **Response:** `{ user, token }`

---

## Collections

### Users
- **GET** `/api/users` — List users (admin only)
- **GET** `/api/users/:id` — Get user by ID
- **POST** `/api/users` — Create user
- **PATCH** `/api/users/:id` — Update user
- **DELETE** `/api/users/:id` — Delete user

**User Fields:**
- `name` (string, required)
- `email` (string, required, unique)
- `role` ("requester" | "agent" | "admin", required)
- `division` (relationship to Divisions, required if role=agent)

---

### Divisions
- **GET** `/api/divisions` — List divisions
- **POST** `/api/divisions` — Create division
- **Fields:**
  - `name` (string, required, unique)
  - `description` (string)

---

### Categories
- **GET** `/api/categories` — List categories
- **POST** `/api/categories` — Create category
- **Fields:**
  - `name` (string, required)
  - `division` (relationship to Divisions, required)

---

### Tickets
- **GET** `/api/tickets` — List tickets
- **POST** `/api/tickets` — Create ticket
- **PATCH** `/api/tickets/:id` — Update ticket
- **Fields:**
  - `title` (string, required)
  - `description` (richText, required)
  - `requester` (relationship to Users, required)
  - `division` (relationship to Divisions, required)
  - `category` (relationship to Categories, required)
  - `assignee` (relationship to Users, filtered by role=agent & division)
  - `status` ("open" | "in_progress" | "pending" | "resolved" | "closed")
  - `priority` ("low" | "medium" | "high" | "urgent")
  - `attachments` (relationship to Media, multiple)

---

### Comments
- **GET** `/api/comments` — List comments
- **POST** `/api/comments` — Create comment
- **Fields:**
  - `ticket` (relationship to Tickets, required)
  - `author` (relationship to Users, required)
  - `body` (richText, required)
  - `attachments` (relationship to Media, multiple)

---

### Media
- **POST** `/api/media` — Upload file
- **GET** `/api/media/:id` — Get file info
- **Fields:**
  - `alt` (string, required)
  - `filename`, `url`, etc. (auto-generated)

---

## Notes
- All endpoints (except login/register) require Bearer token authentication.
- Use standard Payload REST API conventions for filtering, sorting, and pagination.
- For more, see [Payload REST API docs](https://payloadcms.com/docs/rest-api/overview).
