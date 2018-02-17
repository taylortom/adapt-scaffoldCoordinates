// LICENCE https://github.com/adaptlearning/adapt_authoring/blob/master/LICENSE
define(function(require) {
  var Backbone = require('backbone');
  var Origin = require('core/origin');

  var ScaffoldCoordinatesView = Backbone.Form.editors.Base.extend({
    tagName: 'div',
    className: 'scaffold-coordinates'
  }, {
    template: 'scaffoldCoordinates'
  });

  Origin.on('origin:dataReady', function() {
    Origin.scaffold.addCustomField('Coordinates', ScaffoldCoordinatesView);
  });

  return ScaffoldCoordinatesView;
});
