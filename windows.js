
   function putToFront(ev)
   {
      if ($(ev.target).hasClass('window-title-button')) return;
      if ($(ev.target).closest('.window-title-button').length>0) return;
      if ($(ev.target).hasClass('taskname')) ev=$(ev.target).data('windowid');

      var win=getEl(ev,'window');
      var max=11;
      $('.window').each(function(ix,el) { max=Math.max(max,$(el).css('z-index')); });
      if (!win.hasClass('topmost')) win.css('z-index',max+1);
      $('.window').removeClass('topmost');
      win.addClass('topmost').removeClass('closed');
      win.css({'display':'block'});
      setTimeout(function(){win.css({'opacity':1});},0);
      update_taskbar();
   }


   function createWindow(id,title,contentHTML)
   {
      var html='<div class="window" id="'+htmlspecialchars(id)+'" style="z-index:10; opacity:1; ">'
      +'<div class="window-title-button window-close"><i class="fa fa-times"></i></div>'
      +'<div class="window-title-button window-maximize"><i class="fa fa-window-maximize"></i></div>'
      +'<div class=header>'+htmlspecialchars(title)+'</div>'
      +'<div class=content>'+contentHTML+'</div></div>';

      var win=getEl(id);

      // if window exists, raise it and update contents
      if (win.length>0)
      {
         win.find('.header').text(title);
         win.find('.content').html(contentHTML);
         putToFront(id);
         return;
      }

      $('#desktop').append(html);

      setWindowPosAuto(id,true);
      putToFront(id);

      win=getEl(id);

      win.draggable({'scroll':false, 'containment':'parent', 'delay':80,
      'start':function(ev,ui)
      {
         var win=ui.helper;
         win.find('.content').css('display','none');
         win.css('opacity',0.8);
      },
      'stop':function(ev,ui)
      {
         var win=ui.helper;
         win.find('.content').css('display','block');
         win.css('opacity',1);
         if (!win.data('maximized')) saveWindowPos(win);
      }});

      win.resizable({'minHeight':150, 'minWidth':200, 'containment':'parent', "handles":"all",
      'stop':function(ev,ui)
      {
         var win=ui.helper;
         saveWindowPos(win);
         win.removeData('maximized');
      }});

      win.find('.content').on('scroll',cellMoved);
      win.find('.header').on('dblclick',maxWindow);

      if (getSavedWindowPos(win)) restoreWindowPos(win,true);
      else saveWindowPos(win);

      return win;
   }


   function saveWindowPos(win)
   {
      var id=win.attr('id');
      localStorage.setItem('window-saved-position-'+id,serialize(
      {
         'top':win.position().top,
         'left':win.position().left,
         'width':win.outerWidth(),
         'height':win.outerHeight()
      }));
   }


   function getSavedWindowPos(win)
   {
      var id=win.attr('id');
      return unserialize(localStorage.getItem('window-saved-position-'+id));
   }


   function restoreWindowPos(win,noEffect)
   {
      var pos=getSavedWindowPos(win);
      setWindowPos(win,pos.top,pos.left,pos.width,pos.height,noEffect);
   }


   function closeWindow(id)
   {
      var win=getEl(id,'window');
      win.css('opacity',0).addClass('closed').removeClass('topmost');
      setTimeout(function(){win.css('display','none')},g.effectDuration);
      update_taskbar();
   }


   function maxWindow(ev)
   {
      var win=getEl(ev,'window');
      var desk=$('#desktop');

      putToFront(win);
      if (win.data('maximized'))
      {
         restoreWindowPos(win);
         win.removeData('maximized');
      }
      else
      {
         saveWindowPos(win);
         setWindowPos(win,0,0,desk.width(),desk.height());
         win.data('maximized',true);
      }
   }


   function setWindowPos(id,top,left,width,height,noEffect)
   {
      var win=getEl(id);
      if (!noEffect) win.addClass('autoanimated');
      if (typeof top !== "undefined") win.css({'top':top+'px'});
      if (typeof left !== "undefined") win.css({'left':left+'px'});
      if (typeof width !== "undefined") win.css({'width':width+'px'});
      if (typeof height !== "undefined") win.css({'height':height+'px'});
      if (!noEffect) setTimeout(function(){win.removeClass('autoanimated');},g.effectDuration);
   }


   function setWindowPosAuto(id,noEffect)
   {
      var d=40;
      var sw=$(window).width();
      var sh=$(window).height();
      var w=Math.floor(sw/2); if (w<800) w=800;
      var h=Math.floor(sh/2);

      if (g.nextWindowPos.left+w>sw) g.nextWindowPos.left=60;
      if (g.nextWindowPos.top+h>sh) g.nextWindowPos.top=60;

      setWindowPos(id,g.nextWindowPos.top,g.nextWindowPos.left,w,h,noEffect);
      g.nextWindowPos.top+=d;
      g.nextWindowPos.left+=d;
   }


   function tileWindows()
   {
      var windows=$('.window:visible');
      var desk=$('#desktop');
      var n=windows.length;

      if (desk.data('tiled'))
      {
         for (var i=0;i<n;i++)
         {
            var win=$(windows[i]);
            restoreWindowPos(win);
            win.removeData('maximized');
         }
         desk.removeData('tiled');
         return;
      }

      var inrow=Math.ceil(Math.sqrt(n));
      var rows=Math.ceil(n/inrow);

      var pad=4;
      var w=Math.floor((desk.width()-pad)/inrow);
      var h=Math.floor((desk.height()-pad)/rows);

      for (var i=0;i<n;i++)
      {
         var win=$(windows[i]);

         var left=(i % inrow)*w;
         var top=Math.floor(i/inrow)*h;

         setWindowPos(win,top+pad,left+pad,w-pad,h-pad);
         win.removeData('maximized');
      }

      desk.data('tiled',true);
   }

