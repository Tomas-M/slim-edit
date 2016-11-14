
   for (var tbl in g.tables)
   {
      createWindow('window-'+tbl,tbl,genTableGridHTML(g.tables[tbl],g.data[tbl]));
   }

   update_taskbar();
