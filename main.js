
   localStorage.clear();

   for (var tbl in g.tables)
   {
      createWindow(serialize(tbl),tbl,genTableGridHTML(tbl));
   }

   update_taskbar();
