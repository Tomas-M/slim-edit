
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


   function getColumn(tbl,column)
   {
      if (!tableExists(tbl)) return false;
      if (column && g.tables[tbl]['columns'][column]) return g.tables[tbl]['columns'][column];
      return false;
   }


   function getTableRows(tbl)
   {
      if (!tableExists(tbl)) return false;
      return g.tables[tbl]["rows"];
   }


   function getTableCols(tbl)
   {
      if (!tableExists(tbl)) return false;
      return g.tables[tbl]['columns'];
   }


   function getTableLinks(tbl)
   {
      var res=[];

      if (!tableExists(tbl)) return false;
      for (var table in g.tables)
      {
         var columns=getTableCols(table);
         for (var col in columns)
         {
            var link=parseLink(columns[col].linkto);
            if (link && link.table==tbl) res.push({'table':table,'column':col});
         }
      }

      return res;
   }

