import Ember from 'ember';
const { keys, create } = Object; // jshint ignore:line
const { computed, observer, $, run, on, typeOf, debug, isPresent } = Ember;  // jshint ignore:line
const { defineProperty, get, set, inject, isEmpty, merge } = Ember; // jshint ignore:line
const a = Ember.A; // jshint ignore:line

export default Ember.Controller.extend({

  mime: 'text/xml',
  charset: 'utf-8',
  filename: 'foobar.xml',
  dataTemplate: 'xmlData',
  data: null,
  _data: on('init', function() {
    this.set('data', this.get('xmlData'));
  }),

  xmlData: '<xml><foo></foo><bar></bar></xml>',
  plainData: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',

  actions: {
    mimeTypeChanged(cmd, value) {
      console.log(`mime changed: ${value}`);
      const {plainData, xmlData} = this.getProperties('plainData', 'xmlData');
      if (String(value).trim() === 'text/plain') {
        console.log('switching to plain');
        this.set('filename', 'plain.txt');
        this.set('data', plainData);
      } else {
        console.log('switching to xml');
        this.set('filename', 'foobar.xml');
        this.set('data', xmlData);
      }
    },
    onDownload(evt) {
      console.log(evt);
    }
  }
});
