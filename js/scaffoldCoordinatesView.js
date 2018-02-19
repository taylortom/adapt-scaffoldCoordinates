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
      this.$el.html(template(this.getTemplateData()));
      _.defer(_.bind(function() {
        this.$el.imageready(_.bind(this.postRender, this));
      }, this));

      this.setValue(this.value);

      return this;
    },

    postRender: function() {
      var $graphic = $('.graphic', this.$el);
      $('.container', this.$el).height($graphic.height());
      $graphic.remove();
    },

    getTemplateData: function() {
      var data = {};
      var props = Origin.scaffold.getCurrentModel().get('properties');

      if(props && props._graphic) {
        data._graphic = props._graphic.src;
      }
      return data;
    },

    setValue: function(value) {
      this.value = value;
      $('.pin', this.$el).css({ top: value.top + '%', left: value.left + '%' });
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
