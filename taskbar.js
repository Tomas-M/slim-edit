

   function taskbarRefresh()
   {
      var windows=$('.window');
      var win,id,task;

      for (var i=0; i<windows.length; i++)
      {
         win=$(windows[i]);
         id=win.attr('id');
         task=$('#taskbar').find('li[data-windowid="'+id+'"]');
         if (task.length==0) continue;

         if (win.hasClass('closed')) task.addClass('closed');
         else task.removeClass('closed');

         if (win.hasClass('topmost')) task.addClass('active');
         else task.removeClass('active');
      }
   }


   function taskbarAdd(id,title)
   {
      $('#taskbar').append('<li class="taskname" data-windowid="'+id+'">'+htmlspecialchars(title)+'</li>');
      taskbarRefresh();
   }


   function taskbarRemove(win)
   {
      var id=win.attr('id');
      $('#taskbar').find('li[data-windowid="'+id+'"]').remove();
   }


   function menuToggle()
   {
      
   }
