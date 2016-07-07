import templates from './templates.js';
import Awesomplete from './vendor/Awesomplete.min.js';
import $ from './vendor/jquery-3.0.0.min.js';

const productCache = new Map();

function addIndividualProductToList(id) {
	const template = templates['productItemList'];
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

function enableAutocomplete() {
	const apiUrl = 'http://localhost:3000/api/all-product-names';

	$.getJSON(apiUrl).then(response => {
		var input = $('input.product-search');

		const autocompleteConfig = {
			minChars: 1,
			maxItems: 40,
			list: response.data,
		};

		const autocomplete = new Awesomplete(input[0], autocompleteConfig);

		window.addEventListener("awesomplete-highlight", ({text}) =>
			addIndividualProductToList(text.value), false);

		window.addEventListener("awesomplete-select", ({text}) =>
			addIndividualProductToList(text.value), false);

		window.addEventListener("awesomplete-selectcomplete", ({text}) =>
			location.href = `/product/` + text.value, false);
	});
}

export default enableAutocomplete;