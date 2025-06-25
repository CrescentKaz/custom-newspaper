//the following was made with ChatGPT and may require editing. 
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("news-container");
  const date = document.getElementById("date");

  const today = new Date();
  date.innerText = today.toDateString();

/*
  // 1. Reddit WorldNews
  fetch("https://www.reddit.com/r/worldnews/.json")
    .then(res => res.json())
    .then(data => {
      const posts = data.data.children.slice(0, 3);
      posts.forEach(post => {
        const item = post.data;
        addArticle({
          title: item.title,
          summary: "Reddit r/worldnews",
          link: "https://reddit.com" + item.permalink,
          image: item.thumbnail && item.thumbnail.startsWith("http") ? item.thumbnail : null
        });
      });
    });
*/

  // 2. Semantic Scholar - shark papers in 2025
  fetch("https://api.semanticscholar.org/graph/v1/paper/search?query=shark&year=2025&openAccessPdf=true&fields=title,authors,abstract,year&limit=3")
    .then(res => res.json())
    .then(data => {
      data.data.forEach(paper => {
        addArticle({
          title: paper.title,
          summary: paper.abstract || "No abstract available.",
            link: `https://www.semanticscholar.org/paper/${paper.paperId}`,
      image: null
    });
  });
});

  // 3. Wikipedia Featured Feed
  fetch(`https://en.wikipedia.org/api/rest_v1/feed/featured/${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`)
    .then(res => res.json())
    .then(data => {
      if (data.tfa) {
        const item = data.tfa;
        addArticle({
          title: item.titles.normalized,
          summary: item.extract,
          link: item.content_urls.desktop.page,
          image: item.thumbnail ? item.thumbnail.source : null
        });
      }
    });

  // 4. Hacker News - top stories
  fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
    .then(res => res.json())
    .then(ids => {
      return Promise.all(
        ids.slice(0, 3).map(id =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
        )
      );
    })
    .then(articles => {
      articles.forEach(item => {
        addArticle({
          title: item.title,
          summary: "Hacker News",
          link: item.url || `https://news.ycombinator.com/item?id=${item.id}`,
          image: null
        });
      });
    });

  // 5. NYT via RSS2JSON proxy (static parsing)
  fetch("https://api.rss2json.com/v1/api.json?rss_url=https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml")
    .then(res => res.json())
    .then(data => {
      data.items.slice(0, 3).forEach(item => {
        addArticle({
          title: item.title,
          summary: item.description.replace(/<[^>]*>?/gm, "").slice(0, 200) + "...",
          link: item.link,
          image: item.enclosure?.link || null
        });
      });
    });

  // Injects articles into the page
  function addArticle({ title, summary, link, image }) {
    const article = document.createElement("article");

    if (image) {
      const img = document.createElement("img");
      img.src = image;
      img.alt = title;
      article.appendChild(img);
    }

    const h2 = document.createElement("h2");
    h2.textContent = title;
    article.appendChild(h2);

    const p = document.createElement("p");
    p.textContent = summary;
    article.appendChild(p);

    const a = document.createElement("a");
    a.href = link;
    a.textContent = "Read more →";
    a.target = "_blank";
    article.appendChild(a);

    container.appendChild(article);
  }
});
