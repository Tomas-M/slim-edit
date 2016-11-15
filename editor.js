

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


   function genTableGridHTML(tbl)
   {
      var i,j,n;
      var emptyrow='<tr class=emptyrow>';
      var underline='<tr>';
      var thead='<tr class=tableheader>';
      var data='';
      var html='';

      var prop=g.tables[tbl];
      var rows=g.data[tbl];

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
         if (!rows[i]) { data+=emptyrow; continue; }

         data+='<tr>';
         for (j in prop)
         {
            data+='<td><div class=aroundcell>'+inputHTML(prop[j],rows[i][j])+'<div class=aftercell></div></div></td>';
         }
         data+='</tr>';
      }

      html='<table border=0 data-table="'+serialize(tbl)+'" data-emptyrow="'+serialize(emptyrow)+'" cellspacing=0 cellpadding=0 class=grid>'+thead+data;
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
         row=g.data[lookupTable][i]; if (!row) continue;
         hint=[];
         for(j=0; j<hintColumns.length; j++) hint.push(row[hintColumns[j]]);
         if (hintColumns.length==0) hint=[row[column]];
         if (row[column]) ret[row[column]]=hint.join(" - ");
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
         for (var i=0; i<options.length; i++) html+='<a href=# class="option '+(cell.val()==options[i]?"selected":"")+'">'+htmlspecialchars(options[i])+'</a>';
      }

      // if link exists, it overides any hardcoded options
      if (link)
      {
         link=link.split(',');
         options=autosuggest(link[0],link[1],link.slice(2));
         for (i in options) html+='<a href=# data-set="'+htmlspecialchars(i)+'" class="option '+(cell.val()==i?"selected":"")+'">'+htmlspecialchars(options[i])+'</a>';
      }

      if (html)
      {
         $("#optionsinside").html(html).scrollTop(0);

         $("#options").data('cell',cell).off().on('click',function(ev)
         {
            var t=$(ev.target);
            if (!t.hasClass('option')) return;
            var set=t.data('set');
            if (typeof set === "undefined") set=t.text();
            var o=$('#options');
            var cell=o.data('cell');
            cell.val(set);
            o.css('display','none').removeData('cell');
            cellSave.call(cell);
            ev.preventDefault();
         });

         $('.option').on('mouseover',function(){ $('.option.selected').removeClass('selected'); });

         // scroll to selected value, if any
         var scroll=$('.option.selected').position(); if (scroll) scroll=scroll.top; else scroll=0;
         $('#optionsinside').scrollTop(scroll-$('#options').height()/2);

         // todo: keyboard navigation

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


   function cellSave(ev)
   {
      var cell=$(this);
      var tbl=unserialize(cell.closest('.grid').data('table'));
      var row=cell.closest('tr').index()-1; // first row is header
      var col=cell.closest('td').index();
      var grid=cell.closest('.grid');

      var keys=g.tables[tbl];
      for (var k in keys) { if (col--<1) break; }
      if (!g.data[tbl]) g.data[tbl]=[];
      if (!g.data[tbl][row]) g.data[tbl][row]={};
      g.data[tbl][row][k]=cell.val();

      cell.closest('tr').removeClass('emptyrow');
      if (grid.find('.emptyrow').length<2) grid.append(unserialize(grid.data('emptyrow')));
   }
