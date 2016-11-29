
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

    $(document).on('change','.cell',cellValidate);
    $(document).on('change','.cell',cellSave);
    $(document).on('focus','.cell',cellFocus);
    $(document).on('mousedown','.cell',cellFocus);
    $(document).on('blur','.cell',cellBlur);

    $(window).on('blur',function(ev){ $('#hiddeninput').focus(); });
    $(window).on('resize',function(ev){ tileWindows(true); });

    main();
  });
