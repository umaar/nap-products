const _ = require('lodash');
const slug = require('slug');
const config = require('../config/config');

// Mock API using fixture so we're not dependent on network connectivity
const allProducts = require(config.ROOT + '/fixtures/products.json').data;

const routes = {
	init(app) {
		// Get product specific details
		app.get('/api/product/:id', (req, res, next) => {
			const requestedId = Number(req.params.id);
			const productObj = _.find(allProducts, {id: requestedId});

			let body;

			if (productObj) {
				body = {
					id: productObj.id,
					name: productObj.name.en,
					price: '£' + productObj.price.gross / productObj.price.divisor,
					designer: productObj.brand.name.en,
					onSale: productObj.onSale,
					sizes: productObj.saleableStandardSizes,
					badges: productObj.badges,
					images: {
						outfit: '//cache.net-a-porter.com/images/products/' + productObj.id + '/' + productObj.id + '_ou_sl.jpg',
						small: '//cache.net-a-porter.com/images/products/' + productObj.id + '/' + productObj.id + '_in_sl.jpg',
						large: '//cache.net-a-porter.com/images/products/' + productObj.id + '/' + productObj.id + '_in_pp.jpg'
					}

				};
				body.url = `/product/${body.id}-${slug(body.name)}`;
			} else {
				body = {error: 'pid not found'};
			}

			res.json(body);
		});
	}
};

module.exports = {
	routes
};
