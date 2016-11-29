
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
    *             showOnStartup: true/false
    *          }
    *
    */

   /**  Column structure options ***
    *
    *   "columnName":
    *   {
    *      "datatype":    integer / text / longtext
    *      "display":     left / right / center / none
    *      "placeholder": string containing help text
    *      "options":     coma separated list of allowed values, which are offered to the user on edit
    *      "linkto":      string in the form "TableName.displayValueColumnName". Link is always against primary column from TableName
    *      "width":       string in the form "20%"
    *   }
    *
    */

   g.tables={

      "Standards": {
         "columns":{
            "ID": {
               "datatype": "integer",
               "display": "none",
               "width": "60px"
            },
            "Name": {
               "datatype": "text"
            },
            "Description": {
               "datatype": "longtext"
            },
            "Parent":{
               "datatype": "integer",
               "linkto": "Standards.Name"
            }
         },
         "rows":[],
         "primary": "ID",
         "showOnStartup":true
      },

      "Services": {
         "columns": {
            "ID": {
               "datatype": "integer",
               "display": "none",
               "width": "60px"
            },
            "Standard": {
               "datatype": "integer",
               "linkto": "Standards.Name"
            },
            "Name": {
               "datatype": "text"
            },
            "Description": {
               "datatype": "longtext"
            },
            "Type": {
               "datatype": "text",
               "width": "100px"
            }
         },
         "rows":[],
         "primary": "ID",
         "showOnStartup":false
      },

      "Packets": {
         "columns": {
            "ID": {
               "datatype": "integer",
               "display": "none"
            },
            "Standard": {
               "datatype": "integer",
               "linkto": "Standards.Name",
            },
            "Parameter": {
               "datatype": "integer",
               "linkto": "Parameters.Name",
            },
            "Kind": {
               "datatype": "integer",
               "display": "right",
            },
            "Type": {
               "datatype": "integer",
               "display": "right",
            },
            "Subtype": {
               "datatype": "integer",
               "display": "right",
            },
            "Name": {
               "datatype": "text"
            },
            "Description": {
               "datatype": "longtext"
            },
            "DescParam": {
               "datatype": "longtext"
            },
            "DescDest": {
               "datatype": "longtext"
            },
            "Code": {
               "datatype": "text"
            }
         },
         "rows":[],
         "primary": "ID",
         "showOnStartup":false
      },

      "Parameters": {
         "columns":{
            "ID": {
               "datatype": "integer",
               "display": "none",
               "width": "60px"
            },
            "Standard":{
               "datatype": "integer",
               "linkto": "Standards.Name"
            },
            "Type":{
               "datatype": "integer",
               "linkto": "ParamTypes.Name"
            },
            "Name": {
               "datatype": "text"
            },
            "Description": {
               "datatype": "longtext"
            },
            "Value":{
               "datatype": "text"
            },
            "Size":{
               "datatype": "integer",
               "display": "right"
            },
            "Order":{
               "datatype": "integer",
               "display": "right"
            },
            "Group":{
               "datatype": "integer",
               "display": "right"
            },
            "Parent":{
               "datatype": "integer",
               "linkto": "Parameters.Name"
            }
         },
         "rows":[],
         "primary": "ID",
         "showOnStartup":false
      },

      "ParamTypes":{
         "columns":{
            "ID": {
               "datatype": "integer",
               "display": "none",
               "width": "60px"
            },
            "Domain": {
               "datatype": "text"
            },
            "Name": {
               "datatype": "text"
            },
            "Size": {
               "datatype": "integer",
               "display": "right"
            }
         },
         "rows":[],
         "primary": "ID",
         "showOnStartup":false
      },

      "Limits":{
         "columns":{
            "ID": {
               "datatype": "integer",
               "display": "none",
               "width": "60px"
            },
            "Parameter": {
               "datatype": "integer",
               "linkto": "Parameters.Name"
            },
            "Type": {
               "datatype": "integer",
               "display": "right"
            },
            "lvalue": {
               "datatype": "text"
            },
            "hvalue": {
               "datatype": "text"
            }
         },
         "rows":[],
         "primary": "ID",
         "showOnStartup":false
      },

      "Applications": {
         "columns":{
            "ID": {
               "datatype": "integer",
               "display": "none",
               "width": "60px"
            },
            "Name": {
               "datatype": "text"
            },
            "Description": {
               "datatype": "longtext"
            }
         },
         "rows":[],
         "primary": "ID",
         "showOnStartup":true
      },

      "Processes": {
         "columns":{
            "ID": {
               "datatype": "integer",
               "display": "none",
               "width": "60px"
            },
            "Application":{
               "datatype": "integer",
               "linkto": "Applications.Name"
            },
            "APID":{
               "datatype": "text"
            }
         },
         "rows":[],
         "primary": "ID",
         "showOnStartup":false
         
      },


      "ProcessPackets": {
         "columns":{
            "ID": {
               "datatype": "integer",
               "display": "none",
               "width": "60px"
            },
            "Process": {
               "datatype": "integer",
               "linkto": "Processes.APID"
            },
            "Packet": {
               "datatype": "integer",
               "linkto": "Packets.Name"
            },
            "isSource": {
               "datatype": "text",
               "options": "true,false"
            },
            "isSink": {
               "datatype": "text",
               "options": "true,false"
            }
         },
         "rows":[],
         "primary": "ID",
         "showOnStartup":false
      },


      "ProcessPacketSettings": {
         "columns":{
            "ID": {
               "datatype": "integer",
               "display": "none",
               "width": "60px"
            },
            "Process": {
               "datatype": "integer",
               "linkto": "Processes.Name"
            },
            "Packet": {
               "datatype": "integer",
               "linkto": "Packets.Name"
            },
            "Setting": {
               "datatype": "integer",
               "linkto": "Settings.Name"
            },
            "Value": {
               "datatype": "text"
            }
         },
         "rows":[],
         "primary": "ID",
         "showOnStartup":false
      },


      "AppSettings": {
         "columns":{
            "ID": {
               "datatype": "integer",
               "display": "none",
               "width": "60px"
            },
            "Application": {
               "datatype": "integer",
               "linkto": "Applications.Name"
            },
            "Setting": {
               "datatype": "integer",
               "linkto": "Settings.Name"
            },
            "Value": {
               "datatype": "text"
            }
         },
         "rows":[],
         "primary": "ID",
         "showOnStartup":false
      },


      "Settings": {
         "columns":{
            "ID": {
               "datatype": "integer",
               "display": "none",
               "width": "60px"
            },
            "Domain": {
               "datatype": "text"
            },
            "Name": {
               "datatype": "text"
            },
            "Description": {
               "datatype": "longtext"
            },
            "Default": {
               "datatype": "longtext"
            },
            "Type":{
               "datatype": "text"
            }
         },
         "rows":[],
         "primary": "ID",
         "showOnStartup":false
      },


      "Components": {
         "columns":{
            "ID": {
               "datatype": "integer",
               "display": "none",
               "width": "60px"
            },
            "Short name": {
               "datatype": "text"
            },
            "Name": {
               "datatype": "text"
            },
            "Description": {
               "datatype": "longtext"
            }
         },
         "rows":[],
         "primary": "ID",
         "showOnStartup":false
      },


      "AppComponents": {
         "columns":{
            "ID": {
               "datatype": "integer",
               "display": "none",
               "width": "60px"
            },
            "Application": {
               "datatype": "integer",
               "linkto": "Applications.Name"
            },
            "Component": {
               "datatype": "integer",
               "linkto": "Components.Name"
            }
         },
         "rows":[],
         "primary": "ID",
         "showOnStartup":false
      },


      "Features": {
         "columns":{
            "ID": {
               "datatype": "integer",
               "display": "none",
               "width": "60px"
            },
            "Component":{
               "datatype": "integer",
               "linkto": "Components.Name"
            },
            "Short name": {
               "datatype": "text"
            },
            "Name": {
               "datatype": "text"
            },
            "Description": {
               "datatype": "longtext"
            }
         },
         "rows":[],
         "primary": "ID",
         "showOnStartup":false
      },

      "AppFeatures": {
         "columns":{
            "ID": {
               "datatype": "integer",
               "display": "none",
               "width": "60px"
            },
            "Application": {
               "datatype": "integer",
               "linkto": "Applications.Name"
            },
            "Feature": {
               "datatype": "integer",
               "linkto": "Features.Name"
            }
         },
         "rows":[],
         "primary": "ID",
         "showOnStartup":false
      }

   };

