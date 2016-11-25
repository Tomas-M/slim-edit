
   // ----------------------------------------------------
   // initial data
   // ----------------------------------------------------

   /**  Data definition ***
    *
    *   Put data as array of rows, using column names as defined in config.js
    *   It is perfectly fine if this file is empty. It serves only as an initial data set as an example
    */

   g.data={

      "Packets":
      [
         { "ID": 1,
           "Service": 1,
           "Packet Type": 1,
           "Subtype": 2,
           "Code": "PCK1",
           "Name": "Packet 1",
           "Description": "Long text for packet 1"
         },{ "ID": 2,
           "Service": 2,
           "Packet Type": 1,
           "Subtype": 5,
           "Code": "PCK2",
           "Name": "Packet 2",
           "Description": ""
         },{ "ID": 3,
           "Service": 5,
           "Packet Type": 1,
           "Subtype": 4,
           "Code": "PCK3",
           "Name": "Packet 3",
           "Description": ""
         },{ "ID": 4,
           "Service": 4,
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
           "Name":"service one",
           "Type":"random",
           "Description":"Service one",
           "Standard":3
         },{ "ID":2,
           "Name":"service two",
           "Type":"strange",
           "Description":"Service two",
           "Standard":23
         },{ "ID":3,
           "Name":"service three",
           "Type":"random",
           "Description":"Service three",
           "Standard":12
         },{ "ID":4,
           "Name":"service four",
           "Type":"strange",
           "Description":"Service four",
           "Standard":1
         },{ "ID":5,
           "Name":"service five",
           "Type":"strange",
           "Description":"Service five",
           "Standard":4
         }
      ],
      
      "Standards":
      [
         { "ID": 1,
           "Name": "STAN1"
         },
         { "ID": 3,
           "Name": "STAN3"
         },
         { "ID": 4,
           "Name": "STAN4"
         },
         { "ID": 23,
           "Name": "STAN23"
         },
         { "ID": 12,
           "Name": "STAN12"
         }
      ]
   };

