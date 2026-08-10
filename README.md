# BLOG

Portal estático de notícias para Cloudflare Workers Static Assets.

## Deploy

O conteúdo público fica em `public/`. O arquivo `wrangler.jsonc` aponta exclusivamente para essa pasta.

Configuração no Cloudflare:

- Root directory: `/`
- Build command: `None`
- Deploy command: `npx wrangler deploy`
- Production branch: `main`

Veja `DEPLOY-CLOUDFLARE.md`.

## Verticais editoriais

- Tecnologia
- Criptomoedas
- Entretenimento
- Política

A vertical Política utiliza `/politica/` e segue regras editoriais mais rígidas para cobertura eleitoral, pesquisas, declarações, alegações e conteúdo político sensível.
