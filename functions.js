
   // convert string so it can be printed in html safely
   //
   function htmlspecialchars(text)
   {
      if (typeof text === "undefined") return "";
      text=text+"";

      var map = {
                  '&': '&amp;',
                  '<': '&lt;',
                  '>': '&gt;',
                  '"': '&quot;',
                  "'": '&#039;'
                };

      return text.replace(/[&<>"']/g, function(m) { return map[m]; }); //"
   }


   // get element by either id, event, or combination with closest class
   //
   function getEl(par,closestClass)
   {
      if (typeof par === "undefined") return false;
      if (typeof par === "string" && !par.match(/^#/)) par=$('#'+par);
      if ($(par.target).length>0) par=$(par.target); else par=$(par);
      if (typeof closestClass === "string") if (!par.hasClass(closestClass)) par=par.closest('.'+closestClass);
      return par;
   }


   // parse json string into object
   //
   function JSON_fromString(str)
   {
      var res;
      try { res=JSON.parse(str); } catch(err) { return {} };
      return res;
   }


   // stringify object to string
   //
   function JSON_toString(obj)
   {
      return JSON.stringify(obj);
   }


   // serialize arbitrary data to special base64
   //
   function serialize(t)
   {
      return btoa(unescape(encodeURIComponent(JSON_toString(t)))).replace(/[/]/g,"_").replace(/[+]/g,"-").replace(/[=]/g,"");
   }


   // un serialize special base64 to data
   //
   function unserialize(t)
   {
      if (!t) return false;
      return JSON_fromString(decodeURIComponent(escape(atob(t.replace(/[_]/g,"/").replace(/[-]/g,"+")))));
   }


   // clone tables definitions and return it
   //
   function getNewTables()
   {
      return JSON_fromString(JSON_toString(g.tablesDEF))
   }


   // display progress indicator (spinning wheel)
   //
   function inProgress(start)
   {
      if (start)
      {
         $('#progress').addClass('visible');
         // todo: disable user to click with mouse and press keys
      }
      else
      {
         $('#progress').removeClass('visible');
         // todo: re-enable user to click and type
      }
   }


   // print error message to the user, using bubble
   function msg(t,style)
   {
      if (typeof style == "undefined") style='info';
      var el=$("<div class='message "+(style?htmlspecialchars(style):'')+"'><span class=msgclose>&times;</span>"+htmlspecialchars(t)+"</div>");
      setTimeout(function(){ hideMsg(el); },10000);
      $('#messages').append(el);
      setTimeout(function(){el.css('opacity',0.9);},100);
   }


   // hide message if user clicks it
   function hideMsg(el)
   {
      if (!el) el=$(this);
      if (el.target) el=$(el.target);
      if (el.closest('.message').length>0) el=el.closest('.message');
      $(el).css('opacity',0);
      setTimeout(function(){ el.css('display','none'); },g.effectDuration);
   }


   // REQUEST jquery extension, for easier AJAX
   //
   (function($){

     var requestCounter=0;
     $.request = function(target, data, success, err)
     {
        inProgress(true);
        requestCounter++;
        if (typeof err == "undefined") err=function(t){ msg(t,'danger'); };
        if (!err) err=function(){};
        if (err===true) err=success;

        $.post(target, data, function(res)
        {
           requestCounter--;
           if (requestCounter==0) inProgress(false);

           res=JSON_fromString(res);
           console.log(res);
           if (res.status=='ok')
           {
              // call success function
              if (typeof success == 'function') success(res.data);
           }
           else if (res.status=='error') { err(res.data); }
           else if (res.status=='unsigned') { err(res.status); }
           else err();
        }).fail(function(res)
        {
            requestCounter--;
            if (requestCounter==0) inProgress(false);
            err();
        })
     }

   })(jQuery);
