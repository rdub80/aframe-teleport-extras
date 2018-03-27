/* global AFRAME */

if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

require('./src/teleport-extras');
require('./src/toggle-on-event');