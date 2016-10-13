$(document).ready(function () {

	var current_quote = '';
	var current_author = '';

	var current_bg = '';
	var current_fg = '';


	getQuote();
	getColor();

	function getQuote() {
		$.ajax({
			headers: {
				"X-Mashape-Key": 'aO6Gl16Qpqmsh85QCVd1arknjnKpp1Yu2CYjsn3wo7U5s8wdcR',
				Accept: "application/json",
			    "Content-Type": "application/x-www-form-urlencoded"
			    },
		  	dataType: "json",
		  	url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
		  	success: function(response) {
      			var data = response;
      			current_quote = data.quote;
      			current_author = "- " + data.author;
				showQuote();
	        	getColor();
				setColor();
				setTwitterIntent();
      		}
		})
	}

	function showQuote() {
		$('.quote-text').animate({ opacity: 0}, 200, function() {
	          $(this).text(current_quote);
	          setTextColor(this, current_fg);
	          $(this).animate({ opacity: 1}, 500);
		});

		
		$('.quote-author').animate({ opacity: 0}, 200, function() {
				$(this).text(current_author);
	          	setTextColor(this, current_fg);
	          	$(this).animate({ opacity: 1}, 200);
	    });

		$('.tip-text').animate({ opacity: 0}, 200, function() {
	          	setTextColor(this, current_fg);
	          	$(this).animate({ opacity: 1}, 500);
	    });
	}

	function getColor() {
		current_bg = 'rgba('
            + (Math.floor(Math.random() * 256)) + ','
            + (Math.floor(Math.random() * 256)) + ','
            + (Math.floor(Math.random() * 256)) + ","
            + '0.3)';

		current_fg = colorOpacity(current_bg);

	}

	function setColor() {
		$('body').animate({backgroundColor: current_bg}, 500);
	}

	function setTextColor(element, color) {
		$(element).css('color', color);
	}

	function setTwitterIntent() {
		$('.tweet-link').attr('href', "https://twitter.com/intent/tweet?text=" + encodeURIComponent('"' + current_quote + '" ' + current_author)); 
	}

	function colorOpacity(rgb) {
		rgb = Array.prototype.join.call(arguments).match(/(-?[0-9\.]+)/g);
  		return 'rgb('
  			+ rgb[0] + ","
  			+ rgb[1] + ","
  			+ rgb[2] + ")";
  	}

  	$('.tip-text').click(function() {
  		getQuote();
  		getColor();
  	});

  	$(document).keypress(function(e) {
    	if(e.which == 13) {
        	getQuote();
    	}
	});

})