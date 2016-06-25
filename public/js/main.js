function start() {
	console.log('ready');

	function addIndividualProductToList(id) {
		const liveSearchClass = 'product-list-item-live-search';
		$('.' + liveSearchClass).remove();
		const template = Handlebars.templates['productItemList.hbs'];
		$.getJSON('/api/product/' + id, res => {
			const html = $(template(res)).addClass(liveSearchClass);
			$('.product-list').prepend(html);
		});
	}

	$.getJSON('http://localhost:3000/api/all-product-names', response => {
		var input = document.querySelector('input.product-search');
		console.log(response.data[0]);
		const autocomplete = new Awesomplete(input, {
			minChars: 1,
			list: response.data
		});

		window.addEventListener("awesomplete-highlight", ({text}) => {
			addIndividualProductToList(text.value)
		}, false);
	})
}

$(start);