// Генератор OG-карточки 1200×630 для соцсетей/мессенджеров: фиолетовое поле,
// плитка логотипа (как favicon) и название школы в две строки — Onest из
// самошостнутого кэша @nuxt/fonts, контуры глифов (см. scripts/make-favicon.js
// про обход вариаций woff2 в fontkitten). Временно, до карточки от дизайнера.
//
// Запуск из корня проекта после `nuxi prepare`/dev (кэш шрифтов скачан):
//   node scripts/make-og-image.js
const fs = require('fs');
const path = require('path');
const { create } = require('fontkitten');
const sharp = require('sharp');

const fontsDir = process.argv[2] || path.resolve('node_modules/.cache/nuxt/fonts/meta/data/fonts');
const outFile = path.resolve('public/og-image.png');

const W = 1200;
const H = 630;
const VIOLET = '#4f3a8c';
const LIME = '#c9e88a';
const WHITE = '#ffffff';

// ── шрифты: у Onest латиница и кириллица в разных файлах ──────────────
const fontFiles = fs.readdirSync(fontsDir).map((f) => path.join(fontsDir, f));
const fonts = fontFiles.map((f) => ({ buf: fs.readFileSync(f), font: create(fs.readFileSync(f)) }));
const fontFor = (ch) => fonts.find(({ font }) => font.hasGlyphForCodePoint(ch.codePointAt(0)));

const processors = new Map();
const processorFor = (entry, weight) => {
  const key = entry.buf.byteLength + ':' + weight;
  if (!processors.has(key)) {
    const Woff2Font = entry.font.constructor;
    const DecodeStream = entry.font.stream.constructor;
    const coords = entry.font.fvar.axis.map((a) => (a.axisTag.trim() === 'wght' ? weight : a.defaultValue));
    processors.set(key, new Woff2Font(new DecodeStream(entry.buf), coords)._variationProcessor);
  }
  return processors.get(key);
};

// точки глифа с применённым весом: простой глиф — свои точки, композитный
// («Й», «ё» и т.п.) — точки компонентов со смещением; фантомные точки
// нужны gvar для полного набора дельт
const variedPoints = (entry, glyph, weight) => {
  const raw = glyph._decode();
  if (!raw) return { points: [], advance: glyph.advanceWidth };
  const PointClass = entry.font.getGlyph(glyph.id)._decode().points?.[0]?.constructor
    ?? entry.font.getGlyph(raw.components?.[0]?.glyphID)._decode().points[0].constructor;
  const phantom = (adv) => [
    new PointClass(false, true, 0, 0),
    new PointClass(false, true, adv, 0),
    new PointClass(false, true, 0, 0),
    new PointClass(false, true, 0, 0),
  ];
  if (raw.numberOfContours < 0) {
    // композит: дельты gvar для него двигают сами компоненты (их dx/dy)
    const comps = raw.components.map((c) => new PointClass(true, true, c.dx, c.dy));
    const all = comps.concat(phantom(glyph.advanceWidth));
    processorFor(entry, weight).transformPoints(glyph.id, all);
    const advance = all[comps.length + 1].x - all[comps.length].x;
    const points = [];
    raw.components.forEach((c, i) => {
      const sub = entry.font.getGlyph(c.glyphID);
      const { points: subPts } = variedPoints(entry, sub, weight);
      for (const p of subPts) {
        points.push(new PointClass(p.onCurve, p.endContour, p.x * (c.scaleX ?? 1) + all[i].x, p.y * (c.scaleY ?? 1) + all[i].y));
      }
    });
    return { points, advance };
  }
  const points = raw.points.map((p) => new PointClass(p.onCurve, p.endContour, p.x, p.y));
  const all = points.concat(phantom(glyph.advanceWidth));
  processorFor(entry, weight).transformPoints(glyph.id, all);
  return { points: all.slice(0, points.length), advance: all[points.length + 1].x - all[points.length].x };
};

