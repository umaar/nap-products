const slug = require('slug');
const config = require('../config/config');

// Mock API using fixture so we're not dependent on network connectivity
const allProducts = require(config.ROOT + '/fixtures/products.json').data;

const routes = {
	init(app) {
		app.get('/api/all-product-names', (req, res, next) => {
			res.json({
				total: allProducts.length,
				data: allProducts.map(product => {
					return {
						label: product.name.en,
						value: product.id
					};
				})
			});
		});
	}
};

module.exports = {routes};
