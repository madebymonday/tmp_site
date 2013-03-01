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

    $('.bio').normalizeHeights();
    $('#brands li').normalizeMargins();
  };

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
      return Math.round(Math.sqrt(base.getWidth()) * base.options.lineHeightMultiplier);
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

  $.fn.normalizeHeights = function() {
    var maxHeight = 0;
    this.each(function() {
      var h = $(this).height();
      maxHeight = h > maxHeight ? h : maxHeight
    });

    $(this).height(Math.round(maxHeight));
  };

  $.fn.normalizeMargins = function() {
    wrapperWidth = $('.wrapper').width();
    var $items = $(this);
    totalWidth = _.reduce($items, function(memo, item) { return memo + $(item).width() }, 0);
    var margin = Math.floor((wrapperWidth - totalWidth) / ($items.length - 1)) - 1;
    $items.each(function() {
      if (!$(this).hasClass($items.last().attr('class'))) {
        $(this).css('marginRight', margin + 'px');
      }
    });
  };

})(jQuery);

