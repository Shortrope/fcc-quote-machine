// TODO: convert to ES2016... use =>

$(document).ready(function () {

  var htmlContent = '',
    theQuote = '',
    theAuthor = '',
    theTweet = '',
    longerQuotes = [];

  // the tweet factory uses a raw js element
  var tweetBtnContainer = document.getElementById("tweet-container");

  function getQuote() {
    // variables
    var longerThan140 = true;

    $('#quote').css('visibility', 'hidden');


      // Ajax call
      $.ajax({
        method: "GET",
        url: "http://quotesondesign.com/wp-json/posts",
        data: {
          "filter[orderby]": "rand",
          "filter[posts_per_page]": 1
        },
        dataType: "json",
        cache: false,
        error: function (jqXHR, err) {
          console.log('Error');
        },
        success: function (data, status, jqXHR) {
          console.log('status: ' + status);
          console.log('data:');
          console.dir(data);

          // Get the quote text
          htmlContent = data[0].content.trim(); // trim trailing whitespace
          theQuote = htmlContent.substring(3, htmlContent.length - 4).trim(); // remove html 'p' tacs and a couple of spaces at the end

          // Get the author text
          theAuthor = data[0].title;

          // Create the Tweet content
          theTweet = '"' + theQuote + '" ' + theAuthor;
          console.log(theTweet.length);

          // Get another quote if tweet will contain too many chars
          if (theTweet.length > 132) { // subtract 8 chars for the hashtag '#quotes'
            getQuote();
            longerQuotes.push(theTweet.length);
          } else {
            tweetBtnContainer.innerHTML = '';
            twttr.widgets.createShareButton(
              ' ', tweetBtnContainer, {
                size: "large",
                text: theTweet,
                hashtags: "quotes",
              }
            );

            // Display quote and author
            $('#quote').html(htmlContent + '<p class="author">-' + theAuthor + '</p>');
            $('#quote').css('visibility', 'visible');
          }
          console.log(longerQuotes);
        },
        complete: function (jqXHR, status) {
          console.log('complete');
          console.log('status: ' + status);
          longerThan140 = false;
        },

      }); /* end $.ajax() */
  } /* end function getQuote */

  getQuote();
  $('#next-quote').on('click', getQuote);
});
