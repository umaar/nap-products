var config = require('../config/config')
const slug = require('slug');

// Mock API using fixture so we're not dependent on network connectivity
var allProducts = require(config.ROOT +'/fixtures/products.json').data;

var routes = {
    init(app) {

        app.get('/api/all-product-names', function (req, res, next) {
            res.json({
                total: allProducts.length,
                data:  allProducts.map(product => {
                    return {
                        label: product.name.en,
                        value: product.id
                    };
                })
            })

        })

    }
};



module.exports = { routes };