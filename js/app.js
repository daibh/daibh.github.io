var GoogleAnalysis = /** @class */ (function () {
  function GoogleAnalysis(code) {
    this.code = code;
    this.configure();
  }
  GoogleAnalysis.init = function (code) {
    console.log('GoogleAnalysis::initialize', { code: code });
    if (!GoogleAnalysis.instance) {
      return GoogleAnalysis.instance = new GoogleAnalysis(code);
    }
    return GoogleAnalysis.instance;
  };
  GoogleAnalysis.prototype.configure = function () {
    // gtag('js', new Date());
    // gtag('config', this.code);
  };
  GoogleAnalysis.prototype.bindEvents = function () {
    window.addEventListener('DOMContentLoaded', function () {
      var links = document.getElementsByTagName('a');
      window.dataLayer = window.dataLayer || [];
      var onClickListener = function (e) {
        var el = e.currentTarget;
        var event = el.getAttribute('gaEvent');
        var category = el.getAttribute('gaCategory');
        var value = el.getAttribute('gaValue');
        console.log(el, { event, category, value });
        window.dataLayer.push({ event, category, value });
      };
      for (var i = 0; i < links.length; i++) {
        var _link = links.item(i);
        _link.addEventListener('click', onClickListener);
      }
    });
  };
  return GoogleAnalysis;
}());
(function () {
  var googleAnalysis = GoogleAnalysis.init('G-DL3FM9GLQE');
  googleAnalysis.bindEvents();
}());
