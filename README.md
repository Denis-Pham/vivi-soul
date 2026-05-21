# Vivi Soul Landing Page

A beginner-friendly static landing page for the **Vivi Soul** AI music channel.
Built with **only HTML, CSS, and JavaScript** — no frameworks, no build tools, no dependencies.

🔗 Live channel: [youtube.com/@ViviSoulmusic](https://www.youtube.com/@ViviSoulmusic)

---

## Features

- **Hero section** with eyebrow, animated gradient title, and dual CTAs
- **Logo wall** of related calm-music brands
- **3 numbered feature cards** explaining the channel's philosophy
- **"How to drift" 3-step guide**
- **Latest Release card** — large 2-column highlight of the newest track
- **Featured Tracks grid** — data-driven from a JavaScript array
- **YouTube thumbnail previews** with a red play badge overlay (no iframe — avoids embed errors)
- **FAQ accordion** with auto-close behavior
- **Mood switcher** widget in the hero (cycles through 5 moods)
- **Fully responsive** — tablet (≤900px) and mobile (≤600px) breakpoints
- **Dark cinematic theme** — purple, black, and gold palette

---

## Files

| File         | What it does                                                          |
|--------------|-----------------------------------------------------------------------|
| `index.html` | Page structure + inline base styles. The skeleton of the website.    |
| `style.css`  | Extra styles for the thumbnail cards and Latest Release section.     |
| `script.js`  | Renders the Featured Tracks + Latest Release from a data array; FAQ accordion; mood switcher. |
| `README.md`  | This guide.                                                           |

All three files are static. No build step is required — the browser runs them as-is.

---

## How to run locally

Pick whichever method you prefer. **All three serve the same files** — they just feel different.

### Option A — Python (recommended, no install needed if Python is already on your machine)

```bash
python3 -m http.server 5173
```

Then open <http://localhost:5173> in your browser.
*(Press `Ctrl+C` in the terminal to stop the server.)*

If `python3` isn't found, try `python` instead.

### Option B — VS Code Live Server

1. Install the **Live Server** extension in VS Code.
2. Right-click `index.html` → **Open with Live Server**.
3. The browser auto-reloads when you edit a file. Great for live tweaking.

### Option C — Just double-click `index.html`

It opens in your default browser. Works for most things, but some browser features (like `fetch` or service workers) only work when served via a real URL, so prefer Option A or B once your project grows.

---

## How to deploy on GitHub Pages

GitHub Pages turns any public repo into a free, HTTPS-secured website. Since this project is already pure static HTML/CSS/JS, **no build step is needed.**

### Deployment checklist

- [ ] Create a free GitHub account (if you don't have one)
- [ ] Create a new **public** GitHub repository (suggested name: `vivi-soul`)
- [ ] Push this project's code to the `main` branch
- [ ] In the repo, go to **Settings → Pages**
- [ ] Under **Source**, choose **Deploy from a branch**
- [ ] Choose branch **`main`** and folder **`/ (root)`**
- [ ] Click **Save**
- [ ] Wait ~1–2 minutes for the deploy to finish
- [ ] Visit your live URL: `https://<your-username>.github.io/vivi-soul/`

### Step-by-step (with terminal commands)

```bash
# 1. Inside the project folder
git init
git add .
git commit -m "Initial commit — Vivi Soul landing page"

# 2. Create the repo on github.com first, then connect it
git branch -M main
git remote add origin https://github.com/<your-username>/vivi-soul.git
git push -u origin main

# 3. Then enable Pages in the repo Settings (see checklist above)
```

After Pages finishes building, your site is live worldwide — no hosting fees, no server to maintain. Push a new commit and it auto-redeploys.

### What if my site uses a subfolder URL?

GitHub Pages serves project sites at `https://<user>.github.io/<repo>/` — that **subfolder path** is why we use **relative paths** in this project (`href="style.css"` not `href="/style.css"`). A leading `/` would point to the domain root and break the site. Relative paths keep working at any URL prefix.

---

## What I learned in this project

Across the build I touched almost every fundamental piece of front-end:

1. **Semantic HTML** — `<header>`, `<section>`, `<nav>`, `<footer>` for structure that screen readers and search engines understand.
2. **CSS layout** — Flexbox for the nav and buttons, CSS Grid for the cards, and `aspect-ratio` for responsive media.
3. **Theming with CSS variables** — `--bg`, `--accent`, `--accent-2` so a single edit shifts the whole vibe.
4. **Fluid typography** — `clamp(min, ideal, max)` so fonts scale smoothly between phone and desktop without a single media query.
5. **Responsive design** — viewport meta tag + `@media` breakpoints at 900px (tablet) and 600px (mobile).
6. **JavaScript DOM access** — `document.getElementById`, `querySelectorAll`, `addEventListener`.
7. **Array + object data structures** — the `featuredTracks` array as a single source of truth.
8. **Data-driven rendering** — `forEach` loop + template literals to generate cards from data; same array powers the Latest Release section and the Featured Tracks grid.
9. **Modulo trick for cycling** — `(i + 1) % length` to loop through moods.
10. **Anchor vs button** — when to use `<a href>` (navigation) vs `<button>` (action).
11. **External link security** — always pair `target="_blank"` with `rel="noopener noreferrer"`.
12. **Graceful fallbacks** — when YouTube iframe embeds got blocked (Error 153), pivoted to clickable thumbnails that always work.
13. **Static deployment** — preparing the project for GitHub Pages with relative paths and no build dependencies.

---

## Next steps to try

- Add a 4th track to `featuredTracks` and watch the grid + Latest Release adapt automatically.
- Add a fade-in scroll animation using `IntersectionObserver`.
- Hook up a real form (e.g. Formspree) to capture email signups.
- Buy a custom domain and point it at your GitHub Pages site via DNS.
