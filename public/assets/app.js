const DATA_URL = "/data/articles.json";

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
  return article.url || `/${encodeURIComponent(article.category)}/${encodeURIComponent(article.slug)}/`;
}

function articleThumbnail(article, klass="thumb thumb--image") {
  const image = article.featuredImage || article.thumbnail || {};
  if (image.url) {
    return `<a class="${klass}" href="${articleUrl(article)}" aria-label="${escapeHtml(article.title)}">
      <img src="${escapeHtml(image.url)}"
           alt="${escapeHtml(image.alt || article.title)}"
           width="${image.width || 1200}"
           height="${image.height || 675}"
           loading="lazy">
    </a>`;
  }
  return `<a class="thumb" href="${articleUrl(article)}" aria-label="${escapeHtml(article.title)}"></a>`;
}

function heroCard(article, main=false) {
  const heading = main ? "h1" : "h2";
  const image = article.featuredImage || {};
  const visual = image.url
    ? `<img class="hero-card__image" src="${escapeHtml(image.url)}" alt="${escapeHtml(image.alt || article.title)}" width="${image.width || 1200}" height="${image.height || 675}">`
    : `<div class="hero-card__visual"></div>`;
  return `<a class="hero-card" data-category="${escapeHtml(article.category)}" href="${articleUrl(article)}">
    ${visual}
    <div class="hero-card__content">
      <span class="tag">${escapeHtml(categoryLabel(article.category))}</span>
      <${heading}>${escapeHtml(article.title)}</${heading}>
      <div class="meta">${escapeHtml(displayAuthor(article.author))} · ${relativeDate(article.publishedAt)}</div>
    </div>
  </a>`;
}

function newsCard(article) {
  return `<article class="news-card" data-category="${escapeHtml(article.category)}">
    ${articleThumbnail(article)}
    <div>
      <span class="eyebrow">${escapeHtml(categoryLabel(article.category))}</span>
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

function renderNavigation() {
  qsa("[data-category-link]").forEach(a => {
    a.classList.toggle("is-active", a.dataset.categoryLink === state.category);
  });
}

function renderRanking(pool) {
  const target = qs("#mostRead");
  if (!target) return;
  const ranking = [...pool].sort((a,b)=>(b.views||0)-(a.views||0)).slice(0,5);
  target.innerHTML = ranking.map((a,i)=>`<li>
    <span class="ranking__number">${String(i+1).padStart(2,"0")}</span>
    <a href="${articleUrl(a)}">${escapeHtml(a.title)}</a>
  </li>`).join("");
}

function renderHome() {
  const filtered = filteredArticles();
  const base = (state.category || state.query) ? filtered : state.articles;
  const hero = base.slice(0,3);

  const heroGrid = qs("#heroGrid");
  if (heroGrid) {
    heroGrid.innerHTML = hero.length
      ? hero.map((a,i) => heroCard(a,i===0)).join("")
      : '<div class="empty-state"><h3>Nenhuma notícia encontrada</h3></div>';
  }

  const latest = qs("#latestNews");
  if (latest) {
    latest.innerHTML = filtered.length
      ? filtered.slice(0,20).map(newsCard).join("")
      : '<div class="empty-state"><h3>Nenhuma notícia encontrada</h3></div>';
  }

  renderRanking(state.articles);
  qsa(".pill").forEach(btn => btn.classList.toggle("is-active", btn.dataset.filter === state.filter));
  renderNavigation();
}

function renderCategory() {
  state.category = document.body.dataset.category || state.category;
  const categoryArticles = state.articles.filter(a => a.category === state.category);

  const latest = qs("#latestNews");
  if (latest) {
    latest.innerHTML = categoryArticles.length
      ? categoryArticles.map(newsCard).join("")
      : `<div class="empty-state"><h3>Nenhuma notícia em ${escapeHtml(categoryLabel(state.category))}</h3></div>`;
  }

  const count = qs("#categoryCount");
  if (count) count.textContent = `${categoryArticles.length} ${categoryArticles.length === 1 ? "notícia publicada" : "notícias publicadas"}`;

  renderRanking(categoryArticles);
  renderNavigation();
}

async function boot() {
  qs("#year") && (qs("#year").textContent = new Date().getFullYear());

  const params = new URLSearchParams(location.search);
  state.category = document.body.dataset.category || params.get("categoria") || "";
  state.query = params.get("q") || "";

  try {
    const response = await fetch(DATA_URL, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    state.articles = (payload.articles || [])
      .filter(a => a.status === "published" && !a.demo)
      .sort((a,b)=>new Date(b.publishedAt)-new Date(a.publishedAt));
  } catch (error) {
    console.error("Falha ao carregar artigos", error);
    state.articles = [];
  }

  if (document.body.dataset.page === "category") renderCategory();
  else renderHome();
}

qs("#menuToggle")?.addEventListener("click", () => {
  const nav = qs("#mainNav");
  if (!nav) return;
  nav.classList.toggle("is-open");
  qs("#menuToggle").setAttribute("aria-expanded", nav.classList.contains("is-open"));
});

qs("#searchButton")?.addEventListener("click", () => {
  const panel = qs("#searchPanel");
  if (!panel) return;
  panel.hidden = !panel.hidden;
  if (!panel.hidden) qs("#searchInput")?.focus();
});

qs("#searchForm")?.addEventListener("submit", e => {
  e.preventDefault();
  const q = qs("#searchInput")?.value.trim() || "";
  location.href = q ? `/?q=${encodeURIComponent(q)}` : "/";
});

qs("#filterPills")?.addEventListener("click", e => {
  const btn = e.target.closest("[data-filter]");
  if (!btn) return;
  state.filter = btn.dataset.filter;
  state.category = "";
  renderHome();
});

boot();
