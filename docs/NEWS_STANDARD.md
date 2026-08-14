# FirstNews — padrão obrigatório de notícias

Este documento é a referência técnica/editorial para toda notícia nova.

## Formato obrigatório

Cada notícia deve ter:

- URL estática: `/{categoria}/{slug}/`;
- `Article.Category` em uma das quatro verticais: `tecnologia`, `criptomoedas`, `entretenimento`, `politica`;
- título, resumo, autor, publicação e atualização;
- conteúdo original baseado em fontes verificáveis;
- `NewsArticle` em JSON-LD;
- canonical em `https://firstnews.com.br/`;
- fontes consultadas ao final;
- entrada em `articles.json`, sitemap, News Sitemap (até 48h) e RSS.

## Imagem

1. Não usar imagem gerada por IA como padrão.
2. Não usar logotipo isolado quando existir imagem contextual adequada.
3. Priorizar imagem oficial/press kit quando a reutilização for permitida.
4. Caso contrário, usar fotografia real contextual em domínio público ou com licença compatível.
5. Dar preferência a imagens diretamente ligadas ao acontecimento ou às pessoas/locais/produtos envolvidos.
6. Crédito não substitui licença: atribuir uma fonte não torna automaticamente permitida a reprodução de uma foto protegida.
7. Registrar `url`, `alt`, `source`, `credit`, `license`, `width` e `height`.
8. Na página da matéria, mostrar abaixo da imagem: `Imagem: crédito — licença`, com link para a origem.
9. `featuredImage` é a única fonte da imagem para home, categoria e relacionados; não manter thumbnails independentes.

## Categorias e menus

`Article.Category` é a fonte de verdade. Uma notícia de Política deve aparecer automaticamente em `/politica/`, Tecnologia em `/tecnologia/`, e assim por diante.

Não manter listas manuais duplicadas de notícias dentro das páginas de categoria.

## Política

Cobertura factual, plural e verificável. Distinguir fato, declaração, alegação, análise, rumor e pesquisa. Priorizar fontes oficiais e exigir revisão humana quando houver risco editorial elevado.

## Criptomoedas

Conteúdo informativo, sem recomendação de compra ou venda, promessa de retorno ou linguagem de certeza financeira.

## Layout

Todas as notícias usam o mesmo template visual:
- cabeçalho FirstNews;
- categoria;
- título;
- lead;
- autoria e data;
- imagem real em proporção visual 16:9;
- crédito/licença imediatamente abaixo;
- corpo;
- fontes;
- notícias relacionadas;
- rodapé.

A home e as categorias usam a mesma `featuredImage` como thumbnail, com `object-fit: cover`.
