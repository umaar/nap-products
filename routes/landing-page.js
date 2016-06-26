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

                const query = req.query;

                const sortingFilters = [
                    {
                        url: '?sort=price&order=asc',
                        isActive: (query.sort === 'price' && query.order === 'asc'),
                        text: 'Price (Low to High)',
                        sorter: ({price: rawPriceA}, {price: rawPriceB}) => {
                            const priceA = parseInt(rawPriceA.slice(1));
                            const priceB = parseInt(rawPriceB.slice(1));
                            if (priceA < priceB) return -1;
                            if (priceA > priceB) return 1;
                            return 0;
                        }
                    }, {
                        url: '?sort=price&order=desc',
                        isActive: (query.sort === 'price' && query.order === 'desc'),
                        text: 'Price (High to Low)',
                        sorter: ({price: rawPriceA}, {price: rawPriceB}) => {
                            const priceA = parseInt(rawPriceA.slice(1));
                            const priceB = parseInt(rawPriceB.slice(1));
                            if (priceA > priceB) return -1;
                            if (priceA < priceB) return 1;
                            return 0;
                        }
                    }
                ];

                const activeFilter = sortingFilters.find(filter => filter.isActive);
                if (activeFilter) {
                    products.data = products.data.sort(activeFilter.sorter);
                }

                res.render('index', {
                    metadata: {
                        title: 'NAP Tech Test'
                    },
                    title: 'NAP Tech Test',
                    layout: 'layouts/default',
                    template: 'index',
                    products,
                    placeholderText,
                    designersWithIds,
                    sortingFilters
                });
            });
        });

    }
};

module.exports = { routes };