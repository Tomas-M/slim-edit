
   function putToFront(ev)
   {
      var max=11;
      var topwindow;
      $('.window:not(.closed)').each(function(ix,el)
      {
         var cur=$(el).css('z-index');
         if (cur>max || !topwindow) topwindow=$(el).attr('id');
         max=Math.max(max,cur);
      });

      if (typeof ev === "undefined") ev=topwindow;
      if (typeof ev === "undefined") return;
      if ($(ev.target).hasClass('window-title-button')) return;
      if ($(ev.target).closest('.window-title-button').length>0) return;
      if ($(ev.target).hasClass('taskname')) ev=$(ev.target).data('windowid');

      var win=getEl(ev,'window');
      if (!win.hasClass('topmost')) win.css('z-index',max+1);

      $('.window').removeClass('topmost');
      win.addClass('topmost');
      win.css({'display':'block'});

      if (win.hasClass('closed'))
      {
         win.removeClass('closed');
         tileWindows(true);
      }

      setTimeout(function(){win.css({'opacity':1});},0);
      taskbarRefresh();
   }


   function createWindow(title,subtitle,contentHTML,isPersistent)
   {
      var wid='window-'+(g.window_id++);
      var html='<div class="window closed '+(isPersistent?'persistent':'')+'" id="'+wid+'" style="z-index:10; opacity:0; ">'
      +'<div class="window-title-button window-close"><i class="fa fa-times"></i></div>'
      +'<div class="window-title-button window-maximize"><i class="fa fa-window-maximize"></i></div>'
      +'<div class=header>'+htmlspecialchars(title)+(subtitle?'<span class=subtitle> &nbsp;'+subtitle+'</span>':'')+'</div>'
      
      +'<div class=content>'+contentHTML+'</div></div>';
      $('#desktop').append(html);

      win=getEl(wid);
      setWindowPosAuto(win,true);

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

      putToFront(win);
      return wid;
   }


   function updateWindow(wid,title,subtitle,content)
   {
      win=getEl(wid);
      win.find('.content').html(content);
      win.find('.header').html(htmlspecialchars(title)+(subtitle?'<span class=subtitle> &nbsp;'+subtitle+'</span>':''));
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
      if (!win.hasClass('persistent')) taskbarRemove(win);

      setTimeout(function()
      {
         if (win.hasClass('persistent')) win.css('display','none');
         else {  win.remove(); }
      },g.effectDuration);

      putToFront();
      taskbarRefresh();
      tileWindows(true);
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
      var w=Math.floor(sw/1.4); if (w<800) w=800;
      var h=Math.floor(sh/2);

      if (g.nextWindowPos.left+w>sw) g.nextWindowPos.left=60;
      if (g.nextWindowPos.top+h>sh) g.nextWindowPos.top=60;

      setWindowPos(id,g.nextWindowPos.top,g.nextWindowPos.left,w,h,noEffect);
      g.nextWindowPos.top+=d;
      g.nextWindowPos.left+=d;
   }


   function tileWindows(retileIfTiled)
   {
      var windows=$('.window:visible').not('.closed');
      var desk=$('#desktop');
      var n=windows.length;
      var isTiled=desk.data('tiled');

      if (retileIfTiled)
      {
         if (!isTiled) return;
         isTiled=false;
      }

      // undo tile
      if (isTiled)
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

      // do tile
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