// контур глифа с применённым весом → path в единицах шрифта + метрики
const glyphPath = (entry, glyph, weight) => {
  const { points: moved, advance } = variedPoints(entry, glyph, weight);

  const contours = [];
  let cur = [];
  for (const p of moved) {
    cur.push(p);
    if (p.endContour) {
      contours.push(cur);
      cur = [];
    }
  }
  const f = (n) => Math.round(n * 100) / 100;
  let d = '';
  for (const c of contours) {
    if (!c.length) continue;
    let start;
    let seq;
    if (c[0].onCurve) {
      start = c[0];
      seq = c.slice(1).concat([c[0]]);
    } else if (c[c.length - 1].onCurve) {
      start = c[c.length - 1];
      seq = c.slice(0, -1).concat([start]);
    } else {
      const a = c[c.length - 1];
      const b = c[0];
      start = { onCurve: true, x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      seq = c.concat([start]);
    }
    d += `M${f(start.x)} ${f(start.y)}`;
    let ctrl = null;
    for (const p of seq) {
      if (p.onCurve) {
        d += ctrl ? `Q${f(ctrl.x)} ${f(ctrl.y)} ${f(p.x)} ${f(p.y)}` : `L${f(p.x)} ${f(p.y)}`;
        ctrl = null;
      } else if (ctrl) {
        d += `Q${f(ctrl.x)} ${f(ctrl.y)} ${f((ctrl.x + p.x) / 2)} ${f((ctrl.y + p.y) / 2)}`;
        ctrl = p;
      } else {
        ctrl = p;
      }
    }
    d += 'Z';
  }
  return { d, advance };
};

// строка текста → группа path'ов; size — кегль в px, weight — ось wght
const textPaths = (text, { x, y, size, weight, fill }) => {
  const scale = size / 1000; // upm Onest = 1000
  let cursor = 0;
  const parts = [];
  for (const ch of text) {
    if (ch === ' ') {
      cursor += 260; // пробел Onest ≈ 0.26em
      continue;
    }
    const entry = fontFor(ch);
    if (!entry) throw new Error(`нет глифа для «${ch}»`);
    const glyph = entry.font.glyphForCodePoint(ch.codePointAt(0));
    const { d, advance } = glyphPath(entry, glyph, weight);
    parts.push(
      `<path d="${d}" transform="translate(${(x + cursor * scale).toFixed(2)} ${y.toFixed(2)}) scale(${scale.toFixed(5)} ${(-scale).toFixed(5)})"/>`,
    );
    cursor += advance;
  }
  return { svg: `<g fill="${fill}">${parts.join('')}</g>`, width: cursor * scale };
};

// ── композиция ────────────────────────────────────────────────────────
const PAD = 96;
// плитка логотипа: как favicon — квадрат со скруглением 12/44, «SBA» 500
const TILE = 120;
const tile = textPaths('SBA', { x: 0, y: 0, size: 32.7, weight: 500, fill: WHITE });
const tileText = textPaths('SBA', {
  x: PAD + (TILE - tile.width) / 2,
  y: PAD + TILE / 2 + 32.7 * 0.36, // визуальный центр капителей (cap-height ≈ 0.72em)
  size: 32.7,
  weight: 500,
  fill: VIOLET,
});

const line1 = textPaths('Smart Business', { x: PAD, y: 400, size: 88, weight: 700, fill: WHITE });
const line2 = textPaths('Administration Academy', { x: PAD, y: 496, size: 88, weight: 700, fill: WHITE });
const tag = textPaths('ОБУЧЕНИЕ КРИПТОВАЛЮТАМ И БЛОКЧЕЙН-ТЕХНОЛОГИЯМ', {
  x: PAD,
  y: 280,
  size: 22,
  weight: 500,
  fill: LIME,
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${VIOLET}"/>
  <circle cx="${W - 40}" cy="${H + 120}" r="360" fill="${LIME}" opacity="0.9"/>
  <rect x="${PAD}" y="${PAD}" width="${TILE}" height="${TILE}" rx="${Math.round((TILE * 12) / 44)}" fill="${WHITE}"/>
  ${tileText.svg}
  ${tag.svg}
  ${line1.svg}
  ${line2.svg}
</svg>
`;

(async () => {
  await sharp(Buffer.from(svg), { density: 144 }).resize(W, H).png({ compressionLevel: 9 }).toFile(outFile);
  console.log('og-image.png', W + '×' + H, 'lines:', Math.round(line1.width), Math.round(line2.width), 'tag:', Math.round(tag.width));
})();
