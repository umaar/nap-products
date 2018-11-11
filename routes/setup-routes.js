const config = require('../config/config');

const configureRoutes = {
	init(app) {
		/** ******* Products List API Routes ***********/
		const productListApiRoute = require(config.ROOT + '/routes/product-list');
		productListApiRoute.routes.init(app);

		/** ******* Product API Routes ***********/
		const productApiRoute = require(config.ROOT + '/routes/product');
		productApiRoute.routes.init(app);

		/** ******* All Product Names API Routes ***********/
		const productNamesApiRoute = require(config.ROOT + '/routes/product-names');
		productNamesApiRoute.routes.init(app);

		/** ******* Landing Page Routes ***********/
		const landingPageRoute = require(config.ROOT + '/routes/landing-page');
		landingPageRoute.routes.init(app);

		/** ******* Product Page Routes ***********/
		const productPageRoute = require(config.ROOT + '/routes/product-page');
		productPageRoute.routes.init(app);
	}
};

module.exports = {configureRoutes};
