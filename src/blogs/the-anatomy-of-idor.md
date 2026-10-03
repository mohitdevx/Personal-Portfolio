---
title: "Understanding IDOR: When Authentication Forgets Authorization"
subtitle: "Authentication confirms who a user is. Authorization determines what they are allowed to access."
date: "Oct 2026"
readTime: "4 min read"
tags: ["AppSec", "Backend", "Authorization"]
summary: "A practical look at IDOR using a team notes and messaging app, why authentication alone isn't enough, and how one missing condition in a database query exposes private records."
---

### A Common Scenario in a Team App

Consider a shared workspace application where **Mohit**, **Money**, **Arsh**, and **Dev** collaborate on projects and keep private notes.

When **Arsh** opens one of his private project notes, the frontend makes a request:

```http
GET /api/notes/429
Authorization: Bearer <arsh_jwt_token>
```

The server returns Arsh's note. Everything works as intended.

Now imagine **Money** logs into his own account. He opens one of his notes (`/api/notes/501`), but out of curiosity changes the request URL to:

```http
GET /api/notes/429
Authorization: Bearer <money_jwt_token>
```

If the server returns Arsh's private note to Money, the application has an **Insecure Direct Object Reference (IDOR)**.

The issue isn't that the ID is visible in the URL. The issue is that the backend checked whether Money was logged in, but never verified whether Money actually owned note `429`.

---

### Authentication vs. Authorization

In many backend implementations, route handlers verify the user's session token and immediately fetch the requested record:

```typescript
// ❌ Problem: The route checks authentication, but skips ownership verification
app.get('/api/notes/:id', authenticateUser, async (req, res) => {
  const note = await db.note.findUnique({
    where: {
      id: req.params.id
    }
  });

  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }

  res.json(note);
});
```

Here, the middleware verifies that the incoming request has a valid token. However, the database query simply asks:

> *"Find the note with ID 429."*

It does not ask:

> *"Find the note with ID 429 **that belongs to the logged-in user**."*

Because of that missing constraint, any authenticated user (like Money or Dev) can view, edit, or delete notes belonging to Mohit or Arsh simply by iterating through IDs.

---

### Why UUIDs Don't Fix the Root Cause

A common suggestion is to replace sequential numbers (`429`) with random UUIDs:

`/api/notes/9f8b4d88-3751-419b-b0b2-299f018e6e87`

While UUIDs make guessing difficult, they do not provide authorization:

1. **IDs leak through normal usage**: in shared project links, browser history, network logs, and API payloads.
2. **Targeted actions**: If Dev shares a draft with Money inside the workspace, Money now has the ID. If Money sends a `DELETE /api/notes/:uuid`, a vulnerable server will delete it without checking permissions.

Hiding an ID makes it harder to discover, but the backend must still enforce who is permitted to access it.

---

### The Clean Solution: Scope Queries to the User

The most reliable way to prevent IDOR is to enforce user or organization boundaries directly in the database query:

```typescript
// ✅ Fixed: Ownership is validated directly in the query
app.get('/api/notes/:id', authenticateUser, async (req, res) => {
  const note = await db.note.findFirst({
    where: {
      id: req.params.id,
      userId: req.user.id // Enforce ownership at the query level
    }
  });

  if (!note) {
    // Return 404 so unauthorized users cannot enumerate existing IDs
    return res.status(404).json({ error: 'Note not found' });
  }

  res.json(note);
});
```

For collaborative resources (such as a project shared between Mohit and Arsh), check membership before returning data:

```typescript
const isMember = await db.projectMember.findFirst({
  where: {
    projectId: req.params.projectId,
    userId: req.user.id
  }
});

if (!isMember) {
  return res.status(404).json({ error: 'Project not found' });
}
```

---

### Summary

Whenever an endpoint handles user-scoped records by an identifier from `req.params` or `req.body`:

1. **Verify the user's relationship with the resource**, not just their login status.
2. **Include tenant or user constraints** in your database queries.
3. **Return a 404 response** when an unauthorized resource is requested, preventing attackers from confirming which IDs exist on the server.