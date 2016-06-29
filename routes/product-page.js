var config = require('../config/config')
var request = require('request');
var _ = require('lodash');
const slug = require('slug');
const mainUrl = '/';
const getProductUrl = require('../utilities/getProductUrl');

function onProductApiResponse(req, res, product, requestedSlug) {
    if (product.error) {
        console.error('Product not found', product);

        return res.status(404).send(`
            Sorry, product not found! <a href="/">Home Page</a>
        `);
    }

    const expectedSlug = slug(product.name);

    if (expectedSlug !== requestedSlug) {
        const redirectUrl = getProductUrl(product);
        return res.redirect(redirectUrl);
    }

    const productPageData = {
        metadata: {
            title: `${product.name} by ${product.designer}`
        },
        title: '`${product.name} by ${product.designer}`',
        layout: 'layouts/default',
        template: 'product',
        product
    };

    res.render('product', productPageData);
}

var routes = {
    init(app) {
        app.get('/product/:id', (req, res, next) => {
            const id = req.params.id;
            const requestedId = parseInt(id.split('-')[0]);

            if (!id) {
                return res.redirect('/');
            }

            const requestedSlug = id.replace(requestedId + '-', '');
            const apiUrl = `http://127.0.0.1:3000/api/product/${requestedId}`;

            request(apiUrl, (error, response, body) => {
                let product;

                if (error || !body) {
                    console.error('Error fetching product details', error);
                    res.status(503);
                }

                try {
                    product = JSON.parse(body);
                } catch (e) {
                    console.error('Error parsing ', body, ' as JSON');
                    res.status(503);
                }

                if (product) {
                    onProductApiResponse(req, res, product, requestedSlug);
                }
            });
        });

    }
};

module.exports = { routes };