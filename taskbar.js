

   function update_taskbar()
   {
      var windows=$('.window');
      var tasks='';
      var win;

      for (var i=0; i<windows.length; i++)
      {
         win=$(windows[i]);
         tasks+='<li class="taskname '+(win.hasClass('closed')?'closed':win.hasClass('topmost')?'active':'')
              +'" data-window-id="'+htmlspecialchars(win.attr('id'))+'">'+htmlspecialchars(win.find('.header').text())+'</li>';
      }

      $('#taskbar').html(tasks);
   }
