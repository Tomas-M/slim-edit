
   function menuHide()
   {
      $('#leftmenu').removeClass('open');
   }

   function menuShow()
   {
      $('#leftmenu').addClass('open');
   }

   function newProjectShow()
   {
      var h='<input type=text id=projectname placeholder="Project Name"><button id=projectadd>Save</button>';
      
   }


   function userShow(res)
   {
      var h;
      if (!res || res=="unsigned" || !res.userID)
      {
         h='<input type=text id=username placeholder="Your email address"><input type=password id=pass placeholder="Password"><button id=login>Login</button><button class=link id=registerbut>Register</button>';
         projectsShow([]);
         $('#newproject').hide();
      }
      else
      {
         h='<a href=# id=logout>Logout</a>';
         projectsShow(res.projects);
         msg('You are signed in as '+res.name);
         $('#newproject').show();
      }
      $('#loginreg').html(h+'<br clear=all>');
      $('#menutitle').text(res.name?res.name:'');
   }


   function registerButtonClick()
   {
      var h='<div id=registerform><input type=text id=name placeholder="Your full name"><input type=text id=username placeholder="Your email address"><button id=register>Register</button><button class=link id=registerback>back</button></div>';
      $('#loginreg').html(h);
   }


   function projectsShow(projects)
   {
      var h='';
      for (var i=0; i<projects.length; i++)
      {
         h+='<li class=projectheader data-projectid="'+projects[i].id+'"><i class="fa fa-bookmark"></i> '+htmlspecialchars(projects[i].name)+'</li>'+
         '<ul class=tablelist data-projectid="'+projects[i].id+'"></ul>';
      }
      h+='<li id=newproject><a href="#"><i class="fa fa-plus-circle"></i> create new project</a></li>';
      $('#projects').html(h);
   }


   function tableListShow(projID)
   {
      var tables=getTables();
      var out=[];

      for (var tbl in tables)
      {
//         if (!tables[tbl].properties.internal)
         out.push('<li class="tablename" data-table="'+htmlspecialchars(tbl)+'"><i class="fa fa-table"></i> &nbsp;'+htmlspecialchars(tbl)+(getTableRows(tbl).length>0?' ('+getTableRows(tbl).length+')':'')+'</li>');
      }

      out.sort(function(a,b)
      {
         var an=$(a).text(); var bn=$(b).text();
         if(an > bn) return 1; if(an < bn) return -1; return 0;
      })

      $('.tablelist[data-projectid="'+projID+'"]').html(out.join(''));
   }


   function openStartupTables()
   {
      var tables=getTables();
      for (var tbl in tables)
      {
         if (tables[tbl].properties.showOnStartup)
         {
            var w_id=createWindow(tbl,'',genTableGridHTML(tbl));
            taskbarAdd(w_id,tbl);
            $('.tablename[data-table="'+tbl+'"]').addClass('active');
         }
      }
   }


   function selectProject(ev)
   {
      var id=$(this).data('projectid');
      if (g.projectID==id) return; // project is currently loaded

      // hide other project files and all windows
      closeAllWindows();
      $('.tablelist[data-projectid!="'+id+'"]').slideUp();
      $('.projectheader[data-projectid!="'+id+'"]').removeClass('selected');

      // load project tables data
      project_load(id,function(res)
      {
         var tables=JSON_fromString(res.tables);
         for (var tbl in g.tables) g.tables[tbl]["rows"]=[];
         for (var tbl in tables) g.tables[tbl]["rows"]=tables[tbl]["rows"];
         g.projectID=id;
         tableListShow(id);
         $('.tablelist[data-projectid="'+id+'"]').slideDown();
         $('.projectheader[data-projectid="'+id+'"]').addClass('selected');
         openStartupTables();
      });
   }

