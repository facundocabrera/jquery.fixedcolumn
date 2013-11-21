(function($) {
  'use strict';

  var FixedColumn = function(element) {
    this.init(element);
  };

  FixedColumn.useSticky = $('html').hasClass('csspositionsticky');

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
      var handler = $.proxy(function(ev) {
        this.translate($(ev.currentTarget).scrollLeft());
      }, this);

      this.$scrollable = this.$el.closest('.scrollable').on('scroll.fixedcolumn', handler);
    },

    destroy: function() {
      this.$el.css({
        transform: 'none'
      });
      this.$scrollable.off('.fixedcolumn');
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
