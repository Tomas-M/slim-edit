
   // convert string so it can be printed in html safely
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
   function getEl(par,closestClass)
   {
      if (typeof par === "undefined") return false;
      if (typeof par === "string" && !par.match(/^#/)) par=$('#'+par);
      if ($(par.target).length>0) par=$(par.target); else par=$(par);
      if (typeof closestClass === "string") if (!par.hasClass(closestClass)) par=par.closest('.'+closestClass);
      return par;
   }


