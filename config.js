
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
    *      "linkto":      string in the form "TableName,valColumnName[,hintColumnName]*"
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
            "linkto": "Services,ID,ID,Name",
            "width": "60px"
         },
         "Packet Type": {
            "datatype": "integer",
            "align": "right",
            "width": "60px"
         },
         "Subtype": {
            "datatype": "integer",
            "align": "right",
            "width": "60px"
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
            "datatype": "text"
         },
         "Type": {
            "datatype": "text",
            "width": "100px",
            "options": "delegated,strange,a,s,d,f,g,h,j,k,l,random"
         },
         "Description": {
            "datatype": "text"
         },
         "Standard ID": {
            "datatype": "integer",
            "align": "right",
            "linkto": "Standards,ID,ID,Name",
            "width": "60px"
         }
         
      },

      "Standards": {
         "ID": {
            "datatype": "integer",
            "align": "right",
            "width": "60px"
         },
         "Name": {
            "datatype": "text"
         },
         "Description": {
            "datatype": "text"
         }
         
      },

      "Parameters": {
         "ID": {
            "datatype": "integer",
            "align": "right",
            "width": "60px"
         },
         "Name": {
            "datatype": "text"
         },
         "Description": {
            "datatype": "text"
         },
         "Lang Type": {
            "datatype": "text"
         },
         "Size": {
            "datatype": "integer",
            "align": "right"
         },
         "Min": {
            "datatype": "text"
         },
         "Max": {
            "datatype": "text"
         },
         "Packet ID": {
            "datatype": "integer",
            "align": "right",
            "linkto": "Packets,ID,ID,Name",
            "width": "60px"
         }
      },

      "Application Packets": {
         "Packet ID": {
            "datatype": "integer",
            "align": "right",
            "linkto": "Packets,ID,ID,Name",
            "width": "60px"
         },
         "IsUser": {
            "datatype": "text",
            "options": "true,false"
         },
         "IsProvider": {
            "datatype": "text",
            "options": "true,false"
         },
         "outEnable": {      
            "datatype": "text"
         },
         "outReady": {
            "datatype": "text"
         },
         "outRepeat": {
            "datatype": "text"
         },
         "inAcceptance": {
            "datatype": "text"
         },
         "inReady": {
            "datatype": "text"
         },
         "outUpdate": {
            "datatype": "text"
         },
         "inStart": {
            "datatype": "text"
         },
         "inProgress": {
            "datatype": "text"
         },
         "inTermination": {
            "datatype": "text"
         },
         "inAbort": {
            "datatype": "text"
         },
         "inUpdate": {
            "datatype": "text"
         }
      }


   };

