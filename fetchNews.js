// fetchNews.js
// Exemple d'appel à l'API NewsAPI.org pour récupérer les news en français
document.addEventListener('DOMContentLoaded', function() {
  const newsContainer = document.getElementById('news-container');
  const apiKey = 'YOUR_API_KEY';  // Remplacez YOUR_API_KEY par votre clé API NewsAPI.org
  const url = `https://newsapi.org/v2/top-headlines?country=fr&apiKey=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'ok' && data.articles) {
        data.articles.forEach(article => {
          const articleDiv = document.createElement('div');
          articleDiv.className = 'article';
          articleDiv.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description || ''}</p>
            <a href="${article.url}" target="_blank">Lire la suite</a>
          `;
          newsContainer.appendChild(articleDiv);
        });
      } else {
        newsContainer.innerHTML = '<p>Aucune actualité trouvée.</p>';
      }
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des news:', error);
      newsContainer.innerHTML = '<p>Erreur lors du chargement des news.</p>';
    });
});
