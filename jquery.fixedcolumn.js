/*\
  When position: sticky doesn't work, the JS will fallback to CSS transforms.

  ## Markup proposed
  <!--
    Scrollable area (it could be any ancestor, it's no need to be the direct
    one)
  -->
  <div class="container">
    <div class="sticky">
      <!-- Fixed column will be here -->
    </div>
    <div class="content">
      <!-- Content bellow the fixed column -->
    </div>
  </div>

  ## JS Snippet
  $('.fixed-column').fixedcolumn(); // this will handle all the JS show for you

\*/
(function($) {
  'use strict';

  var events = {
    queue: function($el) {
      $el.closest('.scrollable').on('scroll.fixedcolumn', function(ev) {
        $el.data('fixedcolumn')
           .translate($(ev.currentTarget).scrollLeft());
      });
    }
  };

  var FixedColumn = function(element) {
    this.init(element);
  };

  FixedColumn.useSticky = $('html').hasClass('csspositionsticky');

  FixedColumn.prototype = {

    constructor: FixedColumn,

    init: function($el) {
      this.$el = $el;

      if (!FixedColumn.useSticky) {

        this.initialLeft = parseInt($el.css('left'), 10) || 0;

        $el.css({
          transform: ['translateX(', this.initialLeft, 'px)'].join('')
        });

        events.queue($el);
      }
    },

    translate: function(x) {
      this.$el.css({
        transform: 'translateX(' + (this.initialLeft + (x || 0)) + 'px)'
      });

      return this;
    },

    destroy: function() {}

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
