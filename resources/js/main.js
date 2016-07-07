
// import 'babel-polyfill';
import UAParser from './ua-parser.min.js';
import $ from './jquery-3.0.0.min.js';
import Awesomplete from './Awesomplete.min.js';
import templates from './templates.js';

const productCache = new Map();

function getProductPrice(el) {
	return parseInt(el.text().slice(1));
}

const sortingStrategies = {};
sortingStrategies['?sort=price&order=asc'] = (el1, el2) => {
	const price1 = getProductPrice($(el1).find('h5'));
	const price2 = getProductPrice($(el2).find('h5'));
	if (price1 < price2) return -1;
	if (price1 > price2) return 1;
	return 0;
};

sortingStrategies['?sort=price&order=desc'] = (el1, el2) => {
	const price1 = getProductPrice($(el1).find('h5'));
	const price2 = getProductPrice($(el2).find('h5'));
	if (price1 > price2) return -1;
	if (price1 < price2) return 1;
	return 0;
};

function sortProducts() {
	const activeSort = $('.product-list-sort-active');
	if (!activeSort.length) return;

	const sortingKey = activeSort.attr('data-url');
	const productList = $('.product-list');
	const sorter = sortingStrategies[sortingKey];
	const sortedProductList = productList.find('li').sort(sorter);

	productList.empty().append(sortedProductList);
}

window.sortProducts = sortProducts;

function onScrollToBottom() {
	if ($('.product-list-designer-filter input').is(':checked')) {
		return;
	}

	const productList = $('.product-list');
	const limit = parseInt(productList.attr('data-limit'));
	const offset = parseInt(productList.attr('data-offset'));
	const newOffset = offset + limit;
	const url = `http://127.0.0.1:3000/api/products?offset=${newOffset}&limit=${limit}`;

	productList.attr('data-offset', newOffset);

	$.getJSON(url).then(response => {
		if (!response) return;

		const template = templates['productItemList'];
		const html = response.data.map(productItem => template(productItem)).join(' ');
		productList.append(html);
		sortProducts();
	});
}

function handleInfiniteScroll() {
	$(window).scroll(() => {
			let innerHeight = window.innerHeight;
			let scrollHeight = document.body.scrollHeight;
			let scrollY = window.scrollY;

		    if ((innerHeight + scrollY) >= scrollHeight) {
		    	onScrollToBottom()
		    }
	});
}

function readDesignerFilterData() {
	const designersToFilter = new Set();
	const productListLi = $('.product-list li')

	$('.product-list-designer-filter input').each((evt, elm) => {
		const isChecked = $(elm).is(':checked');
		const designer = $(elm).val();

		if (isChecked) {
			designersToFilter.add(designer);
		} else {
			designersToFilter.delete(designer);
		}
	});

	let filteredProducts;

	if (designersToFilter.size) {
		filteredProducts = productListLi.filter((index, elm) => {
			const currentDesigner = $(elm).find('h4').text();
			return designersToFilter.has(currentDesigner);
		});

		productListLi.show();
		productListLi.not(filteredProducts).hide();
	} else {
		productListLi.show();
	}

	$('.filter-message').remove();

	if (filteredProducts && filteredProducts.length) {
		const template = templates['filterMessage'];
		const html = template({
			activeFilter: designersToFilter.size > 0,
			resultCount: filteredProducts.length,
			totalProductListCount: productListLi.length
		});

		$('.product-list').prepend(html);
	}
}

function handleDesignerFilter() {
	$('.product-list-designer-filter input').change(readDesignerFilterData);
	readDesignerFilterData();
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

function addIndividualProductToList(id) {
	console.log(Handlebars, templates);
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

function start() {
	enableAutocomplete();
	handleDesignerFilter();
	handleInfiniteScroll();
	const parser = new UAParser();
	const browserName = parser.getBrowser().name;
	if (browserName !== 'Chrome') {
		$('.unsupported-message').fadeIn();
	}
}
$(start);





