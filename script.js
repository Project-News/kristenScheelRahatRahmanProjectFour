const newsApp = {};

newsApp.apiKey = 'e32b1ccf9b2e4d5b863a679c47ea4f0e';
newsApp.country = 'ca';
newsApp.articleNumber = 4;
newsApp.articlesArray = [];

newsApp.getNewsByCategory = (category, country) => {
  $.ajax({
    url: 'https://proxy.hackeryou.com',
    dataType: 'json',
    method: 'GET',
    data: {
      reqUrl: 'https://newsapi.org/v2/top-headlines',
      params: {
        apiKey: newsApp.apiKey,
        country: country,
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
      newsApp.getNewsByCategory('technology', newsApp.country);
      $('h2').html("Today's Technology Headlines");
    } 
    if (thisId === 'button2') {
      newsApp.getNewsByCategory('business', newsApp.country);
      $('h2').html("Today's Business Headlines");
    }
    if (thisId === 'button3') {
      newsApp.getNewsByCategory('health', newsApp.country);
      $('h2').html("Today's Health Headlines");
    }
    if (thisId === 'button4') {
        newsApp.getNewsByCategory('', newsApp.country);
        $('h2').html("Today's Latest Headlines");
    }
  })
}

newsApp.formListener = () => {
  $('form').on('change', function() {
    const selectedCountry = $('#country option:selected').text();
    if (selectedCountry === 'US 🇺🇸') {
        newsApp.country = 'us';
        $('#flag').attr('src', './images/american.png');
        $('#flag').attr('alt', 'american flag');
    } else if (selectedCountry === 'Canada 🇨🇦') {
        newsApp.country = 'ca';
        $('#flag').attr('src', './images/canadian.png');
        $('#flag').attr('alt', 'canadian flag');
    }
    newsApp.getNewsByCategory('', newsApp.country);
    $('.buttonSelected').removeClass('buttonSelected');
    $('#button4').addClass('buttonSelected');
    $('h2').html("Today's Latest Headlines");
  })
}

newsApp.init = () => {
  newsApp.getNewsByCategory('', newsApp.country);
  newsApp.registerListeners();
  newsApp.formListener();
}

$(function() {
  newsApp.init();
})