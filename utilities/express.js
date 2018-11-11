
const express = require('express');
const hbs = require('express-hbs');
const expressParams = require('express-params');
const {ROOT} = require('../config/config.js');

const appConfiguration = {

	templateConfig(app) {
		app.engine('hbs', hbs.express3({
			partialsDir: ROOT + '/views/partials',
			layoutsDir: ROOT + '/views/layouts'
		}));
		app.set('view engine', 'hbs');
		app.set('views', ROOT + '/views');
		app.use(express.static(ROOT + '/public'));
	},

	enableCORS(app) {
		app.use((req, res, next) => {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
			next();
		});
	},

	init() {
		const app = express();
		appConfiguration.templateConfig(app);
		appConfiguration.enableCORS(app);
		return app;
	}
};

module.exports = {appConfiguration};
