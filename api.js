
   function login(email,pass,successFn,failureFn)
   {
      $.request('login.php',{"action":"login","email":email,"pass":pass},successFn,failureFn);
   }

   function login_status(successFn,failureFn)
   {
      $.request('login.php',{"action":"status"},successFn,failureFn);
   }

   function logout(successFn,failureFn)
   {
      $.request('login.php',{"action":"logout"},successFn,failureFn);
   }

   function register(email,fullname,successFn,failureFn)
   {
      $.request('register.php',{"email":email,"name":fullname},successFn,failureFn);
   }

   function projects_list(successFn,failureFn)
   {
      $.request('projects.php',{'action':'list'},successFn,failureFn);
   }

   function project_add(name,data,successFn,failureFn)
   {
      $.request('projects.php',{'action':'add','name':name,'data':data},successFn,failureFn);
   }

   function project_rename(id,name,successFn,failureFn)
   {
      $.request('projects.php',{'action':'rename','id':id,'name':name},successFn,failureFn);
   }

   function project_delete(id,successFn,failureFn)
   {
      $.request('projects.php',{'action':'delete','id':id},successFn,failureFn);
   }

   function project_load(id,successFn,failureFn)
   {
      $.request('projects.php',{'action':'load','id':id},successFn,failureFn);
   }

   function project_save(id,data,successFn,failureFn)
   {
      $.request('projects.php',{'action':'save','id':id,'data':data},successFn,failureFn);
   }
