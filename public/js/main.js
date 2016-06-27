const productCache = new Map();

function sortProducts() {
	const activeSort = $('.product-list-sort-active');
	if (activeSort.length) {
		const productList = $('.product-list');
		const sortedProductList = productList.find('li').sort((el1, el2) => {
			console.log('sorty');
			const price1 = parseInt($(el1).find('h5').text().slice(1));
			const price2 = parseInt($(el2).find('h5').text().slice(1));
			if (price1 < price2) return -1;
			if (price1 > price2) return 1;
			return 0;
		});
		productList.empty().append(sortedProductList);
		window.scrollTo(0, document.body.scrollHeight - 5000);
	}
}

function handleInfiniteScroll() {
	window.onscroll = function(ev) {
	    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
    		const productList = $('.product-list');
	    	if (!$('.product-list-designer-filter input').is(':checked')) {
	    		const limit = parseInt(productList.attr('data-limit'));
	    		const offset = parseInt(productList.attr('data-offset'));
	    		const newOffset = offset + limit;
	    		const url = `http://127.0.0.1:3000/api/products?offset=${newOffset}&limit=${limit}`;

	    		productList.attr('data-offset', newOffset);

	    		$.getJSON(url, response => {
	    			const template = Handlebars.templates['productItemList.hbs'];
	    			const html = response.data.map(productItem => template(productItem)).join(' ');
	    			productList.append(html);
	    			sortProducts();
	    		});
	    	}
	    }
	};
}

function handleDesignerFilter() {
	function readDesignerFilterData() {
		const designersToFilter = new Set();

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
			filteredProducts = $('.product-list li').filter((index, elm) => {
				const currentDesigner = $(elm).find('h4').text();
				return designersToFilter.has(currentDesigner);
			});

			$('.product-list li').show();

			$('.product-list li').not(filteredProducts).hide();
		} else {
			$('.product-list li').show();
		}

		$('.filter-message').remove();
		const template = Handlebars.templates['filterMessage.hbs'];
		const html = template({
			activeFilter: designersToFilter.size > 0,
			resultCount: filteredProducts.length,
			totalProductListCount: $('.product-list li').length
		});

		$('.product-list').prepend(html);
	}

	$('.product-list-designer-filter input').change(evt => {
		readDesignerFilterData();
	});
}

function enableAutocomplete() {
	$.getJSON('http://localhost:3000/api/all-product-names', response => {
		var input = document.querySelector('input.product-search');
		const autocomplete = new Awesomplete(input, {
			minChars: 1,
			maxItems: 40,
			list: response.data,
		});

		window.addEventListener("awesomplete-highlight", ({text}) =>
			addIndividualProductToList(text.value), false);

		window.addEventListener("awesomplete-select", ({text}) =>
			addIndividualProductToList(text.value), false);

		window.addEventListener("awesomplete-selectcomplete", ({text}) =>
			location.href = `/product/` + text.value, false);
	});
}

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

function start() {
	enableAutocomplete();
	handleDesignerFilter();
	handleInfiniteScroll();
}

$(start);