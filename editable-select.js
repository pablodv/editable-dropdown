(function($){
  $.fn.editableSelect = function(){
    editable = new EditableSelect(this);

    return $(this);
  };

  var EditableSelect = function(select){
    this.init(select);
  };

  EditableSelect.prototype = {
    text: false,
    select: false,
    holder: false,
    init: function(select) {
      holder  = $('<ul></ul>');
      text    = $("<input class='input-wide editable-input' id='" + select.attr('id') + "' type=text name='" + select.attr('name') + "'/>");
      wrapper = $('<div class="holder"></div');

      select.children().each(function(){
        li = $("<li class='editable-item'>" + $(this).text() + "</li>");
        holder.append(li);
      });

      wrapper.append(holder);

      select.after(text);
      select.hide();

      text.after(wrapper);

      this.select = select;
      this.text   = text;
      this.holder = holder;
      this.initInputEvents();
      this.pickItem();
    },

    initInputEvents: function(){
      parent = this;

      this.text.keyup(function(e){
        var strToMatch = this.value;
        var childs     = parent.holder.children();
        parent.holder.show();

        childs.each(function(){
          if(this.innerHTML.toLowerCase().indexOf(strToMatch.toLowerCase()) > -1 ) {
            $(this).removeClass('ininvisible');
          } else {
            $(this).addClass('ininvisible');
          }
        });

        if (childs.length == $(".holder li.ininvisible").length) { parent.holder.hide(); }
      }
      ).click(function(){
        parent.holder.show();
      });

      $("body").click(function(event) {
        if (!$(event.target).hasClass("editable-item") && !$(event.target).hasClass("editable-input")) {
          parent.holder.hide();
        }
      });
    },

    pickItem: function(){
      parent = this;

      $(parent.holder.children()).on('click', function(){
        parent.text.val($(this).text());
        parent.holder.hide();
      });
    }
  }
})(window.Zepto || window.jQuery);