var currentPhoto, currentPhotoHeight, scaleFactor, loupeFactor;

var onLoupeDrag = function() {
    setScale();
  y = parseInt($("#loupe").css("top")) + currentPhotoHeight + (scaleFactor * loupeFactor);
  x = parseInt($("#loupe").css("left")) + (scaleFactor * loupeFactor);
  
  $(huge).css("top", -y * scaleFactor);
  $(huge).css("left", -x * scaleFactor);
}

var onPhotoChange = function(e) {
  newPhoto = $("#mainImage").attr("src");
  
  if (newPhoto != currentPhoto) {
    currentPhoto = newPhoto;
    $("#loupe").remove();
    
    buildLoupe();
  }
}

function buildLoupe() {
  loupeImageUrl = $(mainImage).attr("src").replace(/-(S|M|L|XL|X2|X3).jpg/, "-O.jpg")
  parent = $("#ajaxPhotoBox div:first-child");
  
  loupe = $("<div/>", { "id": "loupe" }).appendTo(parent);
  huge = $("<img />", { "id": "huge", "src": loupeImageUrl }).appendTo(loupe);
  
  setScale();
  $("#loupe").draggable();
  $("#loupe").bind("drag", onLoupeDrag);
  $("#loupe").css("top", -currentPhotoHeight);
  onLoupeDrag();
}

function setScale() {
  currentPhotoHeight = parseInt($("#mainImage").height());
  hugePhotoHeight = parseInt($("#huge").height());
  
  
  scaleFactor = hugePhotoHeight / currentPhotoHeight;
  loupeFactor = parseInt($("#loupe").css("height")) / scaleFactor;
  loupeFactor = 1;
  console.log("loupeFactor " + loupeFactor);
  console.log("scaleFactor " + scaleFactor);
  
  
}


$("#ajaxPhotoBox").bind('DOMNodeInserted', onPhotoChange);
