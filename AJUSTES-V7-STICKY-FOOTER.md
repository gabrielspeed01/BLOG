# Atualização v7 — rodapé das páginas de categoria

Versão CSS: `20260810-0508`

## Problema

As páginas:
- `/tecnologia/`
- `/criptomoedas/`
- `/entretenimento/`
- `/politica/`

possuem pouco conteúdo neste estágio e o rodapé aparecia logo após o conteúdo,
ficando visualmente no meio da viewport em monitores altos.

## Correção

Foi aplicado um layout sticky footer apenas nessas páginas:

```css
body.page-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

body.page-shell > main {
  flex: 1 0 auto;
}

body.page-shell > .site-footer {
  margin-top: auto;
}
```

Quando o conteúdo for maior que a tela, o comportamento continua normal e o
rodapé aparece após todo o conteúdo.
