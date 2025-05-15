# SociLume API Documentation

This document outlines the available API endpoints for the SociLume website.

## Base URL

All API endpoints are available at: `https://api.socyu.com/api`

## Projects API

### Get All Projects

Retrieves a list of all projects.

**Endpoint:** `GET /projects`

**Example:**
```bash
curl -X GET https://api.socyu.com/api/projects
```

### Get Featured Projects

Retrieves featured projects with optional limit.

**Endpoint:** `GET /projects?featured=true&limit={number}`

**Parameters:**
- `featured` (boolean): Filter by featured projects
- `limit` (number): Limit the number of results

**Example:**
```bash
curl -X GET "https://api.socyu.com/api/projects?featured=true&limit=2"
```

## Testimonials API

### Get All Testimonials

Retrieves a list of all testimonials.

**Endpoint:** `GET /testimonials`

**Example:**
```bash
curl -X GET https://api.socyu.com/api/testimonials
```

### Get Featured Testimonials

Retrieves featured testimonials with optional limit.

**Endpoint:** `GET /testimonials?featured=true&limit={number}`

**Parameters:**
- `featured` (boolean): Filter by featured testimonials
- `limit` (number): Limit the number of results

**Example:**
```bash
curl -X GET "https://api.socyu.com/api/testimonials?featured=true&limit=1"
```

## Contact API

### Submit Contact Form

Submits a contact form message.

**Endpoint:** `POST /contact`

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "subject": "string", // Optional
  "message": "string"
}
```

**Example:**
```bash
curl -X POST https://api.socyu.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "API Test",
    "message": "This is a test message from curl."
  }'
```

## Newsletter API

### Subscribe to Newsletter

Subscribes an email address to the newsletter.

**Endpoint:** `POST /newsletter`

**Request Body:**
```json
{
  "email": "string"
}
```

**Example:**
```bash
curl -X POST https://api.socyu.com/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{
    "email": "subscriber@example.com"
  }'
```

## Error Handling

All API endpoints return appropriate HTTP status codes:

- `200 OK`: Request successful
- `400 Bad Request`: Invalid request parameters
- `500 Internal Server Error`: Server-side error

Error responses include an `error` field with a descriptive message.

## Rate Limiting

API requests are subject to rate limiting to prevent abuse. Please implement appropriate caching and limit your requests accordingly. 