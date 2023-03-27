var GoogleAnalysis = /** @class */ (function () {
  function GoogleAnalysis(code) {
      this.events = [];
      this.code = code;
      this.injectDependences();
  }
  GoogleAnalysis.init = function (code) {
      console.log('GoogleAnalysis::initialize', { code: code });
      if (!GoogleAnalysis.instance) {
          return GoogleAnalysis.instance = new GoogleAnalysis(code);
      }
      return GoogleAnalysis.instance;
  };
  GoogleAnalysis.prototype.injectDependences = function () {
      // Google tag (gtag.js)
      (function (d, s, id, c) {
          var e, fsc = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {
              return;
          }
          e = d.createElement(s);
          e.id = id;
          e.src = "https://www.googletagmanager.com/gtag/js?id=".concat(c);
          e.setAttribute('async', true);
          fsc.parentNode.insertBefore(e, fsc);
      }(document, 'script', 'gtag-js-sdk', this.code));
      window.dataLayer = window.dataLayer || [];
      this.gtag('js', new Date());
      this.gtag('config', 'G-DL3FM9GLQE');
  };
  GoogleAnalysis.prototype.getDefinedEvents = function () {
      var _this = this;
      var links = document.getElementsByTagName('a');
      var _loop_1 = function (i) {
          var _link = links.item(i);
          _link.addEventListener('click', function (e) {
              var event = _link.getAttribute('gaEvent');
              var category = _link.getAttribute('gaCategory');
              var value = _link.getAttribute('gaValue');
              _this.gtag(event, category, value);
          });
      };
      for (var i = 0; i < links.length; i++) {
          _loop_1(i);
      }
      return [];
  };
  GoogleAnalysis.prototype.addEvent = function (event) {
      this.events.push(event);
  };
  GoogleAnalysis.prototype.addEvents = function (events) {
      var _a;
      (_a = this.events).push.apply(_a, events);
  };
  GoogleAnalysis.prototype.bindEvents = function () {
      var _this = this;
      window.addEventListener('DOMContentLoaded', function () {
          _this.getDefinedEvents();
          _this.events.forEach(function (_a) {
              var name = _a.name, listener = _a.listener;
              return window.document.addEventListener(name, listener);
          });
      });
      window.addEventListener('beforeunload', function () { return _this.events.forEach(function (_a) {
          var name = _a.name, listener = _a.listener;
          return window.document.removeEventListener(name, listener);
      }); });
  };
  GoogleAnalysis.prototype.gtag = function () {
      var params = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          params[_i] = arguments[_i];
      }
      params.forEach(function (_) { return console.log('gtag', _); });
      window.dataLayer.push(params);
  };
  return GoogleAnalysis;
}());
var googleAnalysis = GoogleAnalysis.init('G-DL3FM9GLQE');
googleAnalysis.addEvent({
  name: 'click',
  listener: function (e) {
      console.log('click', e, this);
  }
});
googleAnalysis.bindEvents();