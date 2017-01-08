$(document).ready(function startGenerator() {

  var quoteKey = Math.floor((Math.random() * 100000) + 1);

  function getQuote() {
    var quoteKey = Math.floor((Math.random() * 100000) + 1);
    var url = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&key=' + quoteKey + '&jsonp=?';
    $.getJSON(url).done(function(data) {
      var encoded, quoteText, quoteAuthor;
      //encoded, icon;
      quoteText = data.quoteText;
      quoteAuthor = data.quoteAuthor;
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

    });

  }

  getQuote();

  $('button#newQuote').click(function() {
    getQuote();
  });

});
