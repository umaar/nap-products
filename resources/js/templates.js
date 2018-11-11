module.exports.filterMessage = Handlebars.template({1(container, depth0, helpers, partials, data) {
	let helper; const alias1 = depth0 != null ? depth0 : (container.nullContext || {}); const alias2 = helpers.helperMissing; const alias3 = 'function'; const
		alias4 = container.escapeExpression;

	return '	<p class="filter-message">\n		<strong>' +
    alias4(((helper = (helper = helpers.resultCount || (depth0 != null ? depth0.resultCount : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {name: 'resultCount', hash: {}, data}) : helper))) +
    '</strong> results displayed. Total: <strong>' +
    alias4(((helper = (helper = helpers.totalProductListCount || (depth0 != null ? depth0.totalProductListCount : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {name: 'totalProductListCount', hash: {}, data}) : helper))) +
    '</strong>\n	</p>\n';
}, compiler: [7, '>= 4.0.0'], main(container, depth0, helpers, partials, data) {
	let stack1;

	return ((stack1 = helpers.if.call(depth0 != null ? depth0 : (container.nullContext || {}), (depth0 != null ? depth0.activeFilter : depth0), {name: 'if', hash: {}, fn: container.program(1, data, 0), inverse: container.noop, data})) != null ? stack1 : '');
}, useData: true});
module.exports.pageHead = Handlebars.template({compiler: [7, '>= 4.0.0'], main(container, depth0, helpers, partials, data) {
	let stack1;

	return '<head>\n	<title>' +
    container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.metadata : depth0)) != null ? stack1.title : stack1), depth0)) +
    '</title>\n	<meta name="viewport" content="width=device-width, initial-scale=1">\n	<link rel="stylesheet" href="/css/main.css">\n</head>';
}, useData: true});
module.exports.productItemList = Handlebars.template({1(container, depth0, helpers, partials, data) {
	let stack1;

	return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.image : depth0)) != null ? stack1.outfit : stack1), depth0));
}, 3(container, depth0, helpers, partials, data) {
	let stack1;

	return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.images : depth0)) != null ? stack1.small : stack1), depth0));
}, compiler: [7, '>= 4.0.0'], main(container, depth0, helpers, partials, data) {
	let stack1; let helper; const alias1 = depth0 != null ? depth0 : (container.nullContext || {}); const alias2 = helpers.helperMissing; const alias3 = 'function'; const
		alias4 = container.escapeExpression;

	return '<li class="product-list-item">\n	<a href="' +
    alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {name: 'url', hash: {}, data}) : helper))) +
    '">\n		<img src="\n		' +
    ((stack1 = helpers.if.call(alias1, (depth0 != null ? depth0.image : depth0), {name: 'if', hash: {}, fn: container.program(1, data, 0), inverse: container.program(3, data, 0), data})) != null ? stack1 : '') +
    '" alt="' +
    alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {name: 'name', hash: {}, data}) : helper))) +
    '">\n	</a>\n\n	<a href="' +
    alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {name: 'url', hash: {}, data}) : helper))) +
    '" class="product-list-item-details">\n		<h4>' +
    alias4(((helper = (helper = helpers.designer || (depth0 != null ? depth0.designer : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {name: 'designer', hash: {}, data}) : helper))) +
    '</h4>\n		<h3>' +
    alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {name: 'name', hash: {}, data}) : helper))) +
    '</h3>\n		<h5>' +
    alias4(((helper = (helper = helpers.price || (depth0 != null ? depth0.price : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, {name: 'price', hash: {}, data}) : helper))) +
    '</h5>\n	</a>\n</li>';
}, useData: true});
module.exports.scripts = Handlebars.template({compiler: [7, '>= 4.0.0'], main(container, depth0, helpers, partials, data) {
	return '<script src="/js/handlebars.runtime.min.js"></script>\n<script src="/js/main.js"></script>';
}, useData: true});
