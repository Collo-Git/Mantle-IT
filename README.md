# Mantle IT website

Static site (plain HTML/CSS/JS) – no build step needed to deploy.

## Structure
```
index.html, contact.html, 404.html   Pages
assets/css/main.min.css              Styles the pages load (generated)
assets/js/main.min.js                Scripts the pages load (generated)
assets/img/                          Optimised images (WebP) + social share image
src/css/main.css, src/js/main.js     EDIT THESE – readable source for the two files above
tools/                               Minify script (not deployed)
_drafts/                             Page template + old template pages (not deployed)
vercel.json                          Security headers + caching
robots.txt, sitemap.xml              SEO
```

## Preview locally
Pages open by double-clicking `index.html`, but a local server shows exactly what visitors will see (including the 404 page):
- VS Code "Live Server" extension, or
- `npx serve .` in this folder.

## Editing styles or scripts
1. Edit `src/css/main.css` or `src/js/main.js`.
2. Regenerate the minified files (needs Node.js):
   ```
   cd tools
   npm install
   npm run minify
   ```
Brand colours are CSS variables at the top of `src/css/main.css` (`--midnight`, `--sky`, `--white`).

## Adding a page
1. Copy `_drafts/page-template.html` to the site root and rename it (e.g. `about.html`).
2. Fill in the title, description, canonical URL and content.
3. Add a link in the menu of every page (and the footer).
4. Add the page to `sitemap.xml`.

## Deploy on Vercel
1. Put this folder in a GitHub repository and import it at vercel.com/new
   (Framework preset: **Other**; leave build and output settings empty).
   Or run `npx vercel --prod` inside this folder.
2. In the project: Settings → Domains → add `mantle-it.co.ke` and `www.mantle-it.co.ke`,
   then set DNS at your registrar as Vercel instructs. HTTPS is automatic.
3. In Domains, set `www` to redirect to the main domain (or vice-versa).
4. Check the live site with https://pagespeed.web.dev and https://securityheaders.com.
5. Add the site in Google Search Console and submit `https://mantle-it.co.ke/sitemap.xml`.

## Things to update later
- Domain: the canonical URLs, social tags, JSON-LD, `sitemap.xml` and `robots.txt` assume `https://mantle-it.co.ke`.
  If it changes, search-and-replace that address.
- Email: contact details use `mantle-it@gmail.com`. When you set up a business address
  (e.g. info@mantle-it.co.ke), update `contact.html`, `index.html` (footer + structured data) and the form's `action="mailto:..."`.
- Social links: add them to the footer once the accounts exist.
- If you edit a file under `assets/img/`, rename it (e.g. `sme-800-v2.webp`) so browsers fetch the new version.
