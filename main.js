
   for (var tbl in g.tables)
   {
      createWindow(serialize(tbl),tbl,genTableGridHTML(g.tables[tbl],g.data[tbl]));
   }

   update_taskbar();
