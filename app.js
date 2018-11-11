const config = require(__dirname + '/config/config');
const setUpRoutes = require(config.ROOT + '/routes/setup-routes').configureRoutes;

const expressUtilities = require(config.ROOT + '/utilities/express');

const app = expressUtilities.appConfiguration.init();

setUpRoutes.init(app);

app.listen(config.PORT);
console.log('Service started on port ' + config.PORT);

