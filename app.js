(function($){
  $(document).ready(function() {
    window.adjustToPerfection();
    $(window).on('resize', adjustToPerfection);
  });

  adjustToPerfection = function() {
    $('p.intro').adjustFontSize({
      lineHeightMultiplier: 1.3
    });
    $('.bio').adjustFontSize();
    $('.bio h3').adjustFontSize({
      lineHeightMultiplier: 1.2
    });
  }

  $.FontSizeAdjuster = function(el, options){
    var base = this;
    base.$el = $(el);
    base.el = el;
    base.goldenRatio = 1.618;

    base.init = function(){
      base.options = $.extend({},$.FontSizeAdjuster.defaultOptions, options);

      base.$el.css('line-height', base.optimalLineHeight() + 'px');
      base.$el.css('font-size', base.optimalFontSize() + 'px');
    };

    base.getWidth = function() {
      // TODO: memoize
      return Math.round(base.$el.width());
    };

    base.optimalLineHeight = function() {
      // TODO: memoize
      return Math.round(Math.sqrt(base.getWidth())) * base.options.lineHeightMultiplier;
    };

    base.optimalFontSize = function() {
      // TODO: memoize
      return Math.round(base.optimalLineHeight() / base.goldenRatio);
    };

    base.init();
  };

  $.FontSizeAdjuster.defaultOptions = {
    lineHeightMultiplier: 1
  };

  $.fn.adjustFontSize = function(options){
    return this.each(function(){
      (new $.FontSizeAdjuster(this, options));
    });
  };

})(jQuery);

