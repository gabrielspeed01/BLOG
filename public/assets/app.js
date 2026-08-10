const DATA_URL = "./data/articles.json";

const state = { articles: [], filter: "all", query: "", category: "" };

const qs = (s, root=document) => root.querySelector(s);
const qsa = (s, root=document) => [...root.querySelectorAll(s)];

function escapeHtml(value="") {
  return String(value).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
}

function categoryLabel(category) {
  return ({ tecnologia:"Tecnologia", criptomoedas:"Criptomoedas", entretenimento:"Entretenimento", politica:"Política" })[category] || category;
}

function displayAuthor(author="") {
  return String(author).replace(/\bBLOG\b/g, "FirstNews");
}

function relativeDate(iso) {
  const date = new Date(iso);
  const diff = Math.max(0, Date.now() - date.getTime());
  const min = Math.floor(diff/60000);
  if (min < 60) return min <= 1 ? "agora" : `há ${min} min`;
  const h = Math.floor(min/60);
  if (h < 24) return `há ${h} h`;
  const d = Math.floor(h/24);
  return d === 1 ? "há 1 dia" : `há ${d} dias`;
}

function articleUrl(article) {
  if (article.url) return article.url;
  if (article.category && article.slug) {
    return `/${encodeURIComponent(article.category)}/${encodeURIComponent(article.slug)}/`;
  }
  return "/";
}

function badge(article) {
  return article.demo ? '<span class="demo-badge">DEMONSTRAÇÃO</span>' : "";
}

function heroCard(article, main=false) {
  const heading = main ? "h1" : "h2";
  const visual = article.featuredImage?.url
    ? `<img class="hero-card__image" src="${escapeHtml(article.featuredImage.url)}" alt="${escapeHtml(article.featuredImage.alt || article.title)}" width="${article.featuredImage.width || 1200}" height="${article.featuredImage.height || 675}">`
    : `<div class="hero-card__visual"></div>`;
  return `<a class="hero-card" data-category="${escapeHtml(article.category)}" href="${articleUrl(article)}">
    ${visual}
    <div class="hero-card__content">
      <span class="tag">${escapeHtml(categoryLabel(article.category))}</span>${badge(article)}
      <${heading}>${escapeHtml(article.title)}</${heading}>
      <div class="meta">${escapeHtml(displayAuthor(article.author))} · ${relativeDate(article.publishedAt)}</div>
    </div>
  </a>`;
}

function newsCard(article) {
  const klass = article.category === "criptomoedas" ? "thumb--crypto" : article.category === "entretenimento" ? "thumb--ent" : article.category === "politica" ? "thumb--politica" : "";
  const thumb = article.featuredImage?.url
    ? `<a class="thumb thumb--image" href="${articleUrl(article)}" aria-label="${escapeHtml(article.title)}"><img src="${escapeHtml(article.featuredImage.url)}" alt="${escapeHtml(article.featuredImage.alt || article.title)}" width="${article.featuredImage.width || 1200}" height="${article.featuredImage.height || 675}" loading="lazy"></a>`
    : `<a class="thumb ${klass}" data-letter="${escapeHtml(categoryLabel(article.category).slice(0,1))}" href="${articleUrl(article)}" aria-label="${escapeHtml(article.title)}"></a>`;
  return `<article class="news-card">
    ${thumb}
    <div>
      <span class="eyebrow">${escapeHtml(categoryLabel(article.category))}</span>${badge(article)}
      <h3><a href="${articleUrl(article)}">${escapeHtml(article.title)}</a></h3>
      <p>${escapeHtml(article.summary)}</p>
      <div class="meta">${escapeHtml(displayAuthor(article.author))} · ${relativeDate(article.publishedAt)}</div>
    </div>
  </article>`;
}

function filteredArticles() {
  return state.articles.filter(article => {
    const catOk = (state.filter === "all" || article.category === state.filter) &&
                  (!state.category || article.category === state.category);
    const haystack = `${article.title} ${article.summary} ${(article.tags||[]).join(" ")}`.toLowerCase();
    const qOk = !state.query || haystack.includes(state.query.toLowerCase());
    return catOk && qOk;
  });
}

