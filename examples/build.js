(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('../index.js');

},{"../index.js":2}],2:[function(require,module,exports){
/* global AFRAME */

if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('toggle-on-event', {
  schema: {
    hideOn: { type: 'string', default: 'raycaster-intersection-cleared' },
    showOn: { type: 'string', default: 'raycaster-intersection' },
    raycasterObject: { type: 'selector' }
  },
  
  noIntersections: 0,
  
  init: function() {
    if(!this.data.raycasterObject) {
      this.data.raycasterObject = this.el;
    }
    
    this.data.raycasterObject.addEventListener(this.data.showOn, function() {
      this.noIntersections++;
      this.toggle();
    }.bind(this));
    
    this.data.raycasterObject.addEventListener(this.data.hideOn, function() {
      this.noIntersections--;
      this.toggle();
    }.bind(this));
  },
  
  toggle: function() {
    this.noIntersections = Math.max(this.noIntersections, 0);
    this.el.setAttribute('visible', this.noIntersections > 0);
  }
});
  
AFRAME.registerComponent('teleport-extras', {
  schema: {
    cursor: { type: 'selector', default: '[cursor]' },
  },

  active: true,
  
  init: function () {
    document.querySelector('a-scene').addEventListener('touchstart', this.startTouch.bind(this))
    document.querySelector('a-scene').addEventListener('mousedown', this.startTouch.bind(this))
    document.body.addEventListener('keydown', function (e) {
      if (e.keyCode == 32) {
        this.startTouch();
      }
    }.bind(this))
    
    //Create the touchend event
    document.querySelector('a-scene').addEventListener('touchend', this.endTouch.bind(this))
    document.querySelector('a-scene').addEventListener('mouseup', this.endTouch.bind(this));
    document.body.addEventListener('keyup', function (e) {
      if (e.keyCode == 32) {
        this.endTouch();
      }  
    }.bind(this));
    
    this.el.addEventListener('raycaster-intersection', this.onStartIntersection.bind(this));
    this.el.addEventListener('raycaster-intersection-cleared', this.onEndIntersection.bind(this));
  },
  
  startTouch: function() {
    if(this.active) {
      this.el.emit('starttouch')
    }
  },
  
  endTouch: function() {
    if(this.active) {
      this.el.emit('endtouch')
    }
  },
  
  onStartIntersection: function() {
    this.active = false; 
    
    const teleportControls = this.el.components['teleport-controls'];
    teleportControls.active = false;
	  teleportControls.hitEntity.setAttribute('visible', false);
    teleportControls.teleportEntity.setAttribute('visible', false);
  },
  
  onEndIntersection: function() {
    this.active = true;
  }
});


},{}]},{},[1]);