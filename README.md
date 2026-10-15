# ROASTED 💀

A dark-neon, meme-heavy AI comedy website prototype.

## Included

- "DUM HAI TOH KHOL KE DIKHA" front-page hook
- Photo upload
- Camera capture
- AI-style roast creation flow
- Meme wall
- Public-style leaderboard
- Kapish Kumar 15-second featured video
- Responsive mobile design
- GitHub Pages-ready static files

## Run locally

Just open `index.html` in a browser.

For camera access, browsers may block camera permissions on `file://`. Use a local server:

```bash
python -m http.server 8000
```

Then open:

http://localhost:8000

## GitHub Pages

1. Create a new GitHub repository.
2. Upload everything in this folder.
3. Go to **Settings → Pages**.
4. Select **Deploy from a branch**.
5. Select `main` and `/ (root)`.
6. Save.

The included MP4 is in `assets/roasted-original.mp4`.

## Important: real AI generation

The included site has a working front-end demo. The `LET AI COOK` button currently creates a local roast-card preview so the GitHub Pages version works without an API key.

For real AI image generation, connect `app.js` to your own secure backend endpoint:

```js
POST /api/generate
```

Do **not** put an AI API secret directly into `app.js` or any browser-side file.

## Suggested production backend

- Next.js API route / Node.js server
- Image generation provider
- Object storage for generated images
- Database for images, reactions and leaderboard scores
- Rate limiting and image moderation

## Branding

ROASTED
"Upload. Roast. Laugh. Repeat."
