function start() {
	console.log('ready');

	const productCache = new Map();

	function addIndividualProductToList(id) {
		const template = Handlebars.templates['productItemList.hbs'];
		const liveSearchClass = 'product-list-item-live-search';

		function renderListItem(data) {
			const html = $(template(data)).addClass(liveSearchClass);
			const existingLiveSearchProduct = $('.' + liveSearchClass);
			if (existingLiveSearchProduct.length) {
				existingLiveSearchProduct.replaceWith(html)
			} else {
				$('.product-list').prepend(html);
			}
		}

		if (productCache.has(id)) {
			renderListItem(productCache.get(id));
		} else {
			$.getJSON('/api/product/' + id, res => {
				productCache.set(id, res);
				renderListItem(res);
			});
		}
	}

	$.getJSON('http://localhost:3000/api/all-product-names', response => {
		var input = document.querySelector('input.product-search');
		const autocomplete = new Awesomplete(input, {
			minChars: 1,
			maxItems: 40,
			list: response.data,
		});

		window.addEventListener("awesomplete-highlight", ({text}) => {
			addIndividualProductToList(text.value)
		}, false);

		window.addEventListener("awesomplete-select", ({text}) => {
			addIndividualProductToList(text.value)
		}, false);
	});

	
}

$(start);