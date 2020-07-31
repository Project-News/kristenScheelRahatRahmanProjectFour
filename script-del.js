const newsApp = {};

newsApp.apiKey = 'e32b1ccf9b2e4d5b863a679c47ea4f0e';
newsApp.headlinesArray = [];
newsApp.imagesArray = [];
newsApp.descriptionArray = [];
newsApp.linksArray = [];

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
                pageSize: 4
            }
        }
    }).then(function (result) {
        const apiResponse = result;
        console.log(result);
        // for (let i = 0; i < 4; i++) {
        //   newsApp.headlinesArray.push(result.articles[i].title);
        //   newsApp.imagesArray.push(result.articles[i].urlToImage);
        //   newsApp.descriptionArray.push(result.articles[i].description);
        //   newsApp.linksArray.push(result.articles[i].url);
        // }
        // newsApp.displayHeadlines();
        // newsApp.displayImages();
        // newsApp.displayDescription();
        // newsApp.displayLinks();
        newsApp.getNews(apiResponse, 'button4');
    })
}

newsApp.getCategoryHeadlines = (category) => {
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
                //use pageSize variable
                pageSize: 4
            }
        }
    }).then(function (result) {
        console.log(result);
        const apiResponse = result;
        newsApp.getNews(apiResponse, '');
    })
}

newsApp.getNews = (result, thisID) => {
    for (let i = 0; i < 4; i++) {
        newsApp.headlinesArray.push(result.articles[i].title);
        newsApp.imagesArray.push(result.articles[i].urlToImage);
        newsApp.descriptionArray.push(result.articles[i].description);
        newsApp.linksArray.push(result.articles[i].url);
    }
    newsApp.displayFunctions(thisID);
    // newsApp.displayHeadlines(0, 4);
    // newsApp.displayImages(0, 4);
    // newsApp.displayDescription(0, 4);
    // newsApp.displayLinks(0, 4);
}

newsApp.displayFunctions = (thisID) => {
    if (thisID === 'button1') {
        newsApp.displayHeadlines(4, 8);
        newsApp.displayImages(4, 8);
        newsApp.displayDescription(4, 8);
        newsApp.displayLinks(4, 8);
    }
    if (thisID === 'button4') {
        console.log('button4');
        // newsApp.displayHeadlines(0, 4);
        // newsApp.displayImages(0, 4);
        // newsApp.displayDescription(0, 4);
        // newsApp.displayLinks(0, 4);
    }
}

newsApp.displayHeadlines = (start, end) => {
    //   const headlines = [];
    for (let i = start; i < end; i++) {
        //   headline[i] =  
        for (let j = 0; j < 4; j++) {
            $(`#heading${j}`).html(newsApp.headlinesArray[i]);
            console.log(newsApp.headlinesArray[i]);
        }
    }
}

newsApp.displayImages = (start, end) => {
    for (let i = start; i < end; i++) {
        $(`#image${i}`).attr('src', newsApp.imagesArray[i]);
        $(`#image${i}`).attr('alt', newsApp.headlinesArray[i]);
    }
}

newsApp.displayDescription = (start, end) => {
    for (let i = start; i < end; i++) {
        $(`#desc${i}`).html(newsApp.descriptionArray[i]);
    }
}

newsApp.displayLinks = (start, end) => {
    for (let i = start; i < end; i++) {
        $(`#link${i}`).attr('href', newsApp.linksArray[i]);
    }
}

newsApp.eventListener = function () {
    $('button').on('click', function () {
        const thisID = $(this).attr('id');
        // console.log(thisID);
        if (thisID === 'button1') {
            console.log(thisID);
            // newsApp.getCategoryHeadlines('technology');
            newsApp.displayFunctions('button1');
        }
    })
}

newsApp.init = () => {
    newsApp.getHeadlines();

    newsApp.getCategoryHeadlines('technology');
    newsApp.eventListener();
}

$(function () {
    newsApp.init();
})