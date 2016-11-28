
   function main()
   {
      var tables=getTables();
      for (var tbl in tables)
         if (tables[tbl].showOnStartup)
         {
            var w_id=createWindow(tbl,'',genTableGridHTML(tbl),true);
            taskbarAdd(w_id,tbl);
         }
   }
