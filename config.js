
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
/*
      "Parameters": {
         "ID": {
            "datatype": "integer",
            "align": "right"
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
            "linkTo": "Packets,ID,Name"
         },
         "Order": {
            "datatype": "integer",
            "align": "right"
         }
      },
*/
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


   // ----------------------------------------------------
   // initial data
   // ----------------------------------------------------

   /**  Data definition ***
    *
    *   Put data as array of rows, using column names as defined above
    */

   g.data={

      "Packets":
      [
         { "ID": 1,
           "Service ID": 1,
           "Packet Type": 1,
           "Subtype": 2,
           "Code": "PCK1",
           "Name": "Packet 1",
           "Description": "Long text for packet 1"
         },{ "ID": 2,
           "Service ID": 2,
           "Packet Type": 1,
           "Subtype": 5,
           "Code": "PCK2",
           "Name": "Packet 2",
           "Description": ""
         },{ "ID": 3,
           "Service ID": 5,
           "Packet Type": 1,
           "Subtype": 4,
           "Code": "PCK3",
           "Name": "Packet 3",
           "Description": ""
         },{ "ID": 4,
           "Service ID": 4,
           "Packet Type": 1,
           "Subtype": 5,
           "Code": "PCK4",
           "Name": "Packet 4",
           "Description": ""
         }
      ],

      "Services": 
      [
         { "ID":1,
           "Name":"one",
           "Type":"random",
           "Description":"Service one",
           "Standard ID":3
         },{ "ID":2,
           "Name":"two",
           "Type":"strange",
           "Description":"Service two",
           "Standard ID":23
         },{ "ID":3,
           "Name":"three",
           "Type":"random",
           "Description":"Service three",
           "Standard ID":12
         },{ "ID":4,
           "Name":"four",
           "Type":"strange",
           "Description":"Service four",
           "Standard ID":1
         },{ "ID":5,
           "Name":"five",
           "Type":"strange",
           "Description":"Service five",
           "Standard ID":4
         }
      ]
   };

