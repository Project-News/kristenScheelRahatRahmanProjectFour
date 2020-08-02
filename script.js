const newsApp = {};

newsApp.apiKey = 'e32b1ccf9b2e4d5b863a679c47ea4f0e';
newsApp.articleNumber = 4;
newsApp.articlesArray = [];

newsApp.getNewsByCategory = (category) => {
  $.ajax({
    url: 'https://proxy.hackeryou.com',
    dataType: 'json',
    method: 'GET',
    data: {
      reqUrl: 'https://newsapi.org/v2/top-headlines',
      params: {
        apiKey: newsApp.apiKey,
        country: 'ca',
        category: category,
        pageSize: newsApp.articleNumber
      }
    }
  }).then(function (result) {
    newsApp.articlesArray = result.articles;
    newsApp.displayArticles();
  })
}

newsApp.displayArticles = () => {
  for (let i = 0; i < newsApp.articleNumber; i++) {
    newsApp.displayHeadline(i, newsApp.articlesArray[i]);
    newsApp.displayImage(i, newsApp.articlesArray[i]);
    newsApp.displayDescription(i, newsApp.articlesArray[i]);
    newsApp.displayLink(i, newsApp.articlesArray[i]);
  }
}

newsApp.displayHeadline = (i, article) => {
  $(`#heading${i}`).html(article.title);
}

newsApp.displayImage = (i, article) => {
  if (article.urlToImage === null) {
    $(`#image${i}`).attr('src', './images/youTube.png');
    $(`#image${i}`).attr('alt', 'placeholder YouTube image');
  } else {
    $(`#image${i}`).attr('src', article.urlToImage);
    $(`#image${i}`).attr('alt', article.title);
  }
}

newsApp.displayDescription = (i, article) => {
  $(`#desc${i}`).html(article.description);
}

newsApp.displayLink = (i, article) => {
  if (article.urlToImage === null) {
    $(`#link${i}`).html('YouTube Video');
  } else {
    $(`#link${i}`).html('Read More');
  }
  $(`#link${i}`).attr('href', article.url);
}

newsApp.registerListeners = () => {
  $('button').on('click', function() {
    $('.buttonSelected').removeClass('buttonSelected');
    $(this).addClass('buttonSelected');
    const thisId = $(this).attr('id');

    if (thisId === 'button1') {
      newsApp.getNewsByCategory('technology');
      $('h2').html("Today's Technology Headlines");
    } 
    if (thisId === 'button2') {
      newsApp.getNewsByCategory('business');
      $('h2').html("Today's Business Headlines");
    }
    if (thisId === 'button3') {
      newsApp.getNewsByCategory('health');
      $('h2').html("Today's Health Headlines");
    }
    if (thisId === 'button4') {
        newsApp.getNewsByCategory('');
        $('h2').html("Today's Latest Headlines");
    }
  })
}

newsApp.init = () => {
  newsApp.getNewsByCategory('');
  newsApp.registerListeners();
}

$(function() {
  newsApp.init();
})