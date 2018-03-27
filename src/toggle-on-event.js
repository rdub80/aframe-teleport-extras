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