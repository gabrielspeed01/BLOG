# Ajustes v4 — imagem e URLs

Versão de assets: `20260810-0437`

## Corrigido

- Imagem destacada limitada a 100% da coluna do artigo.
- Proporção visual 16:9 e altura máxima de 420px no desktop.
- `articleUrl()` não utiliza mais `artigo.html?slug=...` como fallback.
- Notícias com `url` usam diretamente a URL estática permanente.
- Fallback para notícias futuras: `/{categoria}/{slug}/`.
- CSS e JS recebem `?v=20260810-0437` para invalidar cache antigo.
- Durante desenvolvimento, `/assets/*` usa `must-revalidate`.
- `data/articles.json` usa `no-store`.

## Resultado esperado

A notícia real deve abrir diretamente em:

https://blog.gabriel-speed01.workers.dev/criptomoedas/senado-eua-avanca-clarity-act-regras-criptomoedas/

e nunca em:

/artigo?slug=senado-eua-avanca-clarity-act-regras-criptomoedas
