
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


   function setTableCol(tbl,row,col,val,filter)
   {
      var rows=getTableRows(tbl);
      var primary=getTablePrimary(tbl);
      var max=0;

      for (var i=0; i<rows.length; i++)
      {
         if (parseInt(rows[i][primary])>max) max=parseInt(rows[i][primary]);
         if (rows[i][primary]==parseInt(row)) break;
      }

      if (!rows[i]) // row not found, add primary
      {
         rows[i]={};
         rows[i][primary]=max+1;

         if (filter && !$.isEmptyObject(filter))
            for(var j=0; j<filter.length; j++)
               rows[i][filter[j]['column']]=filter[j]['value'];
      }

      rows[i][col]=val;
      return rows[i][primary];
   }
