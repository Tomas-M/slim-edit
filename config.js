
   // ----------------------------------------------------
   // Table structure definition (see below for data)
   // ----------------------------------------------------

   /**
    *   Every table must have one (and only one) column as primary (for ID)
    *
    *
    *
    */

   /**  Column structure options ***
    *
    *   "columnName":
    *   {
    *      "datatype":    text / integer / primary
    *      "align":       left / right / center
    *      "placeholder": string containing help text
    *      "options":     coma separated list of allowed values, which are offered to the user on edit
    *      "linkto":      string in the form "TableName.displayValueColumnName". Link is always against primary column from TableName
    *      "width":       string in the form "20%"
    *   }
    *
    */

   g.tables={

      "Packets": {
         "ID": {
            "datatype": "primary",
            "align": "right"
         },
         "Service": {
            "datatype": "integer",
            "linkto": "Services.Name",
         },
         "Packet Type": {
            "datatype": "integer",
            "align": "right",
         },
         "Subtype": {
            "datatype": "integer",
            "align": "right",
         },
         "Code": {
            "datatype": "text",
         },
         "Name": {
            "datatype": "text"
         },
         "Description": {
            "datatype": "text"
         }
      },

      "Services": {
         "ID": {
            "datatype": "primary",
            "align": "right",
            "width": "60px"
         },
         "Name": {
            "datatype": "text"
         },
         "Type": {
            "datatype": "text",
            "width": "100px",
            "options": "delegated,strange,random"
         },
         "Description": {
            "datatype": "text"
         }
      }

   };

