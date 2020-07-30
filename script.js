const newsApp = {};

newsApp.apiKey = 'e32b1ccf9b2e4d5b863a679c47ea4f0e';
newsApp.headlinesArray = [];

newsApp.getHeadlines = () => {
  //NewsAPI
  $.ajax({
    url: 'http://proxy.hackeryou.com',
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
    }
    newsApp.displayHeadlines();
  })
}

newsApp.displayHeadlines = () => {
  for (let i = 0; i < 4; i++) {
    $(`#${i}`).html(newsApp.headlinesArray[i]);
  }
}

newsApp.init = () => {
  newsApp.getHeadlines();
}

$(function() {
  newsApp.init();
})