function renderHome() {
  const filtered = filteredArticles();
  const base = (state.category || state.query) ? filtered : state.articles;
  const hero = base.slice(0,3);
  qs("#heroGrid").innerHTML = hero.length
    ? hero.map((a,i) => heroCard(a,i===0)).join("")
    : '<div class="empty-state"><h3>Nenhuma notícia encontrada</h3><p>O pipeline ainda não adicionou conteúdo para este filtro.</p></div>';

  qs("#latestNews").innerHTML = filtered.length
    ? filtered.slice(0,12).map(newsCard).join("")
    : '<div class="empty-state"><h3>Nenhuma notícia encontrada</h3><p>Tente outra busca ou categoria.</p></div>';

  const ranking = [...state.articles].filter(a => !a.demo).sort((a,b)=>(b.views||0)-(a.views||0)).slice(0,5);
  qs("#mostRead").innerHTML = ranking.map((a,i)=>`<li><span class="ranking__number">${String(i+1).padStart(2,"0")}</span><a href="${articleUrl(a)}">${escapeHtml(a.title)}</a></li>`).join("");

  qsa(".pill").forEach(btn => btn.classList.toggle("is-active", btn.dataset.filter === state.filter));
  qsa("[data-category-link]").forEach(a => a.classList.toggle("is-active", a.dataset.categoryLink === state.category));
}

function renderArticle() {
  const slug = new URLSearchParams(location.search).get("slug");
  const article = state.articles.find(a => a.slug === slug);
  if (!article) {
    qs("#articleContent").innerHTML = '<div class="empty-state"><h3>Notícia não encontrada</h3><p>Ela pode ter sido removida ou ainda não foi publicada.</p><p><a href="./">Voltar para a página inicial</a></p></div>';
    return;
  }

  document.title = `${article.title} — FirstNews`;
  let meta = qs('meta[name="description"]');
  if (meta) meta.setAttribute("content", article.summary);

  const body = (article.body || []).map(block => {
    if (block.type === "heading") return `<h2>${escapeHtml(block.text)}</h2>`;
    return `<p>${escapeHtml(block.text)}</p>`;
  }).join("");

  qs("#articleContent").innerHTML = `
    <span class="article-page__category">${escapeHtml(categoryLabel(article.category))}</span>${badge(article)}
    <h1>${escapeHtml(article.title)}</h1>
    <p class="article-page__lead">${escapeHtml(article.summary)}</p>
    <div class="article-page__meta">Por ${escapeHtml(displayAuthor(article.author))} · ${new Date(article.publishedAt).toLocaleString("pt-BR")}</div>
    <div class="article-page__body">${body}</div>
    ${article.sources?.length ? `<div class="article-page__source"><strong>Fontes utilizadas:</strong><br>${article.sources.map(s => `<a href="${escapeHtml(s.url)}" rel="nofollow noopener" target="_blank">${escapeHtml(s.name)}</a>`).join("<br>")}</div>` : ""}
  `;

  const related = state.articles.filter(a => a.slug !== article.slug && a.category === article.category).slice(0,5);
  qs("#relatedNews").innerHTML = related.map(a => `<a class="related-item" href="${articleUrl(a)}">${escapeHtml(a.title)}</a>`).join("");
}

async function boot() {
  qs("#year") && (qs("#year").textContent = new Date().getFullYear());

  const params = new URLSearchParams(location.search);
  state.category = params.get("categoria") || "";
  state.query = params.get("q") || "";

  try {
    const response = await fetch(DATA_URL, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    state.articles = (payload.articles || []).filter(a => a.status === "published" && !a.demo).sort((a,b)=>new Date(b.publishedAt)-new Date(a.publishedAt));
  } catch (error) {
    console.error("Falha ao carregar artigos", error);
    state.articles = [];
  }

  if (document.body.dataset.page === "article") renderArticle();
  else renderHome();
}

qs("#menuToggle")?.addEventListener("click", () => {
  const nav = qs("#mainNav");
  nav.classList.toggle("is-open");
  qs("#menuToggle").setAttribute("aria-expanded", nav.classList.contains("is-open"));
});

qs("#searchButton")?.addEventListener("click", () => {
  const panel = qs("#searchPanel");
  panel.hidden = !panel.hidden;
  if (!panel.hidden) qs("#searchInput").focus();
});

qs("#searchForm")?.addEventListener("submit", e => {
  e.preventDefault();
  const q = qs("#searchInput").value.trim();
  location.href = q ? `./?q=${encodeURIComponent(q)}` : "./";
});

qs("#filterPills")?.addEventListener("click", e => {
  const btn = e.target.closest("[data-filter]");
  if (!btn) return;
  state.filter = btn.dataset.filter;
  state.category = "";
  renderHome();
});

boot();
const mobileNav = qs("#mainNav");
mobileNav?.addEventListener("click", e => {
  if (!e.target.closest("a")) return;
  mobileNav.classList.remove("is-open");
  qs("#menuToggle")?.setAttribute("aria-expanded", "false");
});
