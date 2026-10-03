---
title: 'The "What If I Just Change This Number?" Bug: The Anatomy of IDOR'
subtitle: "Why authentication alone will not protect your database, and how a missing WHERE clause leaks millions of records."
date: "Oct 2026"
readTime: "4 min read"
tags: ["AppSec", "Backend", "Authorization"]
summary: "IDOR is the simplest vulnerability on the internet, yet it causes massive real-world data leaks. Here is how developers accidentally create it, why UUIDs are a false safety net, and how to write bulletproof tenant-scoped queries."
---

### The Million-Dollar URL Parameter

Imagine checking your monthly internet invoice. The URL in your browser looks like this:
`https://app.telecom.com/invoices/1042`

Curious, you click the address bar, change `1042` to `1041`, and press Enter.

If the site responds with *"Access Denied"*, congratulations: the engineering team did their job. But on thousands of real-world production web apps, you'll suddenly see John Doe's home address, phone number, and credit card statement.

Welcome to **IDOR** (Insecure Direct Object Reference).

If you ask any bug bounty hunter what single bug class pays their bills, 9 times out of 10 they will say IDOR or broken object-level authorization (BOLA). It is rarely found with automated scanners—it is a pure business logic flaw.

---

### The Core Trap: Authentication vs. Authorization

When engineers build an API endpoint at 2 AM, the brain naturally checks:
> *"Is this user logged in?"*

If yes, the request is allowed through. But the code forgets the second, indispensable question:
> *"Does this authenticated user actually **own** or have permission to access **this specific record**?"*

Here is what an innocent IDOR looks like in real Express / Prisma code:

```typescript
// ❌ The Classic IDOR Trap: Authentication without Authorization
app.get('/api/invoices/:id', authenticateJWT, async (req, res) => {
  const invoice = await db.invoice.findUnique({
    where: { id: req.params.id }
  });

  if (!invoice) return res.status(404).send('Invoice not found');
  res.json(invoice);
});
```

Notice the danger: The user is fully authenticated with a valid JWT. But the database query simply looks up `req.params.id` in isolation. Any user can write a 5-line bash loop with `curl` and download every invoice in the company's history.

---

### The "UUIDs Will Save Us" Myth

A common counter-argument is: *"We don't use sequential integers like `1041`. We use random UUIDs like `550e8400-e29b-41d4-a716-446655440000`. Nobody can guess that!"*

While UUIDs prevent casual enumeration, **security through obscurity is never authorization**:
1. **UUIDs leak everywhere**: in referer headers, browser histories, share links, chat previews, and API responses.
2. **Team collaboration leaks**: In collaborative tools, user A might legitimately see user B's workspace UUID. If user A sends a `DELETE /api/workspaces/:uuid`, your backend will execute it without verifying ownership.

---

### The Clean Architecture Fix

Fixing IDOR requires a mindset shift: **never fetch a resource solely by its primary key when the action is user-scoped**. Always tie the lookup directly to the authenticated session context.

```typescript
// ✅ The Bulletproof Fix: Multi-tenant ownership constraint
app.get('/api/invoices/:id', authenticateJWT, async (req, res) => {
  const invoice = await db.invoice.findFirst({
    where: {
      id: req.params.id,
      userId: req.user.id // Enforce tenant boundary at the database level!
    }
  });

  if (!invoice) {
    // Return 404 rather than 403 to prevent object existence enumeration
    return res.status(404).send('Invoice not found');
  }

  res.json(invoice);
});
```

#### Key Takeaways:
- Treat `req.params` as untrusted user suggestions, not trusted IDs.
- For multi-tenant or role-based apps, write policy middleware (or Prisma / ORM client extensions) that automatically inject tenant ownership into every `SELECT`, `UPDATE`, and `DELETE`.
- Always return `404 Not Found` instead of `403 Forbidden` on unauthorized ID lookups to prevent attackers from discovering which IDs exist.
