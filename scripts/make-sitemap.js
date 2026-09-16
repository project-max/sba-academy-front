// sitemap.xml по фактически сгенерированной статике: обходит .output/public,
// берёт каждую папку с index.html как URL. Запускается автоматически после
// `npm run generate` (postgenerate) — отдельного модуля и ручного списка
// роутов не нужно. noindex-страницы и служебные 200/404 в карту не попадают
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://academysba.pro'; // = siteConfig.url (src/shared/config/site.ts)
const NOINDEX = new Set(['/privacy', '/oferta']);
const publicDir = path.resolve('.output/public');

if (!fs.existsSync(path.join(publicDir, 'index.html'))) {
  console.error('make-sitemap: нет .output/public/index.html — сначала npm run generate');
  process.exit(1);
}

const routes = [];
const walk = (dir, route) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('_') || entry.name.startsWith('.')) continue; // _nuxt, _payload…
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, `${route}/${entry.name}`);
    else if (entry.name === 'index.html') routes.push(route || '/');
  }
};
walk(publicDir, '');

const urls = routes
  .filter((r) => !NOINDEX.has(r) && !/^\/(200|404)$/.test(r))
  .sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)));

const today = new Date().toISOString().slice(0, 10);
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map((r) => `  <url><loc>${SITE_URL}${r}</loc><lastmod>${today}</lastmod></url>`),
  '</urlset>',
  '',
].join('\n');

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
console.log(`sitemap.xml: ${urls.length} URL → ${urls.join(', ')}`);

// robots.txt лежит в public/ и должен ссылаться на эту карту
const robots = fs.readFileSync(path.join(publicDir, 'robots.txt'), 'utf8');
if (!robots.includes(`${SITE_URL}/sitemap.xml`)) {
  console.error('make-sitemap: robots.txt не ссылается на sitemap.xml');
  process.exit(1);
}
