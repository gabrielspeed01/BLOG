# FirstNews

Portal de notícias em tempo real nas verticais Tecnologia, Criptomoedas, Entretenimento e Política.

## Estrutura

- `public/` — site publicado pela Cloudflare.
- `public/data/articles.json` — fonte de verdade para artigos e listagens.
- `public/assets/app.js` — home, categorias, busca, filtros e navegação.
- `public/assets/styles.css` — estilos globais e responsivos.
- `docs/NEWS_STANDARD.md` — padrão obrigatório para novas notícias.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run deploy
```

O domínio público definitivo é `https://firstnews.com.br/`.
