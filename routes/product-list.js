const config = require('../config/config');

// Mock API using fixture so we're not dependent on network connectivity
const allProducts = require(config.ROOT + '/fixtures/products.json').data;

const routes = {
	init(app) {
		app.get('/api/products', (req, res, next) => {
			const total = allProducts.length;
			const offset = parseInt(req.query.offset) || 0;
			const limit = parseInt(req.query.limit) || 60;
			if (offset > total) {
				return res.type('json').sendStatus(400);
			}

			res.json({
				offset,
				limit,
				total,
				data: allProducts.slice(offset, offset + limit).map(product => {
					// Simplify payload - more data available in fixture
					return {
						id: product.id,
						name: product.name.en,
						price: '£' + product.price.gross / product.price.divisor,
						designer: product.brand.name.en,
						image: {
							outfit: '//cache.net-a-porter.com/images/products/' + product.id + '/' + product.id + '_ou_sl.jpg'
						}
					};
				})
			});
		});
	}
};

module.exports = {
	routes
};
