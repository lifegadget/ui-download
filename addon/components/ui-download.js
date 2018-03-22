import Ember from "ember";
const { keys, create } = Object; // jshint ignore:line
const { computed, observer, $, run, on, typeOf, debug, isPresent } = Ember; // jshint ignore:line
const { defineProperty, get, set, inject, isEmpty, merge } = Ember; // jshint ignore:line
const a = Ember.A; // jshint ignore:line

import layout from "../templates/components/ui-download";

export default Ember.Component.extend({
  layout: layout,
  classNameBindings: ["_file", "hasBeenDownloaded:downloaded:not-downloaded"],
  classNames: ["ui-download"],
  /** data or a promise that resolves to data */
  data: null,
  id: null,
  size: "normal",
  mime: "text/plain",
  charset: "utf-8",
  url: computed("mime", "data", function() {
    let { mime, data, charset } = this.getProperties("mime", "data", "charset");
    data = charset === "utf-8" || mime.slice(0, 4) === "text" ? encodeURIComponent(data) : data;
    return `data:${mime};charset=${charset},${data}`;
  }),
  supportsFileSaver: computed(function() {
    return !!new Blob();
  }),
  hasBeenDownloaded: false,
  click(evt) {
    if (evt.target.className !== "hidden-link") {
      this.set("hasBeenDownloaded", true);
      const { data, filename, elementId, charset, mime } = this.getProperties(
        "data",
        "filename",
        "elementId",
        "charset",
        "mime"
      );
      console.log("Making sure data is thenable. ", data.then ? true : false);
      const thenableData = data.then
        ? data
        : {
            then: () => data
          };
      thenableData.then(datum => {
        console.log("file content ready");

        // Prefer FileSaver strategy (should work on all modern browsers)
        if (this.get("supportsFileSaver")) {
          let blob = new Blob([datum], { type: `${mime};charset=${charset}` });
          window.saveAs(blob, filename);
        } else {
          if (window.navigator.msSaveOrOpenBlob) {
            // Microsoft Strategy
            let fileData = [datum];
            let blobObject = new Blob(fileData);
            window.navigator.msSaveOrOpenBlob(blobObject, filename);
          } else {
            // Non-microsoft startegy
            $(`#${elementId} .hidden-link`)[0].click();
          }
        }

        if (typeOf(this.attrs.onDownload) === "function") {
          this.attrs.onDownload({
            event: evt,
            object: this
          });
        } else {
          this.sendAction("onDownload", {
            event: evt,
            object: this
          });
        }
      });
    }
  }
});
