const newsApp = {};

newsApp.apiKey = 'e32b1ccf9b2e4d5b863a679c47ea4f0e';
newsApp.articleNumber = 4;
newsApp.articlesArray = [];

newsApp.getHeadlines = () => {
  $.ajax({
    url: 'http://proxy.hackeryou.com',
    dataType: 'json',
    method: 'GET',
    data: {
      reqUrl: 'https://newsapi.org/v2/top-headlines',
      params: {
        apiKey: newsApp.apiKey,
        country: 'ca',
        pageSize: newsApp.articleNumber
      }
    }
  }).then(function (result) {
    newsApp.articlesArray = result.articles;
    newsApp.displayArticles();
  })
}

newsApp.getNewsByCategory = (category) => {
  $.ajax({
    url: 'http://proxy.hackeryou.com',
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
  if (article.urlToImage == null) {
    $(`#image${i}`).attr('src', './images/news.png');
  } else {
    $(`#image${i}`).attr('src', article.urlToImage);
  }
  $(`#image${i}`).attr('alt', article.title);
}

newsApp.displayDescription = (i, article) => {
  $(`#desc${i}`).html(article.description);
}

newsApp.displayLink = (i, article) => {
  $(`#link${i}`).attr('href', article.url);
}

newsApp.registerListeners = () => {
  $('button').on('click', function(){
    const thisId = $(this).attr('id');
    //console.log(thisId);
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
      newsApp.getHeadlines();
      $('h2').html("Today's Top Headlines");
    }
    $('.buttonSelected').removeClass('buttonSelected');
    $(this).addClass('buttonSelected');
  })

  // $('#button1').click(function () {
  //   newsApp.getNewsByCategory('technology');
  //   $('h2').html("Today's Technology Headlines");
  // });
  // $('#button2').click(function () {
  //   newsApp.getNewsByCategory('business');
  //   $('h2').html("Today's Business Headlines");
  // });
  // $('#button3').click(function () {
  //   newsApp.getNewsByCategory('health');
  //   $('h2').html("Today's Health Headlines");
  // });
  // $('#button4').click(function () {
  //   newsApp.getHeadlines();
  //   $('h2').html("Today's Top Headlines");
  // });
}

newsApp.init = () => {
  newsApp.getHeadlines();
  newsApp.registerListeners();
}

$(function() {
  newsApp.init();
})