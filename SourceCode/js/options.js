$(document).ready(function () {
	$('.option-save-alert').hide();

	// Restore
	chrome.storage.sync.get({
		author: "",
		quote: ""

	}, function(items) {
		// Update status to let user know options were saved.
		$("#val-author").val(items.author);
		$("#val-quote").val(items.quote);
	});

	// Submit
	$("#option-form").submit(function(event){
		var author = $("#val-author").val();
		var quote = $("#val-quote").val();

		if ($.isEmptyObject(author)) {
			author = "";
		}
		if ($.isEmptyObject(quote)) {
			quote = "";
		}

		chrome.storage.sync.set({
			author: author,
			quote: quote

		}, function() {
			// Update status to let user know options were saved.
			$('.option-save-alert').fadeIn();
			window.setTimeout(function(){
				$('.option-save-alert').fadeOut();

			}, 2000);
		});

		event.preventDefault();
	});
});