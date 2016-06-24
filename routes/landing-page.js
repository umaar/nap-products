var config = require('../config/config')
var request = require('request');

var routes = {
    init(app) {
        app.get('/', (req, res, next) => {
            request('http://127.0.0.1:3000/api/products', (error, response, body) => {
                res.render('index', {
                    metadata: {
                        title: 'NAP Tech Test'
                    },
                    title: 'NAP Tech Test',
                    layout: 'layouts/default',
                    template: 'index',
                    products: JSON.parse(body)
                });
            });
        });

    }
};

module.exports = { routes };