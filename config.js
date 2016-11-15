
   // ----------------------------------------------------
   // Table structure definition (see below for data)
   // ----------------------------------------------------

   /**  Column structure options ***
    *
    *   "columnName":
    *   {
    *      "datatype":    text / integer
    *      "align":       left / right / center
    *      "placeholder": string containing help text
    *      "options":     coma separated list of allowed values, which are offered to the user on edit
    *      "linkto":      string in the form "TableName,valColumnName,hintColumnName[,hintColumnName]*"
    *      "width":       string in the form "20%"
    *   }
    *
    */

   g.tables={

      "Packets": {
         "ID": {
            "datatype": "integer",
            "align": "right"
         },
         "Service ID": {
            "datatype": "integer",
            "align": "right",
            "linkto": "Services,ID,ID,Name"
         },
         "Packet Type": {
            "datatype": "integer",
            "align": "right"
         },
         "Subtype": {
            "datatype": "integer",
            "align": "right"
         },
         "Code": {
            "datatype": "text"
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
            "datatype": "integer",
            "align": "right",
            "width": "60px"
         },
         "Name": {
            "datatype": "text",
         },
         "Type": {
            "datatype": "text",
            "width": "100px",
            "options": "random,delegated,strange"
         },
         "Description": {
            "datatype": "text"
         },
         "Standard ID": {
            "datatype": "integer",
            "align": "right",
            "linkto": "Standard,ID,Name",
            "width": "60px"
         },
         
      }

   };

