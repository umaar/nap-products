(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['filterMessage.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "	<p class=\"filter-message\">\n		<strong>"
    + alias4(((helper = (helper = helpers.resultCount || (depth0 != null ? depth0.resultCount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"resultCount","hash":{},"data":data}) : helper)))
    + "</strong> results displayed. Total: <strong>"
    + alias4(((helper = (helper = helpers.totalProductListCount || (depth0 != null ? depth0.totalProductListCount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"totalProductListCount","hash":{},"data":data}) : helper)))
    + "</strong>\n	</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.activeFilter : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
templates['pageHead.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<head>\n	<title>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.metadata : depth0)) != null ? stack1.title : stack1), depth0))
    + "</title>\n	<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n	<link rel=\"stylesheet\" href=\"/css/reset.css\">\n	<link rel=\"stylesheet\" href=\"/css/awesomplete.css\" />\n	<link rel=\"stylesheet\" href=\"/css/main.css\">\n</head>";
},"useData":true});
templates['productItemList.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.image : depth0)) != null ? stack1.outfit : stack1), depth0));
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.images : depth0)) != null ? stack1.small : stack1), depth0));
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li class=\"product-list-item\">\n	<a href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">\n		<img src=\"\n		"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.image : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\" alt=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\">\n	</a>\n\n	<a href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" class=\"product-list-item-details\">\n		<h4>"
    + alias4(((helper = (helper = helpers.designer || (depth0 != null ? depth0.designer : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"designer","hash":{},"data":data}) : helper)))
    + "</h4>\n		<h3>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h3>\n		<h5>"
    + alias4(((helper = (helper = helpers.price || (depth0 != null ? depth0.price : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"price","hash":{},"data":data}) : helper)))
    + "</h5>\n	</a>\n</li>";
},"useData":true});
templates['scripts.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<script src=\"/js/jquery-3.0.0.min.js\"></script>\n<script src=\"/js/handlebars.runtime-v4.0.5.js\"></script>\n<script src=\"/js/templates.js\"></script>\n<script src=\"/js/awesomplete.min.js\"></script>\n<script src=\"/js/main.js\"></script>";
},"useData":true});
})();