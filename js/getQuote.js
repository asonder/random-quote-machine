$(document).ready(function loadQuote() {

    var quoteKey = Math.floor((Math.random() * 100000) + 1);
    var url = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&key=' + quoteKey;

    function getQuote() {

        $.getJSON(url).done(function(data) {
            var encoded, icon;
            var quoteText = data.quoteText;
            var quoteAuthor = data.quoteAuthor;
            $('blockquote#quote-text').text(quoteText);
            if (quoteAuthor.length) {
                quoteAuthor = '- ' + quoteAuthor;
            } else {
                quoteAuthor = '-Author unknown';
            }
              $('div#quote-author').text(quoteAuthor);

            if (quoteText.length > 140) {
                encoded = encodeURIComponent(quoteText.substr(0, 137) + '...');
            } else {
                encoded = encodeURIComponent(quoteText);
            }

            $('div#social').html('<a href="http://twitter.com/intent/tweet?text=' + encoded + '" target="_blank"><i class="fa fa-twitter fa-3x" aria-hidden="true"></i></a>');



        }).fail(function() {
          $('blockquote#quote-text').text('Sorry, quote could not be loaded.');

        }).always(function() {
          $('button#newQuote').on('submit', function(e) {
            e.preventDefault();
            getQuote();
          });

        });


    }



});
