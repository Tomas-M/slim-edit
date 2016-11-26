
   // ----------------------------------------------------
   // Table structure definition
   // ----------------------------------------------------

   /**
    *   Every table must have one (and only one) column as primary (for ID)
    *
    *   Table: {
    *             columns: {...},
    *             rows: [...],
    *             primary: "columnName",
    *             menu: true/false
    *          }
    *
    */

   /**  Column structure options ***
    *
    *   "columnName":
    *   {
    *      "datatype":    integer / string / text / button
    *      "display":     left / right / center / none
    *      "placeholder": string containing help text
    *      "options":     coma separated list of allowed values, which are offered to the user on edit
    *      "linkto":      string in the form "TableName.displayValueColumnName". Link is always against primary column from TableName
    *      "width":       string in the form "20%"
    *   }
    *
    */

   g.tables={

      "Packets": {
         "columns": {
            "ID": {
               "datatype": "integer",
               "display": "none"
            },
            "Service": {
               "datatype": "integer",
               "linkto": "Services.Name",
            },
            "Packet Type": {
               "datatype": "integer",
               "display": "right",
            },
            "Subtype": {
               "datatype": "integer",
               "display": "right",
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
         "rows":[],
         "primary": "ID",
         "menu":true
      },

      "Services": {
         "columns": {
            "ID": {
               "datatype": "integer",
               "display": "none",
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
         },
         "rows":[],
         "primary": "ID",
         "menu":true
      }

   };

