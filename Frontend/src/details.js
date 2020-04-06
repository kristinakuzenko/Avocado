$dtls = $(".details");

$(document).ready(function() {
  
    updateInputs();

    $($dtls).focusout(function(){
        if( $(this).val()=="" || $(this).val()=="Add details")
        $(this).attr( "type", "hidden" );
        updateInputs();
    });

    // if($( $dtls).hasClass("active") && $( $dtls).val()=="Add details"){
    //     $( $dtls).hide();
    // }

  });

  function updateInputs(){
   
    $(".card-body").click(function(){
        console.log( $(this).find($dtls));
        $(this).find($dtls).attr( "type", "text" );
        $(this).find($dtls).focus();
      //  if($(this).hasClass("active"))
       // $(this).find($(".active")).attr( "type", "text" );
       // else $(this).find($dtls).addClass("active");
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