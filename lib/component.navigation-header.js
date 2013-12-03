/*
 * component.navigation-header
 * http://github.amexpub.com/modules
 *
 * Copyright (c) 2013 Amex Pub. All rights reserved.
 */
'use strict';
require('browsernizr/lib/addTest');
require('browsernizr/lib/prefixed');

var Modernizr = require('browsernizr'),
	classie = require('classie'),
	extend = require('util-extend'),
	ejs = require('ejs'),
	events = require('events'),
	util = require('util');

var getEventTarget = function(e) {
    e = e || window.event;
    return e.target || e.srcElement;
};

var navigationHeader = function(){
	this.navStyles=["ha-header-large","ha-header-small","ha-header-hide","ha-header-show","ha-header-subshow","ha-header-shrink","ha-header-rotate","ha-header-rotateBack","ha-header-color","ha-header-box","ha-header-fullscreen","ha-header-subfullscreen"];
		this.emit("navigationInitialized");
	this.subNavStyles = {
		0:4,
		1:4,
		2:4,
		5:6,
		7:6,
		8:11,
		9:11,
		10:11
	};

	this.init = function(options){
		return this._init(options);
	};
	this.showNav = function(style){
		return this._showNav(style);
	};
	this.showSubNav = function(subnavToShow){
		return this._showSubNav(subnavToShow);
	};
	this.hideSubNav = function(){
		return this._hideSubNav();
	};
};

util.inherits(navigationHeader,events.EventEmitter);

navigationHeader.prototype.render = function(template,data,element){
	var componentHTML = ejs.render(template,data);
	document.getElementById(element).innerHTML = componentHTML;
	// this.emit("renderedComponent");
};
navigationHeader.prototype._init = function( options ) {
	var defaults = {
		element : 'ha-header',
		navStyle : 7,
		subNavStyle : 6
	};
	options = options || {};
	this.options = extend( defaults,options );
	this.$el = document.getElementById(this.options.element);
	// this._config();
	this._initEvents();
	// console.log("this",this);
	this.emit("navigationInitialized");
};
navigationHeader.prototype.getOptions = function(){
	return this.options;
};
navigationHeader.prototype._config = function() {
	// the list of items
	this.$list = this.$el.getElementsByTagName('ul')[0];
	this.$items = this.$list.getElementsByTagName('li');
	this.current = 0;
	this.old = 0;
};
navigationHeader.prototype._initEvents = function() {
	var self = this,
		openSubNav = function(event){
			// console.log("moving on nav");
			var target = getEventTarget(event);
			if(classie.hasClass(target,"has-sub-nav")){
				self.showSubNav(target.getAttribute("data-navitr"));
				// console.log("moving on subnav",target.getAttribute("data-navitr"));
				self.$navbar.removeEventListener("mousemove",openSubNav);
			}
		};
	this.$navbar = document.getElementById(this.options.element+"-nav-id");
	this.$subnavbar = document.getElementById(this.options.element+"-subnav-id");
	// console.log("this.$navbar",this.$navbar);
	this.$navbar.addEventListener("mousemove",openSubNav);

	this.$subnavbar.addEventListener("mouseleave",function(event){
		self.hideSubNav();
		self.$navbar.addEventListener("mousemove",openSubNav);
	});
};
navigationHeader.prototype._showNav = function( style ) {
	if(typeof style ==="number"){
		this.$el.setAttribute("class", "ha-header "+this.navStyles[style]);
		this.options.navStyle = style;
	}
};
navigationHeader.prototype._showSubNav = function(subnavToShow) {
	var subNavItems = this.$subnavbar.getElementsByTagName("nav");
	for(var x in subNavItems){
		if(subNavItems[x].style){
			subNavItems[x].style.display = "none";
			if(subNavItems[x].getAttribute("data-itr")===subnavToShow){
				subNavItems[x].style.display = "block";
			}
		}
	}
	var subnavid = this.subNavStyles[this.options.navStyle.toString()];
	this.$el.setAttribute("class", "ha-header "+this.navStyles[subnavid]);
	this.options.subNavStyle = subnavid;
};
navigationHeader.prototype._hideSubNav = function() {
	var navid = this.options.navStyle;
	this.$el.setAttribute("class", "ha-header "+this.navStyles[navid]);
	this.options.navStyle = navid;
};
window.navigationHeader = navigationHeader;
module.exports = navigationHeader;