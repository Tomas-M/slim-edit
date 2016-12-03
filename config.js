
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
    *             properties: {...}
    *          }
    *
    *     properties are:
    *             showOnStartup: true/false
    *             label: string to display instead of table name on buttons
    *             version: table definition version, like 1.0
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
            "Parent": {
               "datatype": "integer",
               "linkto": "Standards.Name"
            }
         },
         "rows":[],
         "primary": "ID",
         "properties": {
            "showOnStartup":true,
            "version": 1.0
         }
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
         "properties": {
            "showOnStartup":false,
            "version": 1.0
         }
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
         "properties": {
            "showOnStartup":false,
            "version": 1.0
         }
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
               "linkto": "ParameterTypes.Name"
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
         "properties": {
            "showOnStartup":false,
            "version": 1.0
         }
      },

      "ParameterTypes":{
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
         "properties":
         {
            "showOnStartup":false,
            "label": "Types",
            "version": 1.0
         }
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
         "properties": {
            "showOnStartup":false,
            "version": 1.0
         }
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
         "properties": {
            "showOnStartup":true,
            "version": 1.0
         }
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
         "properties": {
            "showOnStartup":false,
            "version": 1.0
         }
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
         "properties":
         {
            "showOnStartup":false,
            "label": "Packets",
            "version": 1.0
         }
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
         "properties":
         {
            "showOnStartup":false,
            "label": "Packet Settings",
            "version": 1.0
         }
      },


      "ApplicationSettings": {
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
         "properties":
         {
            "showOnStartup":false,
            "label": "Settings",
            "version": 1.0
         }
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
         "properties": {
            "showOnStartup":false,
            "version": 1.0
         }
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
         "properties": {
            "showOnStartup":false,
            "version": 1.0
         }
      },


      "ApplicationComponents": {
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
         "properties":
         {
            "showOnStartup":false,
            "label": "Components",
            "version": 1.0
         }
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
         "properties": {
            "showOnStartup":false,
            "version": 1.0
         }
      },

      "ApplicationFeatures": {
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
         "properties":
         {
            "showOnStartup":false,
            "label": "Features",
            "version": 1.0
         }
      }

   };

