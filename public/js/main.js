(function() {
	const productCache = new Map();

	function sortProducts() {
		const activeSort = $('.product-list-sort-active');
		if (activeSort.length) {
			const productList = $('.product-list');
			const sortedProductList = productList.find('li').sort((el1, el2) => {
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

		$.getJSON(url, response => {
			const template = Handlebars.templates['productItemList.hbs'];
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
			const template = Handlebars.templates['filterMessage.hbs'];
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

		$.getJSON(apiUrl).then(({list}) => {
			var input = $('input.product-search');

			const autocompleteConfig = {
				minChars: 1,
				maxItems: 40,
				list,
			};

			const autocomplete = new Awesomplete(input, autocompleteConfig);

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
}());