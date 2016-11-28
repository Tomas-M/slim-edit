
   // superglobal variable
   var g={};

   // duration of effect (opacity etc). If changed here, needs to be changed in .css file on several places as well
   g.effectDuration=400;

   // default window placement position
   g.nextWindowPos={top:110,left:110};

   // window id counter, increased with each new window
   g.window_id=1;

   // definition of tables and optionally data
   g.tables={}; // actual structures are defined in config.js
   g.data={}; // initial data are defined in data.js. It may be empty
