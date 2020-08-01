const newsApp = {};

newsApp.apiKey = 'e32b1ccf9b2e4d5b863a679c47ea4f0e';
newsApp.headlinesArray = [];
newsApp.imagesArray = [];
newsApp.descriptionArray = [];
newsApp.linksArray = [];

newsApp.getHeadlines = () => {
  $.ajax({
    url: 'https://proxy.hackeryou.com',
    dataType: 'json',
    method: 'GET',
    data: {
      reqUrl: 'https://newsapi.org/v2/top-headlines',
      params: {
        apiKey: newsApp.apiKey,
        country: 'ca',
        pageSize: 4
      }
    }
  }).then(function (result) {
    console.log(result);
    for (let i = 0; i < 4; i++) {
      newsApp.headlinesArray.push(result.articles[i].title);
      newsApp.imagesArray.push(result.articles[i].urlToImage);
      newsApp.descriptionArray.push(result.articles[i].description);
      newsApp.linksArray.push(result.articles[i].url);
    }
    newsApp.displayHeadlines();
    newsApp.displayImages();
    newsApp.displayDescription();
    newsApp.displayLinks();
  })
}

newsApp.displayHeadlines = () => {
  for (let i = 0; i < 4; i++) {
    $(`#heading${i}`).html(newsApp.headlinesArray[i]);
  }
}

newsApp.displayImages = () => {
  for (let i = 0; i < 4; i++) {
    $(`#image${i}`).attr('src', newsApp.imagesArray[i]);
    $(`#image${i}`).attr('alt', newsApp.headlinesArray[i]);
  }
}

newsApp.displayDescription = () => {
  for (let i = 0; i < 4; i++) {
    $(`#desc${i}`).html(newsApp.descriptionArray[i]);
  }
}

newsApp.displayLinks = () => {
  for (let i = 0; i < 4; i++) {
    $(`#link${i}`).attr('href', newsApp.linksArray[i]);
  }
}

newsApp.init = () => {
  newsApp.getHeadlines();
}

$(function() {
  newsApp.init();
})