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

  fetch('https://www.fisheries.noaa.gov/news-and-announcements/news')
    .then(response => response.json())
    .then(data => {
      if (!data || !data.features || data.features.length === 0) {
        headline.textContent = 'No articles found';
        abstract.textContent = '';
        image.style.display = 'none';
        link.removeAttribute('href');
        return;
      }

      const latest = data.features[0];
      const title = latest.properties.title || 'Untitled';
      const summary = latest.properties.summary || 'No summary available.';
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
      console.error('Error fetching NOAA data:', error);
      headline.textContent = 'Error loading article';
      abstract.textContent = '';
      image.style.display = 'none';
      link.removeAttribute('href');
    });
});

