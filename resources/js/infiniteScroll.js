import $ from './vendor/jquery-3.0.0.min.js';
import templates from './templates.js';
import sortProducts from './sort.js';

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

export default handleInfiniteScroll;