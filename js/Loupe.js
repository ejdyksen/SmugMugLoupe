var Loupe = (function ($) { 
  var my = {};
  var currentPhoto, currentPhotoHeight, scaleFactor, loupeFactor;
  
  function setScale() {
    currentPhotoHeight = parseInt($("#mainImage").height());
    hugePhotoHeight = parseInt($("#huge").height());


    scaleFactor = hugePhotoHeight / currentPhotoHeight;
    loupeFactor = parseInt($("#loupe").css("height")) / scaleFactor;
    loupeFactor = 1;
    console.log("loupeFactor " + loupeFactor);
    console.log("scaleFactor " + scaleFactor);


  }
  
  my.buildLoupe = function() {
    loupeImageUrl = $(mainImage).attr("src").replace(/-(S|M|L|XL|X2|X3).jpg/, "-O.jpg")
    parent = $("#ajaxPhotoBox div:first-child");

    loupe = $("<div/>", { "id": "loupe" }).appendTo(parent);
    huge = $("<img />", { "id": "huge", "src": loupeImageUrl }).appendTo(loupe);

    setScale();
    $("#loupe").draggable();
    $("#loupe").resizable();
    $("#loupe").bind("drag", my.onLoupeDrag);
    $("#loupe").css("top", -currentPhotoHeight);
    my.onLoupeDrag();
  }
  
  
  my.onLoupeDrag = function() {
    setScale();
    y = parseInt($("#loupe").css("top")) + currentPhotoHeight + (scaleFactor * loupeFactor);
    x = parseInt($("#loupe").css("left")) + (scaleFactor * loupeFactor);

    $(huge).css("top", -y * scaleFactor);
    $(huge).css("left", -x * scaleFactor);
  }
  
  
  my.onPhotoChange = function(e) {
    newPhoto = $("#mainImage").attr("src");

    if (newPhoto != currentPhoto) {
      currentPhoto = newPhoto;
      $("#loupe").remove();

      my.buildLoupe();
    }
  }
  
  return my;
})(jQuery);