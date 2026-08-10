# Pipeline editorial e automação

## Objetivo

O site foi preparado para receber conteúdo automaticamente sem alterar o layout.

O ponto central é:

`data/articles.json`

A página inicial e `artigo.html` carregam esse arquivo via JavaScript. Portanto, uma automação futura pode publicar conteúdo apenas adicionando um novo objeto validado ao array `articles`.

## Fluxo futuro recomendado

```text
RSS / APIs / sites oficiais / tendências
        ↓
coleta de itens
        ↓
deduplicação
        ↓
agrupamento por evento
        ↓
Opportunity Score
        ↓
busca por fonte primária
        ↓
extração de fatos
        ↓
geração de rascunho original
        ↓
validação editorial
        ↓
atualização de data/articles.json
        ↓
commit no GitHub
        ↓
Cloudflare Pages faz deploy automático
```

## Contrato mínimo de um artigo

```json
{
  "id": "uuid-ou-id-estavel",
  "slug": "titulo-em-formato-de-url",
  "status": "published",
  "demo": false,
  "category": "tecnologia",
  "title": "Título",
  "summary": "Resumo",
  "author": "Redação BLOG",
  "publishedAt": "2026-08-10T12:00:00Z",
  "updatedAt": "2026-08-10T12:00:00Z",
  "views": 0,
  "tags": ["IA"],
  "entities": ["OpenAI"],
  "body": [
    {"type":"paragraph","text":"Texto..."},
    {"type":"heading","text":"Intertítulo..."}
  ],
  "sources": [
    {"name":"Fonte oficial","url":"https://exemplo.com"}
  ]
}
```

## Regras obrigatórias para a IA futura

1. Outros sites são sensores de pauta, não texto-base para paráfrase.
2. Priorizar fontes primárias.
3. Confirmar fatos importantes em mais de uma fonte quando necessário.
4. Não publicar rumor como fato.
5. Não copiar títulos, parágrafos ou estrutura de outro veículo.
6. Armazenar as fontes utilizadas.
7. Verificar duplicidade pelo evento, entidades e similaridade semântica.
8. Criptomoedas devem manter caráter informativo; não gerar promessa de retorno.
9. Cada artigo deve adicionar contexto, histórico, comparação ou explicação própria.
10. O pipeline deve poder marcar um artigo como `draft` para revisão humana.

## Próxima evolução para SEO

O MVP usa uma página genérica `artigo.html?slug=...`, suficiente para o primeiro protótipo.

Antes de buscar escala orgânica, a automação deverá gerar uma página HTML física para cada artigo, por exemplo:

`/noticias/2026/08/titulo-da-noticia/index.html`

Isso permite metatags, canonical, Open Graph e JSON-LD específicos de cada matéria, além de melhorar indexação e compartilhamento.

A mesma automação também deverá atualizar:

- `sitemap.xml`;
- sitemap de notícias;
- RSS;
- páginas de categoria;
- dados estruturados;
- links internos.
