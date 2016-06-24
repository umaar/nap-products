var config = require('../config/config')
var request = require('request');
var _ = require('lodash');
const slug = require('slug')

var routes = {
    init(app) {
        app.get('/product/:id', (req, res, next) => {
            if (!req.params.id) {
                // redirect
            }

            const requestedId = parseInt(req.params.id.split('-')[0]);
            console.log(requestedId);

            request(`http://127.0.0.1:3000/api/product/${requestedId}`, (error, response, body) => {

                const product = JSON.parse(body);
                const expectedSlug = product.name;

                if (expectedSlug !== requestedSlug) {
                    const redirectUrl = `/product/${product.id}-${slug(product.name)}`;
                }

                res.render('product', {
                    metadata: {
                        title: `${product.name} by ${product.designer}`
                    },
                    title: 'NAP Tech Test',
                    layout: 'layouts/default',
                    template: 'product',
                    product
                });
            });
        });

    }
};

module.exports = { routes };