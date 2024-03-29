/*!
  A Vegetableman initiative. Influenced by exenv.
  Based on code that is Copyright 2013-2015, Facebook, Inc.
  All rights reserved.
*/

(function() {

  'use strict';

  var ExecutionEnvironment = require("exenv");

  var useHasFeature;
  if (ExecutionEnvironment.canUseDOM) {
    useHasFeature =
      document.implementation &&
      document.implementation.hasFeature &&
      // always returns true in newer browsers as per the standard.
      // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
      document.implementation.hasFeature('', '') !== true;
  }

  /**
   * Checks if an event is supported in the current execution environment.
   *
   * NOTE: This will not work correctly for non-generic events such as `change`,
   * `reset`, `load`, `error`, and `select`.
   *
   * Borrows from Modernizr.
   *
   * @param {string} eventNameSuffix Event name, e.g. "click".
   * @param {?boolean} capture Check if the capture phase is supported.
   * @return {boolean} True if the event is supported.
   * @internal
   * @license Modernizr 3.0.0pre (Custom Build) | MIT
   */


  function isEventSupported(eventNameSuffix, capture) {
    if (!ExecutionEnvironment.canUseDOM ||
        capture && !('addEventListener' in document)) {
      return false;
    }

    var eventName = 'on' + eventNameSuffix;
    var isSupported = eventName in document;

    if (!isSupported) {
      var element = document.createElement('div');
      element.setAttribute(eventName, 'return;');
      isSupported = typeof element[eventName] === 'function';
    }

    if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
      // This is the only way to test support for the `wheel` event in IE9+.
      isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
    }

    return isSupported;
  }


  if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
    define(function () {
      return isEventSupported;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = isEventSupported;
  } else {
    window.isEventSupported = isEventSupported;
  }

}());