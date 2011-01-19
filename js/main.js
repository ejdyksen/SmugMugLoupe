var currentPhoto;

Loupe.image = $("#mainImage");

function photoIn(e) {
  newPhoto = $(mainImage).attr("src");

  if (newPhoto != currentPhoto) {
    currentPhoto = newPhoto;
    
    Loupe.image = $("#mainImage");
    Loupe.loupeImageUrl = $(mainImage).attr("src").replace(/-(S|M|L|XL|X2|X3).jpg/, "-O.jpg");
    
    Loupe.buildLoupe();
  }
}

$("#ajaxPhotoBox").bind('DOMNodeInserted', photoIn);