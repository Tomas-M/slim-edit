
   // ----------------------------------------------------
   // initial data
   // ----------------------------------------------------

   /**  Data definition ***
    *
    *   Put data as array of rows, using column names as defined in config.js
    *   It is perfectly fine if this file is empty. It serves only as an initial data set as an example
    */

   g.tables["Applications"]["rows"]=
   [
      { "ID": 1,
        "Name":"Master application",
        "Description":"can enable and disable temperature monitoring and can set the temperature thresholds"
      },
      { "ID": 2,
        "Name":"Slave 1 application",
        "Description":"responsible for monitoring a temperature measurement and for raising an alarm if the temperature exceeds a predefined threshold"
      },
      { "ID": 3,
        "Name":"Slave 2 application",
        "Description":"responsible for monitoring a temperature measurement and for raising an alarm if the temperature exceeds a predefined threshold"
      }
   ];

   g.tables["Packets"]["rows"]=
   [
      { "ID": 1,
        "Standard": 1,
        "Type": 64,
        "Subtype": 1,
        "Kind": 0,
        "Name": "Enable monitoring",
        "Description": "This command is sent by the Master Application to a Slave Application to enable temperature monitoring in the slave application"
      },{ "ID": 2,
        "Standard": 1,
        "Type": 64,
        "Subtype": 2,
        "Kind": 0,
        "Name": "Disable monitoring",
        "Description": "This command is sent by the Master Application to a Slave Application to disable temperature monitoring in the slave application"
      },{ "ID": 3,
        "Standard": 1,
        "Type": 64,
        "Subtype": 3,
        "Kind": 0,
        "Parameter": 1,
        "Name": "Set temperature limit",
        "Description": "This command is sent by the Master Application to a Slave Application to set the temperature monitoring threshold in the slave application"
      },{ "ID": 4,
        "Standard": 1,
        "Type": 64,
        "Subtype": 4,
        "Kind": 1,
        "Name": "Report temperature violation",
        "Description": "This report is sent by a Slave Application to  the  Master  Application  to  report  a  temperature  measurement  which exceeds the temperature limit at a time when temperature monitoring is enabled"
      }
   ];

   g.tables["Parameters"]["rows"]=
   [
      { "ID":1,
        "Name": "limit",
        "Type": "1",
        "Size": 8,
        "Order": 0,
        "Group": 0,
        "Description": "The temperature limit to be set in whatever unit.",
        "Standard":1
      }
   ];

   g.tables["ParameterTypes"]["rows"]=
   [
      { "ID":1,
        "Name": "unsigned integer",
        "Size": 0,
      },
      { "ID":2,
        "Name": "signed integer",
        "Size": 0,
      },
      { "ID":3,
        "Name": "float",
        "Size": 32,
      },
      { "ID":4,
        "Name": "double",
        "Size": 64,
      }
   ];

   g.tables["Services"]["rows"]=
   [
      { "ID":1,
        "Name":"Temperature monitoring service",
        "Type":"64",
        "Description":"Service to enable, disable and monitor temperature limits",
        "Standard":1
      }
   ];

   g.tables["Standards"]["rows"]=
   [
      { "ID":1,
        "Name":"Demo standard",
        "Parent": 2,
        "Description":"Communication standard for demo application"
      },
      { "ID":2,
        "Name":"Demo child standard",
        "Parent": 1,
        "Description":""
      }
   ];
