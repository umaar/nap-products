import $ from './vendor/jquery-3.0.0.min.js';

const sortingStrategies = {};

function getProductPrice(el) {
	return parseInt(el.text().slice(1));
}

sortingStrategies['?sort=price&order=asc'] = (el1, el2) => {
	const price1 = getProductPrice($(el1).find('h5'));
	const price2 = getProductPrice($(el2).find('h5'));
	if (price1 < price2) {
		return -1;
	}
	if (price1 > price2) {
		return 1;
	}
	return 0;
};

sortingStrategies['?sort=price&order=desc'] = (el1, el2) => {
	const price1 = getProductPrice($(el1).find('h5'));
	const price2 = getProductPrice($(el2).find('h5'));
	if (price1 > price2) {
		return -1;
	}
	if (price1 < price2) {
		return 1;
	}
	return 0;
};

function sortProducts() {
	const activeSort = $('.product-list-sort-active');
	if (!activeSort.length) {
		return;
	}

	const sortingKey = activeSort.attr('data-url');
	const productList = $('.product-list');
	const sorter = sortingStrategies[sortingKey];
	const sortedProductList = productList.find('li').sort(sorter);

	productList.empty().append(sortedProductList);
}

export default sortProducts;
