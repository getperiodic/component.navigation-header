/*
 * component.navigation-header
 * http://github.amexpub.com/modules
 *
 * Copyright (c) 2013 Amex Pub. All rights reserved.
 */
'use strict';

var Modernizr = require('browsernizr'),
	classie = require('classie'),
	extend = require('util-extend'),
	ejs = require('ejs'),
	events = require('events'),
	util = require('util');

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

	return {
		navStyles: this.navStyles,
		subNavStyles: this.subNavStyles,
		init:this._init,
		getOptions: this.getOptions,
		showNav: this._showNav,
		showSubNav: this._showSubNav,
		hideSubNav: this._hideSubNav
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
	// this._initEvents();
	console.log("this",this);
	// this.emit("navigationInitialized");
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
};
navigationHeader.prototype._showNav = function( style ) {
	if(typeof style ==="number"){
		this.$el.setAttribute("class", "ha-header "+this.navStyles[style]);
		this.options.navStyle = style;
	}
};
navigationHeader.prototype._showSubNav = function() {
	console.log(this.subNavStyles);
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