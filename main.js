
   localStorage.clear();

   function main()
   {
      var tables=getTables();
      var container = $("#tablelist");

      for (var tbl in tables)
      {
         if (tables[tbl].properties.showOnStartup)
         {
            var w_id=createWindow(tbl,'',genTableGridHTML(tbl));
            taskbarAdd(w_id,tbl);
         }

         container.append('<li class="tablename '+(tables[tbl].properties.showOnStartup?'active':'')+'" data-table="'+htmlspecialchars(tbl)+'"><i class="fa fa-table"></i> &nbsp;'+htmlspecialchars(tbl)+(getTableRows(tbl).length>0?' ('+getTableRows(tbl).length+')':'')+'</li>');
      }

      var li = container.children('li');

      li.sort(function(a,b)
      {
         var an=$.trim($(a).text());
         var bn=$.trim($(b).text());
         if(an > bn) return 1;
         if(an < bn) return -1;
         return 0;
      });

      li.detach().appendTo(container);
   }
