var Loupe = (function () { 
  var my = {};
  
  // JQuery objects
  var loupeWrapper, loupeDiv, hugeImg, container;
  
  // Numbers
  var scaleFactor;
  
  // Public properties
  my.image = null;
  my.loupeImageUrl = 0;
  
  // Private methods
  function onLoupeDrag() {
    scaleFactor = hugeImg.height() / my.image.height();
    // get the center of the loupe
    y = parseInt(loupeDiv.css("top")) + (loupeDiv.height() / 2);
    x = parseInt(loupeDiv.css("left")) + (loupeDiv.width() / 2);

    hugeImg.css("top", (-y * scaleFactor) + (loupeDiv.height() / 2));
    hugeImg.css("left", (-x * scaleFactor) + (loupeDiv.width() / 2));
  }
  
  // Public methods
  my.buildLoupe = function() {
    loupeWrapper = $("<div />", { 
      "id": "loupeWrapper",
      "height": my.image.outerHeight(),
      "width": my.image.outerWidth()
    });
    
    loupeDiv = $("<div />", { 
      "id": "loupe" 
    });
    hugeImg = $("<img />", {
      "id": "huge", 
      "src": my.loupeImageUrl 
    });
    
    my.image.wrap(loupeWrapper);
    loupeDiv.appendTo($("#loupeWrapper")); // have to specify the selector like this...JQuery bug?
    hugeImg.appendTo(loupeDiv);
    
    loupeDiv.draggable();
    loupeDiv.resizable();
    loupeDiv.bind("drag", onLoupeDrag);
    loupeDiv.bind("resize", onLoupeDrag);
    
    onLoupeDrag();
  }
  return my;
})();