
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

		window.addEventListener("awesomplete-selectcomplete", ({text}) => {
			location.href = `/product/` + text.value;
		}, false);
	});

	handleDesignerFilter();
}

$(start);