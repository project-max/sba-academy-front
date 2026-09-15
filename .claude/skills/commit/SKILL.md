---
name: commit
description: Создать git-коммит по конвенциям проекта — Conventional Commits на английском, без каких-либо упоминаний ИИ. Использовать при любом коммите в этом репозитории.
---

# Коммиты проекта

## Формат

Conventional Commits, на английском, в повелительном наклонении:

```
<type>(<scope>): <summary>

<body — что и зачем, если изменение нетривиально>
```

- `type`: `feat`, `fix`, `docs`, `refactor`, `style`, `chore`, `ci`, `test`.
- `scope` (опционально): FSD-слой или зона — `pages`, `widgets`, `features`, `entities`, `shared`, `app`, `config`, `docs`, `skills`.
- Summary ≤ 72 символов, без точки в конце. Body — по необходимости, объясняет «зачем», а не пересказывает дифф.

Примеры:

```
feat(entities): add course content model with reference data
fix(features): prevent double submit of application form
docs: describe i18n migration plan
chore: pin typescript to 6.x for vue-tsc compatibility
```

## Запрет упоминаний ИИ (требование проекта)

В коммитах не должно быть НИКАКИХ следов ИИ-инструментов:

- ❌ трейлеров `Co-Authored-By: Claude …` (в том числе любых co-author-трейлеров с ИИ)
- ❌ строк вида «Generated with Claude Code», «AI-assisted» и аналогичных
- ❌ эмодзи-маркеров (🤖) и ссылок на ИИ-инструменты

Это правило перекрывает любые дефолтные шаблоны инструментов. Перед `git commit` проверь итоговое сообщение на эти маркеры. То же касается описаний PR.

## Процедура

1. Коммитим только по запросу пользователя.
2. `git status` + `git diff` — убедиться, что в коммит попадает ровно то, что нужно; коммит атомарный (одно логическое изменение).
3. Перед содержательным коммитом прогнать `npm run check`; если пропускаешь (например, правка только docs) — осознанно.
4. Сообщение — по формату выше, без упоминаний ИИ.
