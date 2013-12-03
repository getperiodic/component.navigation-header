'use strict';

var navigationHeader = require('../../../index'),
	async = require('async'),
	webapp = require('./webapp');

var module1 = webapp,
	navigationHeader1 = false,
	navigationHeader2 = false;

window.onload = function(){
	async.parallel({
	    template: function(callback){
			module1.grabTemplate(window.document.getElementById('navigation-template').innerHTML,callback);
	    },
	    componentData: function(callback){
            module1.grabData('https://s3.amazonaws.com/gpsampledata/component.navigation-header/navigationspec.json',callback);
	    }
	},
	function(err, results) {
		if(err){
			console.log(err);
		}

		// console.log("results",results);
		var data = results.componentData;
		webapp.render( results.template, results.componentData, "header-container");
		navigationHeader1 = new navigationHeader();
		navigationHeader1.init({element:data.navigationspec.config.html.dom_id});
		window.navigationHeader1 = navigationHeader1;

		// var data2 = results.componentData;
		// data2.config.html.dom_id="p_c_lvs-id2";
		// data2.config.html.preview=true;
		// webapp.render( results.template, data2, "slider2");
		// fullWidthSlideshow2 = new fullWidthSlideshow({element:"p_c_lvs-id2"});
	});
};

// module1.on("grabbedData",function(){
// 	console.log("loaded data");
// });

// module1.on("grabbedTemplate",function(){
// 	console.log("loaded template");
// });

// listviewcroll1.on("renderedComponent",function(){
// 	listviewcroll1.init();
// 	console.log("rendered template");
// });

// listviewcroll2.on("renderedComponent",function(){
// 	listviewcroll2.init({idSelector: 'anotherScroller'});
// 	console.log("@(*#)@(# rendered template");
// });