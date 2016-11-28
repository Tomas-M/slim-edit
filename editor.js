
   function coalesce(v1,v2)
   {
      if (typeof v1 == "undefined") return v2;
      else return v1;
   }


   function parseLink(linktoString)
   {
      if (!linktoString) return false;
      var parsed=linktoString.split('.');
      if (parsed[1]) return { 'table': parsed[0], 'column': parsed[1] };
      else return false;
   }


   function displayValue(link,uniq)
   {
      link=parseLink(link);
      if (!link) return uniq;
      var primary=getTablePrimary(link.table);

      var rows=getTableRows(link.table);
      for (var i=0; i<rows.length; i++) if (rows[i]) if (rows[i][primary]==uniq) return coalesce(rows[i][link.column],'');
      return '';
   }


   function displayValueKey(link,val)
   {
      link=parseLink(link);
      if (!link) return val;
      var primary=getTablePrimary(link.table);

      var rows=getTableRows(link.table);
      for (var i=0; i<rows.length; i++) if (rows[i][link.column]==val) return coalesce(rows[i][primary],'');
      return '';
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
      var links=getTableLinks(tbl);
      var primary=getTablePrimary(tbl);

      n=0; for (i in cols) n++;

      for (i in cols) if (cols[i]["display"]!='none')
      {
         thead+='<td style="width: '+(cols[i]["width"]?cols[i]["width"]:'auto')+'; text-align: '+(cols[i]["display"]?cols[i]["display"]:'initial')+';">'+htmlspecialchars(i)+'</td>';
         emptyrow+='<td><div class=aroundcell>'+inputHTML(i,cols[i],'')+'<div class=aftercell></div></div></td>';
      }

      for (i in links)
      {
         links[i].btn='<button class=linkbutton data-table="'+htmlspecialchars(links[i].table)+'" data-column="'+htmlspecialchars(links[i].column)+'">'+htmlspecialchars(links[i].table)+'</button>';
         thead+='<td style="width:70px">'+htmlspecialchars(links[i].table)+'</td>';
         emptyrow+='<td>'+links[i].btn+'</td>';
      }

      thead+='</tr>';
      emptyrow+='</tr>';

      for (i in rows)
      {
         if (!rows[i]) { data+=emptyrow; continue; }

         data+='<tr data-primary="'+htmlspecialchars(rows[i][primary])+'">';

         for (j in cols) if (cols[j]["display"]!='none')
            data+='<td><div class=aroundcell>'+inputHTML(j,cols[j],rows[i][j])+'<div class=aftercell></div></div></td>';

         for (j in links)
            data+='<td>'+links[j].btn+'</td>';

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


   function autosuggest(tbl,column)
   {
      // sanity check
      if (!columnExists(tbl,column)) return [];

      var row,i,j,hint;
      var ret={};
      var rev={};
      var primary=getTablePrimary(tbl);
      var rows=getTableRows(tbl);

      for (i=0; i<rows.length; i++)
      {
         row=rows[i]; if (!row) continue;
         if (row[primary])
         {
            if (rev[row[column]]!=1)
            {
               ret[row[primary]]=row[column];
               rev[row[column]]=1;
            }
         }
      }

      return ret;
   }


   function cellFocus(ev)
   {
      var html='';
      var cell=$(this);
      var options=cell.data('options');
      var link=cell.data('linkto');
      var tbl=cell.closest('.grid').data('table');
      var name=cell.data('name');
      var i;

      // hardcoded options are considered first
      if (options)
      {
         if (options===true) options=autosuggest(tbl,name);
         else options=options.split(',');
         for (i in options) html+='<a href=# class="option '+(cell.val()==options[i]?"selected":"")+'" title="'+htmlspecialchars(options[i])+'">'+htmlspecialchars(options[i])+'</a>';
      }

      // if link exists, it overides any hardcoded options
      if (link)
      {
         link=parseLink(link);
         options=autosuggest(link.table,link.column);
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


   function refreshAllTables()
   {
      $('.grid').each(function(ix,el)
      {
         var tbl=$(el).data('table');
         var rows=getTableRows(tbl);
         var columns=getTableCols(tbl);
         var primary=getTablePrimary(tbl);

         for (var i=0; i<rows.length; i++)
            for(var j in rows[i])
               $(el).find('tr[data-primary="'+rows[i][primary]+'"]').find('td [data-name="'+j+'"]').each(function(ix,el)
               {
                  var col=$(el).data('name');
                  $(el).val(displayValue(columns[col].linkto,rows[i][col]));
               });
      });
   }


   function openSubtable()
   {
      var t=$(this);
      var tbl=t.data('table');
      var col=t.data('column');
      var id=t.closest('tr').data('primary');
      var comment=col+'='+displayValue(getColumn(tbl,col).linkto,id);

      // TODO: reuse window if open for the same table (even if different filter?)
      var wid=createWindow(tbl,comment,genTableGridHTML(tbl,[{'column':col,'value':id}]));
      taskbarAdd(wid,tbl+' for '+comment);
   }


   function cellSave(ev)
   {
      var cell=$(this);
      var tbl=cell.closest('.grid').data('table');
      var row=cell.closest('tr').data('primary');
      var col=cell.data('name');
      var link=cell.data('linkto');
      var grid=cell.closest('.grid');
      var val=cell.val();

      if (link && ev!==true) val=displayValueKey(link,val);
      if (link) cell.val(displayValue(link,val));

      // TODO: if editing table with filter and new row was added, fill columns by filter
      var primary=setTableCol(tbl,row,col,val);

      if (cell.closest('tr').hasClass('emptyrow'))
      {
         cell.closest('tr').attr('data-primary',primary); // set data using attr here, so we can use [data-primary] jquery selector in refresh()
         cell.closest('tr').removeClass('emptyrow');
      }

      if (grid.find('.emptyrow').length<2) grid.append(unserialize(grid.data('emptyrow')));

      // after table row update is complete, refresh all linked columns on other tables which link to this row
      refreshAllTables();
   }
