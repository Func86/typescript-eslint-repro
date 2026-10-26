# typescript-eslint single-run memory repro

Since 8.72.1, single-run linting with `projectService` creates a standalone Program for `test/tsconfig.json`, which shares no `SourceFile`s with the project service's projects. The overlapping files are held twice.

Layout:

- `tsconfig.json`: solution config referencing the two projects below
- `tsconfig.app.json`: `src/**`, excluding `*.test.ts`
- `test/tsconfig.json`: `test/**` plus all of `src/**`, including the colocated `src/m.test.ts`

`npm run lint` generates 2000 modules in `src/` (via `prelint`), lints, and prints the heap retained after linting.

```sh
npm ci
npm run lint                         # 8.72.1: retained heap: ~271 MB
TSESTREE_SINGLE_RUN=false npm run lint  # ~192 MB
npm i -D typescript-eslint@8.72.0 && npm run lint  # ~192 MB
```
