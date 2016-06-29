const config = require('../config/config');

var configureRoutes = {
    init(app) {
        /********* Products List API Routes ***********/
        var productListApiRoute = require(config.ROOT + '/routes/product-list');
        productListApiRoute.routes.init(app);

        /********* Product API Routes ***********/
        var productApiRoute = require(config.ROOT + '/routes/product');
        productApiRoute.routes.init(app);

        /********* All Product Names API Routes ***********/
        var productNamesApiRoute = require(config.ROOT + '/routes/product-names');
        productNamesApiRoute.routes.init(app);

        /********* Landing Page Routes ***********/
        var landingPageRoute = require(config.ROOT + '/routes/landing-page');
        landingPageRoute.routes.init(app);

        /********* Product Page Routes ***********/
        var productPageRoute = require(config.ROOT + '/routes/product-page');
        productPageRoute.routes.init(app);
    }
};

module.exports = { configureRoutes };