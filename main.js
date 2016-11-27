
//   localStorage.clear();

   function init()
   {
      var tables=getTables();
      for (var tbl in tables)
         if (tables[tbl].showOnStartup)
            createWindow(serialize(tbl),tbl,genTableGridHTML(tbl));
   }

   init();
   update_taskbar();
