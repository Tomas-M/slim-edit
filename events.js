
  $(document).ready(function()
  {

    $(document).on('mousedown','.window',putToFront);
    $(document).on('mousedown',function(ev)
    {
       if ($(ev.target).closest('.option').length==0) $('.options').remove();
       if ($(ev.target).closest('#leftmenu').length==0) menuHide();
    });

    $(document).on('click','.window-close',closeWindow);
    $(document).on('click','.window-maximize',maxWindow);
    $(document).on('click','.taskname',putToFront);
    $(document).on('click','#menuopen',menuShow);
    $(document).on('click','#menuclose',menuHide);
    $(document).on('click','#tilebut',function(){ $(this).toggleClass('active'); tileWindows(); });
    $(document).on('click','.linkbutton',openSubtable);
    $(document).on('click','.tablename',openTable);
    $(document).on('resize','.window',cellMoved);

    $(document).on('click','.message',hideMsg);

    $(document).on('click','#menulogin, #registerback',userShow);
    $(document).on('click','#registerbut',registerButtonClick);
    $(document).on('click','#login',function(){ login($('#username').val(),$('#pass').val(),userShow,true) });
    $(document).on('click','#logout',function(ev){ ev.preventDefault(); logout(userShow,true); closeAllWindows(); });
    $(document).on('click','#register',function(){ register($('#username').val(),$('#name').val(),function(res){ msg(res); userShow(); }) });
    $(document).on('click','#newproject',newProjectToggle);

    $(document).on('change','.cell',cellValidate);
    $(document).on('change','.cell',cellSave);
    $(document).on('focus','.cell',cellFocus);
    $(document).on('mousedown','.cell',cellFocus);
    $(document).on('blur','.cell',cellBlur);

    $(window).on('blur',function(ev){ $('#hiddeninput').focus(); });
    $(window).on('resize',function(ev){ tileWindows(true); });

    $(document).on('click','.projectheader',selectProject);
    $(document).on('click','#projectadd',addProject);


    login_status(userShow,userShow);
    main();
  });
