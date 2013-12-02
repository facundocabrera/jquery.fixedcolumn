(function($) {
  'use strict';

  var FixedColumn = function(element) {
    this.init(element);
  };

  FixedColumn.useSticky = (function () {
    var ua = navigator.userAgent.match(/version\/((\d+)?[\w\.]+).+?mobile\/\w+\s(safari)/i),
      stickyTest = $('html').hasClass('csspositionsticky');

    // if i'm running iOS 6 - use the fallback
    if (stickyTest && ua && (parseInt(ua[2], 10) < 7)) return false;

    return stickyTest;
  }());

  FixedColumn.prototype = {
    constructor: FixedColumn,

    init: function($el) {
      if (!FixedColumn.useSticky) {
        this.$el = $el;

        this.initialLeft = parseInt($el.css('left'), 10) || 0;

        this.translate();

        this.listenScroll();
      }
    },

    translate: function(x) {
      this.$el.css({
        transform: 'translateX(' + (this.initialLeft + (x || 0)) + 'px)'
      });

      return this;
    },

    listenScroll: function() {
      this._listener = $.proxy(function(ev) {
        this.translate($(ev.currentTarget).scrollLeft());
      }, this);

      this.$scrollable = this.$el.closest('.scrollable').on('scroll.fixedcolumn', this._listener);
    },

    destroy: function() {
      this.$el.data('fixedcolumn', null);
      this.$el.css({
        transform: 'none'
      });
      this.$scrollable.off('scroll.fixedcolumn', this._listener);
    }

  };

  var old = $.fn.fixedcolumn;

  $.fn.fixedcolumn = function(option) {
    return this.each(function() {
      var $this = $(this),
        data = $this.data('fixedcolumn'),
        options = typeof option == 'object' && option;

      if (!data) {
        $this.data('fixedcolumn', (data = new FixedColumn($this, options)));
      }

      if (typeof option == 'string') {
        data[option]();
      }
    });
  };

  $.fn.fixedcolumn.Constructor = FixedColumn;

  $.fn.fixedcolumn.defaults = {};

  $.fn.fixedcolumn.noConflict = function() {
    $.fn.fixedcolumn = old;
    return this;
  };

}(this.jQuery));
