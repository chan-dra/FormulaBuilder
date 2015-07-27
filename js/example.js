'use strict';

var hasClass = function(el, cls) {
  return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
}

var drake = dragula([document.getElementById('left1'), document.getElementById('right1')], {
  copy: true,
  accepts: function (el, target, source, sibling) {
    if (target.id === 'right1') return true;
    return false;
  }
});

var getFormula = function() {
  var droppedItems = document.querySelectorAll('#right1 div');
  var formulaFinal = document.getElementsByClassName('formula-final')[0];
  while(formulaFinal.firstChild) formulaFinal.removeChild(formulaFinal.firstChild)
  for (var i = 0; i < droppedItems.length; i++) {
    if (hasClass(droppedItems[i], 'item-custom')) {
      formulaFinal.appendChild(document.createTextNode(droppedItems[i].innerHTML))
    } else {
      formulaFinal.appendChild(document.createTextNode("[" + droppedItems[i].innerHTML + "]"))
    }
  }
}

drake.on('drop', function(el, container, source) {
  if (source.id !== 'right1') {
    if(hasClass(el, 'item-custom')) {
      var text = prompt("Please enter some text", "_");

      if (text != null) {
        el.innerHTML = text
      } else {
        el.innerHTML = '_'
      }
    }
    getFormula();
  }
})