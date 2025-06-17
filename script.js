//this is the JS file that will house the backend for the APIs
const today = new Date();
const day = today.getDate();
const month = today.getMonth()+1;
const year = today.getFullYear();

const tagline = document.getElementById("tagline");

tagline.innerText = `${month}-${day}-${year}`; 

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    document.getElementById('article1').innerHTML =
      'latitude: ' + position.coords.latitude +
      '<br>longitude: ' + position.coords.longitude;
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const headline = document.getElementById('article2-headline');
  const abstract = document.getElementById('article2');
  const image = document.getElementById('art2');
  const link = document.getElementById('article2-link');

  if (!headline || !abstract || !image || !link) return;

  fetch('https://api.semanticscholar.org/graph/v1/paper/search
  ?query=shark
  &year=2025
  &openAccessPdf=true
  &fields=title,authors,abstract,year
  &limit=1')
    .then(response => response.json())
    .then(data => {
      if (!data || !data.features || data.features.length === 0) {
        headline.textContent = 'No articles found';
        abstract.textContent = '';
        image.style.display = 'none';
        link.removeAttribute('href');
        return;
      }

      const latest = data.paperId[0];
      const title = latest.properties.title || 'Untitled';
      const summary = latest.properties.abstract || 'No abstract available.';
      const imgUrl = latest.properties.image || null;
      const articleUrl = latest.properties.url || '#';

      headline.textContent = title;
      abstract.textContent = summary;
      link.href = articleUrl;

      if (imgUrl) {
        image.src = imgUrl;
        image.alt = title;
        image.style.display = 'block';
      } else {
        image.style.display = 'none';
      }
    })
    .catch(error => {
      console.error('Error fetching Shark research data:', error);
      headline.textContent = 'Error loading article';
      abstract.textContent = '';
      image.style.display = 'none';
      link.removeAttribute('href');
    });
});

document.addEventListener('DOMContentLoaded', function () {
  const headline = document.getElementById('article3-headline');
  const abstract = document.getElementById('article3');
  const image = document.getElementById('art3');
  const link = document.getElementById('article3-link');

  if (!headline || !abstract || !image || !link) return;

  fetch('https://gnews.io/api/v4/search?q=new%20video%20games&lang=en&max=1&token=YOUR_API_KEY')
    .then(response => response.json())
    .then(data => {
      if (!data || !data.articles || data.articles.length === 0) {
        headline.textContent = 'No articles found';
        abstract.textContent = '';
        image.style.display = 'none';
        link.removeAttribute('href');
        return;
      }

      const article = data.articles[0];
      const title = article.title || 'Untitled';
      const summary = article.description || 'No summary available.';
      const imgUrl = article.image || null;
      const articleUrl = article.url || '#';

      headline.textContent = title;
      abstract.textContent = summary;
      link.href = articleUrl;

      if (imgUrl) {
        image.src = imgUrl;
        image.alt = title;
        image.style.display = 'block';
      } else {
        image.style.display = 'none';
      }
    })
    .catch(error => {
      console.error('Error fetching gaming news:', error);
      headline.textContent = 'Error loading article';
      abstract.textContent = '';
      image.style.display = 'none';
      link.removeAttribute('href');
    });
});
