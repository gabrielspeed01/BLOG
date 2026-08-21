# FirstNews — pacote de correções AdSense

Este pacote corrige os problemas críticos encontrados na auditoria:

- restaura a homepage real em `index.html`;
- troca o canonical da homepage para `https://firstnews.com.br/`;
- transforma `robots.txt` em um robots válido;
- faz a homepage consumir `articles.json` real e ignora conteúdo `demo`;
- passa a usar URLs estáticas das matérias, em vez de `artigo.html?slug=...`;
- inclui Política no JavaScript da homepage;
- exibe a imagem real da matéria nos cards quando disponível;
- atualiza o sitemap conhecido para `firstnews.com.br`;
- adiciona páginas de Sobre, Política Editorial, Correções, Autor e Contato.

## IMPORTANTE

O repositório atual ainda possui páginas de artigos antigos com referências a:
`https://blog.gabriel-speed01.workers.dev/`

Faça uma substituição global dessa origem por:
`https://firstnews.com.br`

nos arquivos `.html`, `.xml` e `.json` do repositório antes de solicitar nova revisão do AdSense.

Também remova do deploy arquivos residuais como `index (1).html`, `index (10).html`, `download (3)` e similares caso não sejam usados por rotas reais.
