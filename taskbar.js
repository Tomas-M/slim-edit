

   function update_taskbar()
   {
      var windows=$('.window');
      var win,id,ex;

      for (var i=0; i<windows.length; i++)
      {
         win=$(windows[i]);
         id=win.attr('id');

         ex=$('#taskbar').find('li[data-windowid="'+id+'"]');

         if (ex.length==0) { ex=$('<li class="taskname" data-windowid="'+id+'"></li>'); $('#taskbar').append(ex); }

         if (win.hasClass('closed')) ex.addClass('closed');
         else ex.removeClass('closed');

         if (win.hasClass('topmost')) ex.addClass('active');
         else ex.removeClass('active');

         ex.text(win.find('.header').text());
      }
   }


   function menuToggle()
   {
      
   }