
   function getTables()
   {
      return g.tables;
   }


   function getTablePrimary(tbl)
   {
      if (!tbl || !g.tables[tbl]) return false;
      return g.tables[tbl]["primary"];
   }


   function tableExists(tbl)
   {
      if (tbl && g.tables[tbl]) return true;
      return false;
   }
   

   function columnExists(tbl,column)
   {
      if (!tableExists(tbl)) return false;
      if (column && g.tables[tbl]['columns'][column]) return true;
      return false;
   }


   function getTableRows(tbl)
   {
      if (!tbl || !g.tables[tbl]) return false;
      return g.tables[tbl]["rows"];
   }


   function getTableCols(tbl)
   {
      return g.tables[tbl]['columns'];
   }


