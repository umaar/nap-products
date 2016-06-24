var config = require('../config/config')
var request = require('request');
const slug = require('slug')

function processProducts(products) {
    const originalData = products.data;
    const data = originalData.map(product => {
        const url = `/product/${product.id}-${slug(product.name)}`;
        return Object.assign(product, {url});
    });

    return Object.assign(products, {data});
}

var routes = {
    init(app) {
        app.get('/', (req, res, next) => {
            request('http://127.0.0.1:3000/api/products', (error, response, body) => {
                const products = processProducts(JSON.parse(body));

                res.render('index', {
                    metadata: {
                        title: 'NAP Tech Test'
                    },
                    title: 'NAP Tech Test',
                    layout: 'layouts/default',
                    template: 'index',
                    products
                });
            });
        });

    }
};

module.exports = { routes };