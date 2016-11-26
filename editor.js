
   function displayValue(linkto,uniq)
   {
      if (!linkto) return uniq;
      linkto=linkto.split('.');
      var tbl=linkto[0];
      var primary=getTablePrimary(tbl);
      var column=linkto[1];

      var rows=getTableRows(tbl);
      for (var i=0; i<rows.length; i++) if (rows[i]) if (rows[i][primary]==uniq) return rows[i][column];
   }


   function displayValueKey(linkto,val)
   {
      if (!linkto) return val;
      linkto=linkto.split('.');
      var tbl=linkto[0];
      var primary=getTablePrimary(tbl);
      var column=linkto[1];

      var rows=getTableRows(tbl);
      for (var i=0; i<rows.length; i++) if (rows[i][column]==val) return rows[i][primary];
   }


   function inputHTML(name,column,val)
   {
      if (column.linkto) val=displayValue(column.linkto,val);
      var ret=[];
      ret.push('<input type=text class=cell');
      if (val!='') ret.push('value="'+htmlspecialchars(val)+'"');
      if (column["placeholder"]) ret.push('placeholder="'+column["placeholder"]+'"');
      if (column["display"]) ret.push('style="text-align: '+(column["display"])+';"');
      for (var c in column) ret.push('data-'+c+'="'+htmlspecialchars(column[c])+'"');
      ret.push('data-name="'+htmlspecialchars(name)+'"');
      ret.push(">");
      return ret.join(' ');
   }


   function genTableGridHTML(tbl)
   {
      var i,j,n;
      var emptyrow='<tr class=emptyrow>';
      var thead='<tr class=tableheader>';
      var data='';
      var html='';

      var cols=getTableCols(tbl);
      var rows=getTableRows(tbl);

      n=0; for (i in cols) n++;

      for (i in cols) if (cols[i]["display"]!='none')
      {
         thead+='<td style="width: '+(cols[i]["width"]?cols[i]["width"]:'auto')+'; text-align: '+(cols[i]["display"]?cols[i]["display"]:'initial')+';">'+htmlspecialchars(i)+'</td>';
         emptyrow+='<td><div class=aroundcell>'+inputHTML(i,cols[i],'')+'<div class=aftercell></div></div></td>';
      }

      thead+='</tr>';
      emptyrow+='</tr>';

      for (i in rows)
      {
         if (!rows[i]) { data+=emptyrow; continue; }

         data+='<tr>';
         for (j in cols) if (cols[j]["display"]!='none')
         {
            data+='<td><div class=aroundcell>'+inputHTML(j,cols[j],rows[i][j])+'<div class=aftercell></div></div></td>';
         }
         data+='</tr>';
      }

      html='<table border=0 data-table="'+tbl+'" data-emptyrow="'+serialize(emptyrow)+'" cellspacing=0 cellpadding=0 class=grid>'+thead+data;
      for (j=0; j<4; j++) html+=emptyrow; // add some empty rows at the end
      html+='</table>';

      return html;
   }


   function cellValidate(ev)
   {
      var cell=$(this);
      if (cell.data('linkto')){console.log(cell.data()); return;}// todo: in this case check link's datatype not cell's one
      if (cell.data('datatype')=='integer') cell.val(cell.val().replace(/[^0-9]/g,''));
   }


   function autosuggest(lookupTable,column)
   {
      // sanity check
      if (!columnExists(lookupTable,column)) return [];

      var row,i,j,hint;
      var ret={};
      var primary=getTablePrimary(lookupTable);
      var rows=getTableRows(lookupTable);

      for (i=0; i<rows.length; i++)
      {
         row=rows[i]; if (!row) continue;
         if (row[primary]) ret[row[primary]]=row[column];
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
         for (var i=0; i<options.length; i++) html+='<a href=# class="option '+(cell.val()==options[i]?"selected":"")+'" title="'+htmlspecialchars(options[i])+'">'+htmlspecialchars(options[i])+'</a>';
      }

      // if link exists, it overides any hardcoded options
      if (link)
      {
         link=link.split('.');
         options=autosuggest(link[0],link[1]);
         for (i in options) html+='<a href=# data-set="'+htmlspecialchars(i)+'" class="option '+(cell.val()==options[i]?"selected":"")+'" title="'+htmlspecialchars(options[i])+'">'+htmlspecialchars(options[i])+'</a>';
      }

      if (html)
      {
         $("#optionsinside").html(html).scrollTop(0);

         $("#options").data('cell',cell).off().on('mousedown',function(ev){ev.preventDefault();}).on('click',function(ev)
         {
            var t=$(ev.target);
            if (!t.hasClass('option')) return;
            var set=t.data('set');
            if (typeof set === "undefined") set=t.text();
            var o=$('#options');
            var cell=o.data('cell');
            cell.val(set);
            o.css('display','none').removeData('cell');
            cellSave.call(cell,true);
            ev.preventDefault();
         });

         $('.option').on('mouseover',function(){ $('.option.selected').removeClass('selected'); });

         // scroll to selected value, if any
         var scroll=$('.option.selected').position(); if (scroll) scroll=scroll.top; else scroll=0;
         $('#optionsinside').scrollTop(scroll-$('#options').height()/2);

         // todo: keyboard navigation, up/down, keypress will refresh selected

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
      if ($(ev.relatedTarget).closest('.option').length==0)
         $('#options').css('display','none').removeData('cell');
      else $(ev.relatedTarget).click();
   }


   function cellMoved()
   {
      refreshOptionsPosition(true);
   }

   function maximum(rows,col)
   {
      var max=false;
      for (var i=0; i<rows.length; i++) if (rows[i]) if (!max || max<rows[i][col]) max=rows[i][col];
      return max;
   }


   function refreshAllTables()
   {
      $('.grid').each(function(ix,el)
      {
         var tbl=$(el).data('table');
         var rows=getTableRows(tbl);
         var columns=getTableCols(tbl);

         for (var i=0; i<rows.length; i++)
            for(var j in rows[i])
               $(el).find('tr').eq(i+1).find('td [data-name="'+j+'"]').each(function(ix,el)
               {
                  var col=$(el).data('name');
                  $(el).val(displayValue(columns[col].linkto,rows[i][col]));
               });
      });
   }


   function cellSave(ev)
   {
      var cell=$(this);
      var tbl=cell.closest('.grid').data('table');
      var row=cell.closest('tr').index()-1; // first row is header
      var col=cell.data('name');
      var link=cell.data('linkto');
      var grid=cell.closest('.grid');
      var val=cell.val();
      var rows=getTableRows(tbl);

      if (link && ev!==true) val=displayValueKey(link,val);

      if (!rows[row]) rows[row]={};
      rows[row][col]=val;

      if (cell.closest('tr').hasClass('emptyrow'))
      {
//TODO: if editing table with filter and new row was added, fill columns by filter
         var primary=getTablePrimary(tbl);
         if (col!=primary)
         {
            rows[row][primary]=parseInt(maximum(rows,primary))+1;
            cell.closest('tr').find('input[data-name="'+primary+'"]').val(rows[row][primary]);
         }
         cell.closest('tr').removeClass('emptyrow');
      }

      if (grid.find('.emptyrow').length<2) grid.append(unserialize(grid.data('emptyrow')));

      if (link) cell.val(displayValue(link,val));

      // after table row update is complete, refresh all linked columns on other tables which link to this row
      refreshAllTables();
   }
