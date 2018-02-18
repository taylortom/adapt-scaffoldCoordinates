// LICENCE https://github.com/adaptlearning/adapt_authoring/blob/master/LICENSE
define(function(require) {
  var Backbone = require('backbone');
  var BackboneForms = require('backbone-forms');
  var Origin = require('core/origin');

  var ScaffoldCoordinatesView = Backbone.Form.editors.Base.extend({
    tagName: 'div',
    className: 'scaffold-coordinates',

    events: {
      'click .container': 'onDropPin'
    },

    render: function() {
      var template = Handlebars.templates[this.constructor.template];
      this.$el.html(template());

      this.setValue(this.value);

      return this;
    },

    setValue: function(value) {
      this.value = value;
    },

    getValue: function() {
      var $pin = $('.container .pin', this.$el);
      var offset = $pin.offset();
      var position = this.relativePxAsPercent(offset.left, offset.top);
      return { top: position.top, left: position.left };
    },

    validate: function() {
      var error = Backbone.Form.editors.Base.prototype.validate.call(this);
      return error;
    },

    onDropPin: function(event) {
      this.setValue(this.relativePxAsPercent(event.clientX, event.clientY));
    },

    /**
    * Returns the percentage value of any position relative to the .container
    */
    relativePxAsPercent: function(left, top) {
      var $container = $('.container', this.$el);
      var offset = $container.offset();

      var relativeTop = top-offset.top;
      var relativeLeft = left-offset.left;

      return {
        top: Math.round((relativeTop/$container.width())*100),
        left: Math.round((relativeLeft/$container.height())*100)
      };
    }
  }, {
    template: 'scaffoldCoordinates'
  });

  Origin.on('origin:dataReady', function() {
    Origin.scaffold.addCustomField('Coordinates', ScaffoldCoordinatesView);
  });

  return ScaffoldCoordinatesView;
});
