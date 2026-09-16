// Генератор фавикона SBA Academy: плитка логотипа из шапки (brand-violet,
// скругление 12/44, «SBA» Onest 500 белым) → SVG с контурами глифов →
// PNG-набор + ICO в public/.
//
// Запуск из корня проекта после `nuxi prepare`/dev (кэш шрифтов уже скачан):
//   node scripts/make-favicon.js
// Перегенерировать нужно только при смене логотипа, палитры или шрифта.
//
// Шрифт — самошостнутый вариативный Onest (woff2 из кэша @nuxt/fonts).
// fontkitten не умеет вариации для woff2 «из коробки» (getVariation ломается
// на сжатом потоке, прямой конструктор с координатами — на композитах),
// поэтому: точки глифа берём у базового шрифта, сдвиг оси веса применяем
// его же GlyphVariationProcessor вручную и собираем path сами.
const fs = require('fs');
const path = require('path');
// fontkitten и sharp — транзитивные зависимости Nuxt (@nuxt/fonts, ipx)
const { create } = require('fontkitten');
const sharp = require('sharp');

// самошостнутые файлы Onest из кэша @nuxt/fonts
const fontsDir = process.argv[2] || path.resolve('node_modules/.cache/nuxt/fonts/meta/data/fonts');
const outDir = path.resolve('public');
const WEIGHT = 500; // label-s у плитки в шапке

const fontFile = fs
  .readdirSync(fontsDir)
  .map((f) => path.join(fontsDir, f))
  .find((f) => {
    const font = create(fs.readFileSync(f));
    return font.hasGlyphForCodePoint(83) && font.hasGlyphForCodePoint(66);
  });
if (!fontFile) throw new Error('латинский Onest не найден');
const buf = fs.readFileSync(fontFile);
const base = create(buf);

const Woff2Font = base.constructor;
const DecodeStream = base.stream.constructor;
const coords = base.fvar.axis.map((a) => (a.axisTag.trim() === 'wght' ? WEIGHT : a.defaultValue));
const processor = new Woff2Font(new DecodeStream(buf), coords)._variationProcessor;
if (!processor) throw new Error('вариационный процессор не создан');

// контур глифа с применённым весом → SVG path (TrueType: квадратичные кривые)
const glyphPath = (glyph) => {
  const raw = glyph._decode();
  if (!raw || raw.numberOfContours < 0) throw new Error('композитный глиф — не поддерживается');
  const PointClass = raw.points[0].constructor;
  const points = raw.points.map((p) => new PointClass(p.onCurve, p.endContour, p.x, p.y));
  // gvar хранит дельты и для 4 фантомных точек (метрики) — добавляем их,
  // иначе трансформация считает набор точек неполным
  const adv = glyph.advanceWidth;
  const phantom = [
    new PointClass(false, true, 0, 0),
    new PointClass(false, true, adv, 0),
    new PointClass(false, true, 0, 0),
    new PointClass(false, true, 0, 0),
  ];
  const all = points.concat(phantom);
  processor.transformPoints(glyph.id, all);
  const moved = all.slice(0, points.length);
  const advVar = all[points.length + 1].x - all[points.length].x;

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
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const track = (px, py) => {
    minX = Math.min(minX, px); maxX = Math.max(maxX, px);
    minY = Math.min(minY, py); maxY = Math.max(maxY, py);
  };
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
      const a = c[c.length - 1], b = c[0];
      start = { onCurve: true, x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      seq = c.concat([start]);
    }
    d += `M${f(start.x)} ${f(start.y)}`;
    track(start.x, start.y);
    let ctrl = null;
    for (const p of seq) {
      if (p.onCurve) {
        if (ctrl) {
          d += `Q${f(ctrl.x)} ${f(ctrl.y)} ${f(p.x)} ${f(p.y)}`;
          track(ctrl.x, ctrl.y);
          ctrl = null;
        } else {
          d += `L${f(p.x)} ${f(p.y)}`;
        }
        track(p.x, p.y);
      } else if (ctrl) {
        const mx = (ctrl.x + p.x) / 2, my = (ctrl.y + p.y) / 2;
        d += `Q${f(ctrl.x)} ${f(ctrl.y)} ${f(mx)} ${f(my)}`;
        track(ctrl.x, ctrl.y); track(mx, my);
        ctrl = p;
      } else {
        ctrl = p;
      }
    }
    d += 'Z';
  }
  return { d, bbox: { minX, minY, maxX, maxY }, advance: advVar };
};

