
  $(document).ready(function()
  {

    $(document).on('mousedown','.window',putToFront);
    $(document).on('mousedown',function(ev){ if ($(ev.target).closest('.options').length==0) $('.options').remove(); });

    $(document).on('click','.window-close',closeWindow);
    $(document).on('click','.window-maximize',maxWindow);
    $(document).on('click','.taskname',putToFront);
    $(document).on('click','#menubut',tileWindows);

    $(document).on('change','.cell',cellValidate);
    $(document).on('change','.cell',cellSave);
    $(document).on('focus','.cell',cellFocus);
    $(document).on('mousedown','.cell',cellFocus);
    $(document).on('blur','.cell',cellBlur);

    $(window).on('blur',function(ev){ $('#hiddeninput').focus(); });

  });
