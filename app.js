// config
const config = require(__dirname + '/config/config');
const setUpRoutes = require(config.ROOT + '/routes/setup-routes').configureRoutes;

// Require our libraries
const expressUtilities = require(config.ROOT + '/utilities/express');

/********* Express Configuration *******/
const app = expressUtilities.appConfiguration.init();

/********* Set up routes *******/
setUpRoutes.init(app);

app.listen(config.PORT);
console.log('Service started on port ' + config.PORT );

