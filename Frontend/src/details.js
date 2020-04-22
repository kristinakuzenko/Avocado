function inputReady(){
  $dtls = $(".details");
    updateInputs();

    $($dtls).focusout(function(){
        if( $(this).val()=="" || $(this).val()=="Add details")
        $(this).attr( "type", "hidden" );
        updateInputs();
    });
  }

  function updateInputs(){
    $dtls = $(".details");
    $(".card-body").click(function(){
       // console.log( $(this).find($dtls));
        $(this).find($dtls).attr( "type", "text" );
        $(this).find($dtls).focus();
    });
    $dtls.click(function(){
        if( $(this).val()=="Add details")
        $(this).val("");
    });
    $dtls.keypress(function(){
        if( $(this).val()=="Add details")
        $(this).val("");
    });
  }

  exports.inputReady = inputReady;