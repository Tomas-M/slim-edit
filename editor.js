

   function inputHTML(cell,val)
   {
      var ret=[];
      ret.push('<input class=cell');
      if (val!='') ret.push('value="'+htmlspecialchars(val)+'"');
      if (cell["placeholder"]) ret.push('placeholder="'+cell["placeholder"]+'"');
      if (cell["align"]) ret.push('style="text-align: '+(cell["align"])+';"');
      for (var c in cell) ret.push('data-'+c+'="'+htmlspecialchars(cell[c])+'"');
      ret.push(">");
      return ret.join(' ');
   }


   function genTableGridHTML(prop,rows)
   {
      var i,j,n;
      var emptyrow='<tr>';
      var underline='<tr>';
      var thead='<tr class=tableheader>';
      var data='';
      var html='';

      n=0; for (i in prop) n++;

      for (i in prop)
      {
         thead+='<td style="width: '+(prop[i]["width"]?prop[i]["width"]:'auto')+'; text-align: '+(prop[i]["align"]?prop[i]["align"]:'initial')+';">'+htmlspecialchars(i)+'</td>';
         emptyrow+='<td><div class=aroundcell>'+inputHTML(prop[i],'')+'<div class=aftercell></div></div></td>';
         underline+='<td></td>';
      }

      thead+='</tr>';
      emptyrow+='</tr>';
      underline+='</tr>';

      for (i in rows)
      {
         data+='<tr>';
         for (j in prop)
         {
            data+='<td><div class=aroundcell>'+inputHTML(prop[j],rows[i][j])+'<div class=aftercell></div></div></td>';
         }
         data+='</tr>';
      }

      html='<table border=0 cellspacing=0 cellpadding=0 class=grid>'+thead+data;
      for (j=0; j<4; j++) html+=emptyrow; // add some empty rows at the end
      html+='</table>';

      return html;
   }


   function cellValidate(ev)
   {
      var cell=$(this);
      if (cell.data('datatype')=='integer') cell.val(cell.val().replace(/[^0-9]/g,''));
   }


   function autosuggest(lookupTable,column,hintColumns)
   {
      // sanity check
      if (!(lookupTable && g.tables[lookupTable] && column && g.tables[lookupTable][column])) return [];

      var row,i,j,hint;
      var ret={};

      for (i=0; i<g.data[lookupTable].length; i++)
      {
         row=g.data[lookupTable][i];
         hint=[];
         for(j=0; j<hintColumns.length; j++) hint.push(row[hintColumns[j]]);
         if (hintColumns.length==0) hint=[row[column]];
         ret[row[column]]=hint.join(" - ");
      }

      return ret;
   }


   function cellFocus(ev)
   {
      var html='';
      var cell=$(this);
      var options=cell.data('options');
      var link=cell.data('linkto');
      var i;

      // hardcoded options are considered first
      if (options)
      {
         options=options.split(',');
         for (var i=0; i<options.length; i++) html+='<a href=# class=option>'+htmlspecialchars(options[i])+'</a>';
      }

      // if link exists, it overides any hardcoded options
      if (link)
      {
         link=link.split(',');
         options=autosuggest(link[0],link[1],link.slice(2));
         for (i in options) html+='<a href=# data-set='+htmlspecialchars(i)+' class=option>'+htmlspecialchars(options[i])+'</a>';
      }


      if (html)
      {
         $("#optionsinside").html(html);

         $("#options").data('cell',cell).off().on('click',function(ev)
         {
            var t=$(ev.target);
            if (!t.hasClass('option')) return;
            var set=t.data('set');
            if (typeof set === "undefined") set=t.text();
            var o=$('#options');
            o.data('cell').val(set);
            o.css('display','none').removeData('cell');
            ev.preventDefault();
         });

         refreshOptionsPosition();
      }
   }


   function refreshOptionsPosition(noEffect)
   {
      var options=$('#options');
      var cell=options.data('cell');
      if (!cell) return;

      options.width(cell.width()+22);
      options.removeClass('autoanimated');
      options.css({'display':'block','opacity':0,'left':cell.offset().left-1, 'top':cell.offset().top-21,'z-index':cell.closest('.window').css('z-index')+1});

      if (noEffect)
         options.css('opacity',1);
      else
         setTimeout(function(){ options.addClass('autoanimated'); options.css('opacity',1);},0);
   }


   function cellBlur(ev)
   {
      if ($(ev.relatedTarget).closest('#options').length==0)
         $('#options').css('display','none').removeData('cell');
      else $(ev.relatedTarget).click();
   }


   function cellMoved()
   {
      refreshOptionsPosition(true);
   }
