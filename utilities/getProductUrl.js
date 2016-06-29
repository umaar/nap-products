const slug = require('slug');

module.exports = ({id, name}) => `/product/${id}-${slug(name)}`;