let x = 0;
const paths = [];
const ink = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
for (const ch of 'SBA') {
  const glyph = base.glyphForCodePoint(ch.codePointAt(0));
  const { d, bbox, advance } = glyphPath(glyph);
  ink.minX = Math.min(ink.minX, x + bbox.minX);
  ink.maxX = Math.max(ink.maxX, x + bbox.maxX);
  ink.minY = Math.min(ink.minY, bbox.minY);
  ink.maxY = Math.max(ink.maxY, bbox.maxY);
  paths.push({ d, dx: x });
  console.log(ch, 'advance 400:', glyph.advanceWidth, `→ ${WEIGHT}:`, Math.round(advance), 'bbox:', JSON.stringify(bbox));
  x += advance;
}
const inkW = ink.maxX - ink.minX;
const inkH = ink.maxY - ink.minY;
console.log('ink box:', JSON.stringify(ink), 'W×H:', Math.round(inkW), Math.round(inkH));

// плитка: как в шапке — «SBA» 12px label-s в плитке 44 → ширина слова
// ≈ 23px = 52% плитки; радиус 12/44
const SIZE = 1000;
const RADIUS = Math.round((SIZE * 12) / 44);
const scale = (SIZE * 0.52) / inkW;
const offsetX = (SIZE - inkW * scale) / 2 - ink.minX * scale;
const offsetY = (SIZE - inkH * scale) / 2 + ink.maxY * scale;

const glyphs = paths
  .map(
    (p) =>
      `<path d="${p.d}" transform="translate(${(offsetX + p.dx * scale).toFixed(2)} ${offsetY.toFixed(2)}) scale(${scale.toFixed(5)} ${(-scale).toFixed(5)})"/>`,
  )
  .join('\n    ');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}">
  <rect width="${SIZE}" height="${SIZE}" rx="${RADIUS}" fill="#4f3a8c"/>
  <g fill="#ffffff">
    ${glyphs}
  </g>
</svg>
`;

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'favicon.svg'), svg);
console.log('favicon.svg', svg.length, 'bytes');

const raster = (size) =>
  sharp(Buffer.from(svg), { density: Math.ceil((72 * size) / SIZE) * 4 })
    .resize(size, size)
    .png({ compressionLevel: 9 });

const png = async (size, name) => {
  await raster(size).toFile(path.join(outDir, name));
  console.log(name, size);
};

const ico = async (sizes, name) => {
  const frames = [];
  for (const s of sizes) frames.push({ s, buf: await raster(s).toBuffer() });
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(frames.length, 4);
  const entries = [];
  let offset = 6 + 16 * frames.length;
  for (const fr of frames) {
    const e = Buffer.alloc(16);
    e.writeUInt8(fr.s >= 256 ? 0 : fr.s, 0);
    e.writeUInt8(fr.s >= 256 ? 0 : fr.s, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(fr.buf.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += fr.buf.length;
    entries.push(e);
  }
  fs.writeFileSync(path.join(outDir, name), Buffer.concat([header, ...entries, ...frames.map((fr) => fr.buf)]));
  console.log(name, sizes.join('/'));
};

(async () => {
  await png(180, 'apple-touch-icon.png');
  await png(192, 'icon-192.png');
  await png(512, 'icon-512.png');
  await ico([16, 32, 48], 'favicon.ico');
})();
