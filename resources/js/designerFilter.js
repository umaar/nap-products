import $ from './vendor/jquery-3.0.0.min.js';
import templates from './templates.js';

function readDesignerFilterData() {
	const designersToFilter = new Set();
	const productListLi = $('.product-list li');

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
		const template = templates.filterMessage;
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

export default handleDesignerFilter;
