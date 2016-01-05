/* jshint node: true */
'use strict';

module.exports = {
  name: 'ui-download',
  normalizeEntityName: function() {},
  included: function(app, parentAddon) {
    var target = (parentAddon || app);
    target.import('vendor/ui-download/ui-download.css');
    target.options.babel = target.options.babel || { includePolyfill: true };
    target.import('bower_components/filesaver/FileSaver.js');
  }
};
