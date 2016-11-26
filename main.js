
//   localStorage.clear();

   function init()
   {
      for (var tbl in g.tables)
      {
         createWindow(serialize(tbl),tbl,genTableGridHTML(tbl));
      }
   }

   init();
   update_taskbar();
