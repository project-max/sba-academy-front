// Гейт коммит-сообщений (см. .claude/skills/commit):
// 1) запрет любых следов ИИ; 2) формат Conventional Commits
import { readFileSync } from 'node:fs';

const file = process.argv[2];
if (!file) process.exit(0);

const raw = readFileSync(file, 'utf8');
const msg = raw
  .split('\n')
  .filter((line) => !line.startsWith('#'))
  .join('\n')
  .trim();
if (!msg) process.exit(0);

const aiMarkers = /co-authored-by:.*(claude|anthropic|copilot)|generated with|claude code|\u{1F916}/iu;
if (aiMarkers.test(msg)) {
  console.error('[commit-msg] В коммитах запрещены упоминания ИИ (см. .claude/skills/commit/SKILL.md).');
  process.exit(1);
}

const subject = msg.split('\n')[0];
if (/^(Merge|Revert|fixup!|squash!)/.test(subject)) process.exit(0);

const conventional = /^(feat|fix|docs|refactor|style|chore|ci|test|perf|build|revert)(\([\w-]+\))?!?: .+/;
if (!conventional.test(subject)) {
  console.error(`[commit-msg] Заголовок не соответствует Conventional Commits: "${subject}"`);
  console.error('[commit-msg] Формат: type(scope): summary — см. .claude/skills/commit/SKILL.md');
  process.exit(1);
}
