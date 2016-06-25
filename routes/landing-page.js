var config = require('../config/config')
var request = require('request');
const slug = require('slug')

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max-min+1) + min);
}

function processProducts(products) {
    const originalData = products.data;
    const data = originalData.map(product => {
        const url = `/product/${product.id}-${slug(product.name)}`;
        return Object.assign(product, {url});
    });

    return Object.assign(products, {data});
}

const unique = arr => Array.from(new Set(arr));

var routes = {
    init(app) {
        app.get('/', (req, res, next) => {
            request('http://127.0.0.1:3000/api/products', (error, response, body) => {
                const products = processProducts(JSON.parse(body));
                const randomIndex = randomBetween(0, products.data.length-1);
                const placeholderText = products.data[randomIndex].name;
                const designerNames = unique(products.data.map(product => product.designer));
                const designersWithIds = designerNames.map(name => {
                    return {
                        name: name,
                        id: name.replace(' ', '')
                    }
                });

                res.render('index', {
                    metadata: {
                        title: 'NAP Tech Test'
                    },
                    title: 'NAP Tech Test',
                    layout: 'layouts/default',
                    template: 'index',
                    products,
                    placeholderText,
                    designersWithIds
                });
            });
        });

    }
};

module.exports = { routes };