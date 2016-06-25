var config = require('../config/config')
var request = require('request');
var _ = require('lodash');
const slug = require('slug');
const mainUrl = '/';

var routes = {
    init(app) {
        app.get('/product/:id', (req, res, next) => {
            const requestedId = parseInt(req.params.id.split('-')[0]);

            if (!requestedId) {
                return res.redirect(redirectUrl);
            }

            const requestedSlug = req.params.id.replace(requestedId + '-', '');

            request(`http://127.0.0.1:3000/api/product/${requestedId}`, (error, response, body) => {
                const product = JSON.parse(body);
                if (product.error) {
                    console.error('Product not found', product);

                    // TODO: something nicer here
                    return res.status(404).send('Sorry, product not found!');
                }
                const expectedSlug = slug(product.name);

                if (expectedSlug !== requestedSlug) {
                    const redirectUrl = `/product/${product.id}-${expectedSlug}`;
                    return res.redirect(redirectUrl);
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