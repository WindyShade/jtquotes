$(document).ready(function () {

	function updateQuote() {
		$.get("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=",
			function(data) {
				// console.log(data);
				var aQuote = data[0];
				$(".header h1").html(aQuote.content);
				$(".header h2").html("——"+aQuote.title);
			});
	}

	var clock = $('.clock').FlipClock({
		clockFace: 'TwentyFourHourClock'
	});

	updateQuote();

	function openAllBookmarks() {
		chrome.bookmarks.getSubTree("95", function(results) {
			// console.log(results[0]);

			var bookmarks = results[0].children;
			bookmarks.forEach(function (bookmark, i, array){
				var url = bookmark.url;
				console.log(url);

				var hasUnopennedTab = false;
				chrome.tabs.query({ url: url }, function(results) {

					var isActive = false;

			    	if (results.length == 0) {
			    		if (!hasUnopennedTab) {
			    			isActive = true;
				    		hasUnopennedTab = true;	
			    		}
			    		
			    		chrome.tabs.create({active: isActive, url: url });
			    	}
			    });

				if (i == bookmarks.length-1) {
					chrome.tabs.getCurrent(function(tab) {
						chrome.tabs.remove(tab.id);
					});
				}
			});
		});
	}

	// $(document).bind('keydown', 'ctrl+j', openAllBookmarks);
	// $('#btn-go').click(openAllBookmarks);
	$(document).bind('keydown', 't', openAllBookmarks);
});