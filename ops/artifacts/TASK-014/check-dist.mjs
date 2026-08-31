import fs from 'node:fs';
const h = fs.readFileSync('dist/hy/index.html', 'utf8');
const desc = (h.match(/meta name="description" content="([^"]+)"/) || [])[1] || '';
console.log({
  descHasPhone: /37477271488/.test(desc),
  telLink: /tel:\+374/.test(h),
  waMeCount: (h.match(/wa\.me\/37477271488/g) || []).length,
  ogImage: (h.match(/og:image" content="([^"]+)"/) || [])[1],
});
