window.RevealHighlightword= function () {
  return {
    id: "RevealHighlightword",
    init: function(deck) {
      initHighlightword(deck);
    }
  };
};

function replaceOccurrence(string, regex, n, replace) {
   var i = 0;
   return string.replace(regex, function(match) {
        i+=1;
        if(i===n) return replace;
        return match;
    });
}

const highlight_apply = function(fragment) {
  if (fragment.classList.contains("highlightword")) {
      var chunk_id = 0
      if (fragment.dataset.chunk !== undefined) {
        chunk_id = fragment.dataset.chunk - 1;
      }
      var chunk = Reveal.getCurrentSlide().querySelectorAll("code.sourceCode")[chunk_id]
      
      word = fragment.dataset.word;
      if (word === undefined) {
        return
      }
      
      replacement = document.createElement("span");
      replacement.innerText = word
      replacement.style.cssText = fragment.style.cssText;
      
      var number = 1
      if (fragment.dataset.number !== undefined) {
        number = Number(fragment.dataset.number);
      }
      
      let t = 0;
      chunk.innerHTML = chunk.innerHTML.replaceAll(
        word, 
        match => ++t === number ? replacement.outerHTML : match
      );        
    }
}

const highlight_reverse = function(fragment) {
  if (fragment.classList.contains("highlightword")) {
    var chunk_id = 0
    if (fragment.dataset.chunk !== undefined) {
      chunk_id = fragment.dataset.chunk - 1;
    }
    var chunk = Reveal.getCurrentSlide().querySelectorAll("code.sourceCode")[chunk_id]
    
    word = fragment.dataset.word;
    if (word === undefined) {
      return
    }
    
    replacement = document.createElement("span");
    replacement.innerText = word
    replacement.style.cssText = fragment.style.cssText;
    
    let t = 0;
    chunk.innerHTML = chunk.innerHTML.replace(
      replacement.outerHTML, word
    );        
  }
}

const initHighlightword = function(window) {
  window.on( 'fragmentshown', event => {
    event.fragments.forEach(highlight_apply);
  });
  
  window.on( 'fragmenthidden', event => {
    event.fragments.forEach(highlight_reverse);
  });
};
