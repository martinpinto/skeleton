// DOM Ready =============================================================
// TODO: Component based React JS
var quotes;
// Functions =============================================================

// Fill table with data
// jQuery AJAX call for JSON
$(document).ready(function () {
    $.getJSON("http://localhost:3000/api/v1/quotes?callback=?", {
      jsonp: "jsonp"
    }, function (data) {
      quotes = '';

      if (data != null && data.length != 0) {
        $.each(data, function(){
          quotes += '<div class="quote box-shadow">';
          quotes += '<div class="quote-header">';
          quotes += this._source.data.message;
          quotes += '</div>';
          quotes += '<div class="quote-subheader">';
          quotes += this._source.data.topic;
          quotes += '</div>';
          quotes += '<div class="quote-content">';
          quotes += '</div>';
          //quotes += this._source.data.hashtags;
          quotes += '<div class="quote-decision">';
          quotes += 'Agree | Disagree | Unsure';
          quotes += '</div>'; // .quote-header
          quotes += '</div>'; // .quote box-shadow
        });
        // Inject the whole content string into our existing HTML table
        $('#quotesList').html(quotes);
      }

    }).error(function (data) {
      alert("responseJSON: " + data.responseJSON + " status: " + data.status + " statusText: " + data.statusText);
      console.log("responseJSON: " + data.responseJSON + " status: " + data.status + " statusText: " + data.statusText);
    });
});
