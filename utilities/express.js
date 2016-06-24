const {ROOT} = require('../config/config.js');

let express = require("express");
let hbs = require('express-hbs');
let expressParams = require('express-params');

let appConfiguration = {

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
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
          next();
        });
    },

    init() {
        var app = express();
        appConfiguration.templateConfig(app);
        appConfiguration.enableCORS(app);
        return app;
    }
};

module.exports = { appConfiguration };
