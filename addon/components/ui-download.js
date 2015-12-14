import Ember from 'ember';
const { keys, create } = Object; // jshint ignore:line
const { computed, observer, $, run, on, typeOf, debug, isPresent } = Ember;  // jshint ignore:line
const { defineProperty, get, set, inject, isEmpty, merge } = Ember; // jshint ignore:line
const a = Ember.A; // jshint ignore:line

import layout from '../templates/components/ui-download';

export default Ember.Component.extend({
  layout: layout,
  classNameBindings: ['_file'],
  classNames: ['ui-download'],
  data: null,
  _data: computed('data', function() {
    return this.get('data') ? 'data-ready' : null;
  }),
  mime: 'text/plain',
  charset: 'utf-8',
  url: computed('mime', 'data', function() {
    let {mime, data, charset} = this.getProperties('mime', 'data', 'charset');
    data = charset === 'utf-8' || mime.slice(0, 4) === 'text' ? encodeURIComponent(data) : data;
    return `data:${mime};charset=${charset},${data}`;
  }),
  click(evt) {
    if(evt.target.className !== 'hidden-link') {
      const {data, filename} = this.getProperties('data','filename');
      if(window.navigator.msSaveOrOpenBlob) {
        // Microsoft Strategy
        let fileData = [data];
        let blobObject = new Blob(fileData);
        window.navigator.msSaveOrOpenBlob(blobObject, filename);
      } else {
        // Non-microsoft startegy
        $('.hidden-link')[0].click();
      }
    }
  }
});
